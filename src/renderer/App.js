var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\nbody {\n  background: #000;\n  overflow: hidden;\n  margin: 0;\n  padding: 0;\n}\n")

























const Player = require('./components/Player');

module.exports = {
  name: 'app',
  components: {
    Player
  }
}

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div id=\"app\">\n  <player></player>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\nbody {\n  background: #000;\n  overflow: hidden;\n  margin: 0;\n  padding: 0;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-a4ebf15a", module.exports)
  } else {
    hotAPI.update("_v-a4ebf15a", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}