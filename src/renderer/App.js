var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n#app {\n  height: 95vh;\n  width: 95vw;\n  left: 2.5%;\n  top: 2.5%;\n  box-shadow: 0 0 10px #434b60;\n  position: absolute;\n  border-radius: 10px;\n}\n\n.fade-enter-active, .fade-leave-active {\n  transition: opacity .5s\n}\n.fade-enter, .fade-leave-to {\n  opacity: 0\n}\n")



































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
    __vueify_insert__.cache["\n#app {\n  height: 95vh;\n  width: 95vw;\n  left: 2.5%;\n  top: 2.5%;\n  box-shadow: 0 0 10px #434b60;\n  position: absolute;\n  border-radius: 10px;\n}\n\n.fade-enter-active, .fade-leave-active {\n  transition: opacity .5s\n}\n.fade-enter, .fade-leave-to {\n  opacity: 0\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-78aaed27", module.exports)
  } else {
    hotAPI.update("_v-78aaed27", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}