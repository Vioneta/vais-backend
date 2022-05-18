try {
  new Function("import('/vaisfiles/frontend/main-2af83765.js')")()
} catch (err) {
  var el = document.createElement('script')
  el.src = '/vaisfiles/frontend/main-2af83765.js'
  el.type = 'module'
  document.body.appendChild(el)
}
