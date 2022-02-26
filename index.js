const fs = require('fs')
const path = require('path')
const watch = require('node-watch')
const EventEmitter = require('events')
const changeEmitter = new EventEmitter()
changeEmitter.setMaxListeners(10 ** 30)
const Handlebars = require('handlebars')
const sass = require('sass')
const htmlMinify = require('html-minifier').minify
if (!fs.existsSync('.ENV')) {
  fs.copyFileSync('EXAMPLE.ENV', '.ENV')
  console.log('Created .ENV file from example')
}
require('dotenv').config()

const args = {
  watch: process.argv.indexOf('--watch') > -1,
  serve: process.argv.indexOf('--serve') > -1
}

// Config using config.js and ENV vars
const config = require('./config')
Object.entries(process.env).forEach(entry => {
  const key = entry[0]
  const val = entry[1]
  if (!key.match(/^BUILD_/)) return
  config[key.replace(/^BUILD_/, '')] = val
})

// Render Templates
function renderTemplate (renderer, path) {
  try {
    return renderer(config)
  } catch (error) {
    console.log(error)
    console.log(`\x1b[31mHandlebars compile error: ${path}\nSee traceback above for more information.\x1b[0m`)
    return config.hbs_compile_error_msg
  }
}

// Register Handlbars Partial Views
function recursivePartials (folderName) {
  fs.readdirSync(folderName).forEach(function (file) {
    // For each file in directory, get name and stat
    const fullName = path.join(folderName, file).replace(/\\/g, '/')
    const stat = fs.lstatSync(fullName)
    if (stat.isDirectory()) {
      // Folders
      recursivePartials(fullName)
    } else {
      const routeName = fullName.replace(/^partials\//g, '')
      const partialName = routeName.replace(/\.hbs$/, '')
      const template = fs.readFileSync('./partials/' + routeName, 'utf-8')
      const renderer = Handlebars.compile(template)
      Handlebars.registerPartial(partialName, renderer)
    }
  })
}
recursivePartials('partials')

function buildApp () {
  // Clear the docs directory
  fs.rmdirSync('docs', { recursive: true })

  function recursiveRoutes (folderName) {
    fs.readdirSync(folderName).forEach(function (file) {
      // For each file in directory, get name and stat
      const fullName = path.join(folderName, file)
      const stat = fs.lstatSync(fullName)

      if (stat.isDirectory()) {
        // Folders
        recursiveRoutes(fullName)
      } else {
        const routeName = fullName.replace(/^views/g, '')

        // Create directory if it doesn't exist
        const dir = folderName.replace(/^views/g, 'docs')
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, {
            recursive: true
          })
        }

        if (routeName.match(/\.(hbs)$/)) {
          // Handlebars files
          const template = fs.readFileSync('./views' + routeName, 'utf-8')
          const renderer = Handlebars.compile(template)
          const html = renderTemplate(renderer, './views' + routeName)
          let minified = null
          if (routeName.replace(/\.hbs$/, '').match(/\.html$/)) {
            minified = htmlMinify(html, {
              collapseWhitespace: true,
              minifyJS: true,
              minifyCSS: true
            })
          }
          try {
            fs.writeFileSync('./docs' + routeName.replace(/\.hbs$/, ''), minified || html)
          } catch (error) {
            console.log(error)
          }
        } else if (routeName.match(/\.s[ac]ss$/)) {
          const result = sass.renderSync({ file: './views' + routeName, outputStyle: 'compressed' })
          try {
            fs.writeFileSync('./docs' + routeName.replace(/\.s[ac]ss$/, '.css'), result.css)
          } catch (error) {
            console.log(error)
            console.log(`\x1b[31mSass CSS compile error: ${path}\nSee traceback above for more information.\x1b[0m`)
          }
        } else {
          // Copy other (static) files
          try {
            fs.copyFileSync('./views' + routeName, './docs' + routeName)
          } catch (error) {
            console.log(error)
          }
        }
      }
    })
  }
  recursiveRoutes('views')
}
buildApp()

if (args.watch) {
  // Watch changes
  watch('partials', { recursive: true }, function (evt, name) {
    if (evt !== 'remove') {
      const stat = fs.lstatSync(name)
      if (stat.isDirectory()) return
    }

    console.log(`\x1b[32mChange detected, rebuilding... (${evt + ' ' + name}) \x1b[0m`)
    const partialName = name.replace(/^partials\/|\.hbs$/g, '')

    // Update Partial by re-registering it
    if (evt !== 'remove') {
      const template = fs.readFileSync(name, 'utf-8')
      const renderer = Handlebars.compile(template)
      Handlebars.registerPartial(partialName, renderer)
    }

    // Rebuild the app using the template
    buildApp()
  })
  watch('views', { recursive: true }, function (evt, name) {
    console.log(`\x1b[32mChange detected, rebuilding... (${evt + ' ' + name}) \x1b[0m`)
    buildApp()
  })
}

if (args.serve) {
  const express = require('express')
  const http = require('http')
  const app = express()
  app.use(express.static('./docs'))
  app.use(function (req, res) {
    try {
      fs.readFile('./docs/404.html', function (error, content) {
        if (error) {
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end('Internal Server Error', 'utf-8')
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html' })
          res.end(content, 'utf-8')
        }
      })
    } catch (error) {
      // Error is handled in function
      // This is to catch the exception thrown by fs.readFile
    }
  })
  http.createServer(app).listen(8789, () => {
    console.log('\x1b[36mListening on port 8789\x1b[0m')
  })
}
