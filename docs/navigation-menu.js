// Responsive Navigation
const openNavBtn = document.getElementById('open-sidenav-btn')
const overlayElm = document.querySelector('.overlay')
const closeBtn = document.getElementById('close-sidenav-btn')
openNavBtn.addEventListener('click', function () {
  document.querySelector('.sidenav').style.left = document.querySelector('#close-sidenav-btn').style.left = '0'
  document.querySelector('.overlay').style.display = 'block'
  setTimeout(function () { document.querySelector('.overlay').style.opacity = '0.75' }, 12)
  // Disable Body Scrolling
  document.body.style.overflow = 'hidden'
  document.body.style.touchAction = 'none'
  document.body.ontouchmove = (e) => { if (!document.querySelector('.sidenav').contains(e.target))e.preventDefault() }
})
overlayElm.onclick = overlayElm.ontouchend = closeBtn.onclick = function () {
  document.querySelector('.sidenav').style.left = document.querySelector('#close-sidenav-btn').style.left = '-250px'
  document.querySelector('.overlay').style.opacity = '0'
  setTimeout(function () { document.querySelector('.overlay').style.display = 'none' }, 500)
  // Enable Body Scrolling
  document.body.style.overflow = ''
  document.body.style.touchAction = ''
  document.body.ontouchmove = (e) => { void (0) }
}
const sidenav = {
  subsection: function (id) {
    const cid = 'c' + id
    const gid = 'g' + id
    const caret = document.getElementById(cid)
    const group = document.getElementById(gid)
    if (group.hidden) {
      group.hidden = false
      caret.classList.add('fa-caret-down')
      caret.classList.remove('fa-caret-right')
    } else {
      group.hidden = true
      caret.classList.add('fa-caret-right')
      caret.classList.remove('fa-caret-down')
    }
  }
}
const mgGlobalVars = {
  screenTouched: false
}
document.body.addEventListener('touchstart', function () { mgGlobalVars.screenTouched = true })
document.body.addEventListener('touchend', function () { setTimeout(function () { mgGlobalVars.screenTouched = false }, 10) })
// function resizeOuterDivs (event) {
//   document.querySelectorAll('.topnav > div').forEach(div => {
//     // const anchorStyle = getComputedStyle(div.querySelector('a'))
//     // div.style.width = Math.ceil(Number(anchorStyle.width.replace(/px/,"")) + Number(anchorStyle.paddingLeft.replace(/px/,""))*2) + "px";
//   })
// }
// resizeOuterDivs()
// window.addEventListener('load', resizeOuterDivs)
// document.querySelector('.topnav').addEventListener('mouseenter', resizeOuterDivs)

document.querySelectorAll('.topnav > div a').forEach(elm => {
  elm.addEventListener('mouseenter', function (event) {
    elm.onclick = function (e) {
      // resizeOuterDivs()
      if (mgGlobalVars.screenTouched && e.timeStamp - event.timeStamp < 1) e.preventDefault()
    }
  })
})
