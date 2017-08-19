var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n#search {\n  position: absolute;\n  width: 100vw;\n  height: 50px;\n  z-index: 1000;\n}\n#search input {\n    width: 100%;\n    padding-left: 20px;\n    height: 100%;\n    background: transparent;\n    font-size: 1.5em;\n    border: none;\n    color: #fff;\n    font-family: Roboto;\n}\n#player video {\n    width: 150vw;\n    height: 150vh;\n    left: -25%;\n    -webkit-filter: blur(30px);\n            filter: blur(30px);\n    position: absolute;\n    top: -25%;\n}\n\n.progress-bar {\n  position: absolute;\n  bottom: 0;\n  width: 100vw;\n  height: 40px;\n  background: #FFC107;\n  box-shadow: 0 0 10px #FFC107;\n}\n.progress-bar .tuls {\n  height: 100%;\n  background: #FF5722;\n  box-shadow: 0 0 10px #FF5722;\n}\n.time-stamp {\n  position: absolute;\n  top: 10px;\n  color: #333;\n  font-family: Roboto;\n}\n")















































































































const YTsearch = require('youtube-search');
const youtubedl = require('youtube-dl');
const fs = require('fs');

module.exports = {
  name: 'player',
  data() {
    return {
      youtubeSearch: {
        maxResults: 10,
        key: 'AIzaSyD3Wt5im8JEaFu_oRAlGmAYxA1fHXEo0lQ'
      },
      searchText: '',
      srcVideo: '',
      currentTrackTime: 0,
      totalTrackTime: 1,
    }
  },
  computed: {
    getTrackTimePer() {
      return this.currentTrackTime / this.totalTrackTime * 100 + '%';
    }
  },
  methods: {
    search() {
      if(this.searchText === '') return;

      YTsearch(this.searchText, this.youtubeSearch, (err, results) => {
        if(err) return console.log(err);
        let video = youtubedl('http://www.youtube.com/watch?v=' + results[0].id, ['--format=18'], {cwd: __dirname});
        video.on('info', (info) => {
          this.searchText = info.title;
          this.srcVideo = info.url;
        });
      });
    }
  },
  mounted() {
    let video = document.querySelector('video');
    video.ontimeupdate = () => {
      this.currentTrackTime = video.currentTime;
      this.totalTrackTime = video.duration;
    }
  }
}

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div>\n  <div id=\"search\">\n    <input v-model=\"searchText\" @keyup.enter=\"search\">\n  </div>\n  <div id=\"player\">\n    <video v-bind:src=\"srcVideo\" autoplay></video>\n  </div>\n  <div id=\"controls\">\n    <div class=\"progress-bar\">\n      <span class=\"time-stamp\">{{currentTrackTime}} / {{totalTrackTime}}</span>\n      <div class=\"tuls\" v-bind:style=\"currentTrackTime / totalTrackTime * 100 + '%'\"></div>\n    </div>\n  </div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n#search {\n  position: absolute;\n  width: 100vw;\n  height: 50px;\n  z-index: 1000;\n}\n#search input {\n    width: 100%;\n    padding-left: 20px;\n    height: 100%;\n    background: transparent;\n    font-size: 1.5em;\n    border: none;\n    color: #fff;\n    font-family: Roboto;\n}\n#player video {\n    width: 150vw;\n    height: 150vh;\n    left: -25%;\n    -webkit-filter: blur(30px);\n            filter: blur(30px);\n    position: absolute;\n    top: -25%;\n}\n\n.progress-bar {\n  position: absolute;\n  bottom: 0;\n  width: 100vw;\n  height: 40px;\n  background: #FFC107;\n  box-shadow: 0 0 10px #FFC107;\n}\n.progress-bar .tuls {\n  height: 100%;\n  background: #FF5722;\n  box-shadow: 0 0 10px #FF5722;\n}\n.time-stamp {\n  position: absolute;\n  top: 10px;\n  color: #333;\n  font-family: Roboto;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-0b14ef59", module.exports)
  } else {
    hotAPI.update("_v-0b14ef59", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}