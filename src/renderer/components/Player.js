var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n#search {\n  position: absolute;\n  width: 100vw;\n  height: 50px;\n  z-index: 1000;\n}\n.search-track {\n  font-size: 2em;\n  text-align: center;\n  line-height: 20px;\n  color: #fff;\n}\n#search input {\n    width: 100%;\n    padding-left: 20px;\n    height: 100%;\n    background: transparent;\n    font-size: 1.5em;\n    border: none;\n    color: #fff;\n    font-family: Roboto;\n}\n#search input:focus {\n  outline-offset: 0;\n  outline: none;\n}\n#player video {\n    width: 150vw;\n    height: 150vh;\n    left: -25%;\n    -webkit-filter: blur(30px);\n            filter: blur(30px);\n    position: absolute;\n    top: -25%;\n}\n")



























































































const YTsearch = require('youtube-search');
const youtubedl = require('youtube-dl');
const fs = require('fs');

const Controls = require('./Controls');

module.exports = {
  name: 'player',
  components: {
    Controls
  },
  data() {
    return {
      youtubeSearch: {
        maxResults: 10,
        key: 'AIzaSyD3Wt5im8JEaFu_oRAlGmAYxA1fHXEo0lQ'
      },
      searchText: '',
      srcVideo: '',
      player: null
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
    this.player = document.querySelector('video');
  }
}

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div>\n  <div id=\"search\">\n    <input v-model=\"searchText\" @keyup.enter=\"search\">\n  </div>\n  <div id=\"player\">\n    <video v-bind:src=\"srcVideo\" autoplay></video>\n  </div>\n  <controls :player=\"player\"></controls>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n#search {\n  position: absolute;\n  width: 100vw;\n  height: 50px;\n  z-index: 1000;\n}\n.search-track {\n  font-size: 2em;\n  text-align: center;\n  line-height: 20px;\n  color: #fff;\n}\n#search input {\n    width: 100%;\n    padding-left: 20px;\n    height: 100%;\n    background: transparent;\n    font-size: 1.5em;\n    border: none;\n    color: #fff;\n    font-family: Roboto;\n}\n#search input:focus {\n  outline-offset: 0;\n  outline: none;\n}\n#player video {\n    width: 150vw;\n    height: 150vh;\n    left: -25%;\n    -webkit-filter: blur(30px);\n            filter: blur(30px);\n    position: absolute;\n    top: -25%;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-0b14ef59", module.exports)
  } else {
    hotAPI.update("_v-0b14ef59", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}