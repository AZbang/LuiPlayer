var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\nbody {\n    overflow: hidden;\n    margin: 0;\n    padding: 0;\n    -webkit-user-select: none;\n    width: 100vw;\n    height: 100vh;\n}\n.app-drag {\n  -webkit-app-region: drag;\n}\n.no-app-drag {\n  z-index: 1000;\n  -webkit-app-region: no-drag;\n}\ninput,\nbutton,\ntextarea {\n  -webkit-app-region: no-drag;\n}\n\n#app {\n  height: 95vh;\n  width: 95vw;\n  left: 2.5%;\n  top: 2.5%;\n  box-shadow: 0 0 10px #434b60;\n  position: absolute;\n  border-radius: 10px;\n  font-family: Roboto;\n}\n\n.close-app-btn {\n  position: absolute;\n  right: 15px;\n  top: 14px;\n  color: #fff;\n  cursor: pointer;\n  z-index: 100000;\n}\n\n.fade-enter-active, .fade-leave-active {\n  transition: opacity .5s\n}\n.fade-enter, .fade-leave-to {\n  opacity: 0\n}\n")









































































const remote = require('electron').remote;
const Player = require('./components/Player');

module.exports = {
  name: 'app',
  methods: {
    closeApp() {
      remote.getCurrentWindow().close();
    }
  },
  components: {
    Player
  }
}

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div id=\"app\">\n  <i class=\"material-icons close-app-btn\" @click=\"closeApp\">close</i>\n  <player></player>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\nbody {\n    overflow: hidden;\n    margin: 0;\n    padding: 0;\n    -webkit-user-select: none;\n    width: 100vw;\n    height: 100vh;\n}\n.app-drag {\n  -webkit-app-region: drag;\n}\n.no-app-drag {\n  z-index: 1000;\n  -webkit-app-region: no-drag;\n}\ninput,\nbutton,\ntextarea {\n  -webkit-app-region: no-drag;\n}\n\n#app {\n  height: 95vh;\n  width: 95vw;\n  left: 2.5%;\n  top: 2.5%;\n  box-shadow: 0 0 10px #434b60;\n  position: absolute;\n  border-radius: 10px;\n  font-family: Roboto;\n}\n\n.close-app-btn {\n  position: absolute;\n  right: 15px;\n  top: 14px;\n  color: #fff;\n  cursor: pointer;\n  z-index: 100000;\n}\n\n.fade-enter-active, .fade-leave-active {\n  transition: opacity .5s\n}\n.fade-enter, .fade-leave-to {\n  opacity: 0\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-3adb8906", module.exports)
  } else {
    hotAPI.update("_v-3adb8906", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}