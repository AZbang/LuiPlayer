var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n#player {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  border-radius: 10px;\n  overflow: hidden;\n  width: 100%;\n  height: 99%;\n  background: #fff;\n}\n#player video {\n  min-width: 100%;\n  min-height: 100%;\n  width: auto;\n  height: auto;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%,-50%);\n          transform: translate(-50%,-50%);\n  -webkit-filter: blur(30px);\n          filter: blur(30px);\n  position: absolute;\n  border-radius: 10px;\n}\n\n.loader-wrap {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n\n.signal {\n  border: 5px solid #515970;\n  border-radius: 30px;\n  height: 30px;\n  left: 50%;\n  margin: -15px 0 0 -15px;\n  opacity: 0;\n  position: absolute;\n  top: 45%;\n  width: 30px;\n\n  -webkit-animation: pulsate 1s ease-out;\n\n          animation: pulsate 1s ease-out;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n}\n@-webkit-keyframes pulsate {\n  0% {\n    -webkit-transform: scale(.1);\n            transform: scale(.1);\n    opacity: 0.0;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: scale(1.2);\n            transform: scale(1.2);\n    opacity: 0;\n  }\n}\n@keyframes pulsate {\n  0% {\n    -webkit-transform: scale(.1);\n            transform: scale(.1);\n    opacity: 0.0;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: scale(1.2);\n            transform: scale(1.2);\n    opacity: 0;\n  }\n}\n")
















































































































































const YTsearch = require('youtube-search');
const youtubedl = require('youtube-dl');
const fs = require('fs');
const mkdirp = require('mkdirp');

const Controls = require('./Controls');
const Search = require('./Search');
const Graphics = require('./Graphics');

module.exports = {
  name: 'player',
  components: {
    Controls,
    Search,
    Graphics
  },
  data() {
    return {
      youtubeSearch: {
        maxResults: 10,
        key: 'AIzaSyD3Wt5im8JEaFu_oRAlGmAYxA1fHXEo0lQ'
      },
      searchText: '',
      srcVideo: '',
      isLoading: true,
      savePath: '../saved',
      player: null
    }
  },
  methods: {
    searchTrack(req) {
      if(req === '') return;

      this.isLoading = true;
      YTsearch(req, this.youtubeSearch, (err, results) => {
        if(err) throw err;
        this.setVideo(results[0].id);
      });
    },
    setVideo(id, cb) {
      this.track = youtubedl('http://www.youtube.com/watch?v=' + id, ['--format=18'], {cwd: __dirname});
      this.track.on('info', (info) => {
        this.trackInfo = info;
        this.searchText = info.title;
        this.srcVideo = info.url;
        this.isLoading = false;
        cb && cb();
      });
    },
    downloadTrack() {
      mkdirp(this.savePath, (err) => {
        if(err) throw err;
        this.track.pipe(fs.createWriteStream(this.savePath + '/' + this.trackInfo.title + '.mp4'));
      });
    }
  },
  mounted() {
    this.player = document.querySelector('video');
    this.setVideo('nbIAxHO5A7M', () => {
      this.searchText = 'Enter Track Name';
    });
  }
}

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div>\n  <div id=\"player\" class=\"app-drag\">\n    <video v-bind:src=\"srcVideo\" autoplay></video>\n  </div>\n  <transition name=\"hide\">\n    <graphics v-show=\"!isLoading\"></graphics>\n  </transition>\n\n  <search @searchTrack=\"searchTrack\" :queryTrack=\"searchText\" class=\"no-app-drag\"></search>\n  <controls @downloadTrack=\"downloadTrack\" :player=\"player\" class=\"no-app-drag\"></controls>\n\n  <transition name=\"hide\">\n    <div v-show=\"isLoading\" class=\"loader-wrap\">\n      <div class=\"signal\"></div>\n    </div>\n  </transition>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n#player {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  border-radius: 10px;\n  overflow: hidden;\n  width: 100%;\n  height: 99%;\n  background: #fff;\n}\n#player video {\n  min-width: 100%;\n  min-height: 100%;\n  width: auto;\n  height: auto;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%,-50%);\n          transform: translate(-50%,-50%);\n  -webkit-filter: blur(30px);\n          filter: blur(30px);\n  position: absolute;\n  border-radius: 10px;\n}\n\n.loader-wrap {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n\n.signal {\n  border: 5px solid #515970;\n  border-radius: 30px;\n  height: 30px;\n  left: 50%;\n  margin: -15px 0 0 -15px;\n  opacity: 0;\n  position: absolute;\n  top: 45%;\n  width: 30px;\n\n  -webkit-animation: pulsate 1s ease-out;\n\n          animation: pulsate 1s ease-out;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n}\n@-webkit-keyframes pulsate {\n  0% {\n    -webkit-transform: scale(.1);\n            transform: scale(.1);\n    opacity: 0.0;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: scale(1.2);\n            transform: scale(1.2);\n    opacity: 0;\n  }\n}\n@keyframes pulsate {\n  0% {\n    -webkit-transform: scale(.1);\n            transform: scale(.1);\n    opacity: 0.0;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: scale(1.2);\n            transform: scale(1.2);\n    opacity: 0;\n  }\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-e415dba6", module.exports)
  } else {
    hotAPI.update("_v-e415dba6", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}