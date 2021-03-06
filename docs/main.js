/* eslint-disable no-extend-native */
function setLocation (href) {
  // If Else Statement
  history.pushState ? history.pushState(null, null, href) : location.hash = href
}

function replaceLocation (href) {
  history.replaceState ? history.replaceState(null, null, href) : location.hash = href
}

// Access Cookies
function setCookie (cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + d.toGMTString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

function getCookie (cname) {
  const name = cname + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

// Manage Preferences
let LS_ACCESS = true; var prefs
try {
  var prefs
  function updatePrefs () {
    prefs = JSON.parse(localStorage.getItem('hs-site-prefs') || '{}')
  }
  updatePrefs()
} catch (e) {
  // If the Local Storage is unreachable
  prefs = '{}'
  LS_ACCESS = false
}
function getPref (name) {
  return LS_ACCESS ? updatePrefs() || !!prefs[name] : false
}
function prefVal (name) {
  return LS_ACCESS ? updatePrefs() || prefs[name] || '' : ''
}

function setPref (name, bool) {
  if (!LS_ACCESS) return console.error(new DOMException('Could not save preference'))
  prefs[name] = bool
  localStorage.setItem('preferences', JSON.stringify(prefs))
}

// Go to Homepage
function home () {
  setCookie('lastPage', '', 30)
  window.location.href = '../'
};

// Add site visit via counter
function addSiteVisit (branch) {
  branch = branch || ''
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log('Visit Added')
    }
  }
  xhttp.open('GET', 'https://api.countapi.xyz/hit/ae-hs-tools/visits' + branch.replace(/\//g, '_'), true)
  xhttp.send()
}

if (getCookie('hsSiteWithinHour') !== 'true' && /https:\/\/ae-hopscotch.github.io\//gi.test(location.href)) {
  if (window.location.href !== 'https://ae-hopscotch.github.io/') addSiteVisit(new URL(location.href).pathname)
  addSiteVisit()
}
setCookie('hsSiteWithinHour', 'true', 0.04)

// Prototype Functions
Element.prototype.remove = function () {
  this.parentElement.removeChild(this)
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
  for (let i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i])
    }
  }
}
String.prototype.htmlEscape = function () {
  return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}
Object.detach = function (o) {
  return JSON.parse(JSON.stringify(o))
}
Array.prototype.repeatEach = NodeList.prototype.repeatEach = HTMLCollection.prototype.repeatEach = function (fn) {
  const outputs = []
  if (!(fn && typeof fn === 'function')) throw new TypeError(fn + ' is not a function')
  for (let i = 0; i < this.length; i++) {
    outputs.push(fn(this[i]))
  }
  return outputs
}

// For Each but with output
Array.prototype.repeatEach = NodeList.prototype.repeatEach = HTMLCollection.prototype.repeatEach = function (fn) {
  const outputs = []
  if (!(fn && typeof fn === 'function')) throw new TypeError(fn + ' is not a function')
  for (let i = 0; i < this.length; i++) {
    outputs.push(fn(this[i]))
  }
  return outputs
}
Array.prototype.removeNull = NodeList.prototype.removeNull = HTMLCollection.prototype.removeNull = function () {
  const outputs = []
  for (let i = 0; i < this.length; i++) {
    if (this[i] != null) outputs.push(this[i])
  }
  return outputs
}

// Remove Duplicates
function removeDuplicates (arr) {
  arr.splice(0, arr.length, ...(new Set(arr)))
  return arr
};

// Copy Text
function copyText (val) {
  const copyTextArea = document.createElement('textarea')
  copyTextArea.value = val
  document.body.appendChild(copyTextArea)
  copyTextArea.select()
  copyTextArea.setSelectionRange(0, 9999999) // Mobile
  document.execCommand('copy')
  document.body.removeChild(copyTextArea)
}

// Better Base 64
var Base64 = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  encode: function (e) {
    let t = ''
    let n, r, i, s, o, u, a
    let f = 0
    e = Base64._utf8_encode(e)
    while (f < e.length) {
      n = e.charCodeAt(f++)
      r = e.charCodeAt(f++)
      i = e.charCodeAt(f++)
      s = n >> 2
      o = (n & 3) << 4 | r >> 4
      u = (r & 15) << 2 | i >> 6
      a = i & 63
      if (isNaN(r)) {
        u = a = 64
      } else if (isNaN(i)) {
        a = 64
      }
      t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
    }
    return t
  },
  decode: function (e) {
    let t = ''
    let n, r, i
    let s, o, u, a
    let f = 0
    e = e.replace(/[^A-Za-z0-9\+\/\=]/g, '')
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++))
      o = this._keyStr.indexOf(e.charAt(f++))
      u = this._keyStr.indexOf(e.charAt(f++))
      a = this._keyStr.indexOf(e.charAt(f++))
      n = s << 2 | o >> 4
      r = (o & 15) << 4 | u >> 2
      i = (u & 3) << 6 | a
      t = t + String.fromCharCode(n)
      if (u != 64) {
        t = t + String.fromCharCode(r)
      }
      if (a != 64) {
        t = t + String.fromCharCode(i)
      }
    }
    t = Base64._utf8_decode(t)
    return t
  },
  _utf8_encode: function (e) {
    e = e.replace(/\r\n/g, '\n')
    let t = ''
    for (let n = 0; n < e.length; n++) {
      const r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode(r >> 6 | 192)
        t += String.fromCharCode(r & 63 | 128)
      } else {
        t += String.fromCharCode(r >> 12 | 224)
        t += String.fromCharCode(r >> 6 & 63 | 128)
        t += String.fromCharCode(r & 63 | 128)
      }
    }
    return t
  },
  _utf8_decode: function (e) {
    let t = ''
    let n = 0
    let r = c1 = c2 = 0
    while (n < e.length) {
      r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
        n++
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1)
        t += String.fromCharCode((r & 31) << 6 | c2 & 63)
        n += 2
      } else {
        c2 = e.charCodeAt(n + 1)
        c3 = e.charCodeAt(n + 2)
        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63)
        n += 3
      }
    }
    return t
  }
}

// Requests
var XHR = {
  sendReq: function (options, printResult, ca) {
    const x = new XMLHttpRequest()
    x.open(options.method, ((ca) ? 'https://cors-anywhere.herokuapp.com/' : '') + options.url)
    x.onload = x.onerror = function () {
      printResult(x.responseText || '', x.status)
    }
    if (/^POST/i.test(options.method)) {
      x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    }
    x.send(options.data)
  },
  request: function (input_method, input_url, fn, ca) {
    if (ca == undefined) ca = true
    busy = true
    XHR.sendReq({
      method: input_method,
      url: input_url
    }, fn, ca)
  },
  get: function (url, fn, ca) {
    if (ca == undefined) ca = true
    busy = true
    XHR.sendReq({
      method: 'GET',
      url: url
    }, fn, ca)
  },
  fetch: function (url, fn, useAllOrigins) {
    fetch((useAllOrigins) ? 'https://api.allorigins.win/get?url=' + encodeURIComponent(url) : url)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then(data => fn(data.contents, data.status.http_code))
      .catch(() => fn(null, 521))
  },
  requestExt: function (method, url, callback, proxy, data) {
    proxy = proxy || 0
    const proxyUrls = ['', 'all', 'https://api.allorigins.win/get?t=' + Date.now() + '&url=', /* "https://cors-anywhere.herokuapp.com/", */ 'https://api.codetabs.com/v1/proxy?quest=', 'https://enw6yiuqc2jyb5w.m.pipedream.net/cors/']
    if (proxy === 2 && method == 'GET') method = 'fetch'
    function sendRequest (url, cb) {
      if (method == 'fetch' || url.match(/^https:\/\/api.allorigins/)) {
        fetch(proxy > 1 ? proxyUrls[proxy] + url : url, {
          method: method == 'fetch' ? 'GET' : method,
          body: data
        }).then(response => {
          if (response.ok) return response.json()
          throw new Error('Network response was not ok.')
        })
          .then(data => cb(data.contents, data.status.http_code))
          .catch(() => cb(null, 521))
      } else {
        const xhr = new XMLHttpRequest()
        xhr.open(method, proxy > 2 ? proxyUrls[proxy] + url : url)
        xhr.onload = xhr.onerror = xhr.onabort = function () { cb(xhr.responseText, xhr.status) }
        xhr.send(data)
      }
    }
    if (proxy === 1) {
      sendRequest(proxyUrls[2] + url, (r, s) => { s && s != 521 ? callback(r, s, 2) : sendRequest(proxyUrls[3] + url, (r, s) => { s && s != 521 ? callback(r, s, 3) : sendRequest(proxyUrls[4] + url, (r, s) => { s && s != 521 ? callback(r, s, 4) : callback(null, 521) }) }) })
    } else {
      sendRequest(url, callback)
    }
  }
}

function storageAccess () {
  try { return !!localStorage } catch (e) { return !1 }
}

const AE_REFERENCE = {
  onIos: (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))
}
