var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n#controls {\n  position: absolute;\n  bottom: 0;\n  width: 100vw;\n  height: 20%;\n}\n.progress-bar {\n  width: 100vw;\n  height: 5%;\n  background: #FFC107;\n  box-shadow: 0 0 10px #FFC107;\n}\n.progress-bar .tuls {\n  position: relative;\n  height: 100%;\n  background: #FF5722;\n  box-shadow: 0 0 10px #FF5722;\n}\n.time-stamp {\n  position: absolute;\n  top: -50px;\n  color: #333;\n  background: #FF5722;\n  text-align: center;\n  width: 100px;\n  left: 50%;\n  margin-left: -50px;\n  height: 50px;\n  border-radius: 20px;\n  font-family: Roboto;\n}\n.controls-bar {\n  width: 100%;\n  height: 95%;\n  background: #fff;\n}\n")














































































module.exports = {
  name: 'controls',
  props: ['player'],
  data() {
    return {
      currentTrackTime: 0,
      totalTrackTime: 1,
      timeTrackInPer: 10
    }
  },
  filters: {
    formatTime(time) {
      time = Math.floor(time);
      let m = Math.floor(time / 60);
      let s = time - m*60;

      return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
    }
  },
  mounted() {
    setInterval(() => {
      this.currentTrackTime = this.player.currentTime;
      this.totalTrackTime = this.player.duration;
      this.timeTrackInPer = this.currentTrackTime / this.totalTrackTime * 100;
    }, 1000);
  }
}

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div id=\"controls\">\n  <div class=\"time-stamp\">{{currentTrackTime | formatTime}} / {{totalTrackTime | formatTime}}</div>\n  <div class=\"progress-bar\">\n    <div class=\"tuls\" v-bind:style=\"{width: timeTrackInPer + '%'}\"></div>\n  </div>\n  <div class=\"controls-bar\"></div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n#controls {\n  position: absolute;\n  bottom: 0;\n  width: 100vw;\n  height: 20%;\n}\n.progress-bar {\n  width: 100vw;\n  height: 5%;\n  background: #FFC107;\n  box-shadow: 0 0 10px #FFC107;\n}\n.progress-bar .tuls {\n  position: relative;\n  height: 100%;\n  background: #FF5722;\n  box-shadow: 0 0 10px #FF5722;\n}\n.time-stamp {\n  position: absolute;\n  top: -50px;\n  color: #333;\n  background: #FF5722;\n  text-align: center;\n  width: 100px;\n  left: 50%;\n  margin-left: -50px;\n  height: 50px;\n  border-radius: 20px;\n  font-family: Roboto;\n}\n.controls-bar {\n  width: 100%;\n  height: 95%;\n  background: #fff;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-f03adea4", module.exports)
  } else {
    hotAPI.update("_v-f03adea4", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}