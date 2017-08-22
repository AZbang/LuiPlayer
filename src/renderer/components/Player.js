var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n  #player {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    border-radius: 10px;\n    overflow: hidden;\n    width: 100%;\n    height: 99%;\n    background: #fff;\n  }\n  #player video {\n    min-width: 100%;\n    min-height: 100%;\n    width: auto;\n    height: auto;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%,-50%);\n            transform: translate(-50%,-50%);\n    -webkit-filter: blur(30px);\n            filter: blur(30px);\n    position: absolute;\n    border-radius: 10px;\n}\n")


































































































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
      savePath: '../saved',
      player: null
    }
  },
  methods: {
    searchTrack(req) {
      if(req === '') return;

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
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div>\n  <div id=\"player\" class=\"app-drag\">\n    <video v-bind:src=\"srcVideo\" autoplay></video>\n  </div>\n  <graphics></graphics>\n  <search @searchTrack=\"searchTrack\" :queryTrack=\"searchText\" class=\"no-app-drag\"></search>\n  <controls @downloadTrack=\"downloadTrack\" :player=\"player\" class=\"no-app-drag\"></controls>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n  #player {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    border-radius: 10px;\n    overflow: hidden;\n    width: 100%;\n    height: 99%;\n    background: #fff;\n  }\n  #player video {\n    min-width: 100%;\n    min-height: 100%;\n    width: auto;\n    height: auto;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%,-50%);\n            transform: translate(-50%,-50%);\n    -webkit-filter: blur(30px);\n            filter: blur(30px);\n    position: absolute;\n    border-radius: 10px;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-e415dba6", module.exports)
  } else {
    hotAPI.update("_v-e415dba6", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}