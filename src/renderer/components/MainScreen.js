var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n#main-screen {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: url('../assets/bg.png');\n  border-radius: 10px;\n\n  z-index: 1000;\n  text-align: center;\n  color: #fff;\n}\n#main-screen img {\n  width: 100px;\n  box-sizing: border-box;\n  height: 100px;\n  border-radius: 50%;\n  position: absolute;\n  top: 32%;\n  left: 50%;\n  margin-left: -50px;\n  border: 15px solid rgba(255, 255, 255, .4);\n  -webkit-animation: wave 1s normal;\n          animation: wave 1s normal;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n}\n@-webkit-keyframes wave {\n  0% {\n    border-width: 15px;\n  }\n  50% {\n    border-width: 5px;\n  }\n  100% {\n    border-width: 15px;\n  }\n}\n@keyframes wave {\n  0% {\n    border-width: 15px;\n  }\n  50% {\n    border-width: 5px;\n  }\n  100% {\n    border-width: 15px;\n  }\n}\n\n#main-screen div {\n  margin-top: 70%;\n  font-size: 24px;\n  font-family: Roboto Thin;\n}\n#main-screen a {\n  text-decoration: none;\n  border-bottom: 1px dashed #fff;\n  font-size: 14px;\n  color: #fff;\n}\n")








































































const shell = require('electron').shell;

module.exports = {
  name: 'main-screen',
  methods: {
    openInBrowser(e) {
      e.preventDefault();
      shell.openExternal(e.target.href);
    }
  }
}

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div id=\"main-screen\">\n  <img src=\"../assets/icon.png\" alt=\"logo\">\n  <div>Lui<br>Youtube Music Player<br><br><a @click=\"openInBrowser\" href=\"https://github.com/AZbang\" class=\"no-app-drag\">Created by @azbang</a></div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n#main-screen {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: url('../assets/bg.png');\n  border-radius: 10px;\n\n  z-index: 1000;\n  text-align: center;\n  color: #fff;\n}\n#main-screen img {\n  width: 100px;\n  box-sizing: border-box;\n  height: 100px;\n  border-radius: 50%;\n  position: absolute;\n  top: 32%;\n  left: 50%;\n  margin-left: -50px;\n  border: 15px solid rgba(255, 255, 255, .4);\n  -webkit-animation: wave 1s normal;\n          animation: wave 1s normal;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n}\n@-webkit-keyframes wave {\n  0% {\n    border-width: 15px;\n  }\n  50% {\n    border-width: 5px;\n  }\n  100% {\n    border-width: 15px;\n  }\n}\n@keyframes wave {\n  0% {\n    border-width: 15px;\n  }\n  50% {\n    border-width: 5px;\n  }\n  100% {\n    border-width: 15px;\n  }\n}\n\n#main-screen div {\n  margin-top: 70%;\n  font-size: 24px;\n  font-family: Roboto Thin;\n}\n#main-screen a {\n  text-decoration: none;\n  border-bottom: 1px dashed #fff;\n  font-size: 14px;\n  color: #fff;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-ca92e25e", module.exports)
  } else {
    hotAPI.update("_v-ca92e25e", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}