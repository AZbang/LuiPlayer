if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-31d78ba1", module.exports)
  } else {
    hotAPI.update("_v-31d78ba1", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}