const fs = require('fs')
const { marked } = require('marked')
const Handlebars = require('handlebars')

// Config using config.js and ENV vars
const buildConfig = require('./config')
Object.entries(process.env).forEach(entry => {
  const key = entry[0]
  const val = entry[1]
  if (!key.match(/^BUILD_/)) return
  buildConfig[key.replace(/^BUILD_/, '')] = val
})

// Render Templates
// TODO: REMOVE DUPLICATE CODE
function renderTemplate (renderer, path) {
  try {
    return renderer(buildConfig)
  } catch (error) {
    console.log(error)
    console.log(`\x1b[31mHandlebars compile error: ${path}\nSee traceback above for more information.\x1b[0m`)
    return buildConfig.hbs_compile_error_msg
  }
}

const expressions = {
  h1: '<h1 id="([^"]*)">([^<]*)',
  h2: '<h2 id="([^"]*)">([^<]*)',
  heading: '<h[12] id="([^"]*)">([^<]*)'
}
function build (content, path) {
  const pageConfigStr = content.match(/^(.|\n)*---/)[0].replace(/---$/, '')
  try { JSON.parse(pageConfigStr) } catch (e) {
    const err = new Error('Could not parse page config')
    console.error(err)
    return err
  }
  const pageConfig = JSON.parse(pageConfigStr)
  const parsedMarkdown = marked.parse(content.replace(/^(.|\n)*---/, ''))

  const h1Regex = new RegExp(expressions.h1)
  const h2Regex = new RegExp(expressions.h2)
  const navTree = []
  parsedMarkdown.match(new RegExp(expressions.heading, 'g')).forEach(heading => {
    if (heading.startsWith('<h1')) {
      navTree.push([{
        id: heading.match(h1Regex)[1],
        content: heading.match(h1Regex)[2]
      }, []]) // [{ id: <id>, content: <text> }, <empty array>]
      return
    }
    const lastH1 = navTree[navTree.length - 1]
    lastH1[1].push({
      id: heading.match(h2Regex)[1],
      content: heading.match(h2Regex)[2]
    })
  })

  const navHTML = navTree.reduce((previous, current) => {
    const h1 = current[0]
    let html = `<li><a href="#${h1.id}" class="toc-h1 toc-link" data-title="${h1.content}">${h1.content}</a>`
    const children = current[1]
    if (children.length) {
      const childLinks = children.map(h2 => `<li><a href="#${h2.id}" class="toc-h2 toc-link" data-title="${h2.content}">${h2.content}</a></li>`)
      html += `<ul class="toc-list-h2">${childLinks.join('')}</ul>`
    }
    return previous + html
  }, '')

  Object.assign(buildConfig, {
    content: parsedMarkdown,
    navigation: navHTML,
    ...pageConfig
  })
  const template = fs.readFileSync('./src/slatedocs.html.hbs', 'utf-8')
  const renderer = Handlebars.compile(template)
  const html = renderTemplate(renderer, path)

  return html
}

module.exports = build
