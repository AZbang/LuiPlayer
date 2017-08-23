var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n#graphics {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n")

























































  const siriWave = require('siriwavejs');
  const createAnalyser = require('web-audio-analyser');

  module.exports = {
    name: 'graphics',
    methods: {
      calcAmplitude(waves) {
        if(waves[0] < -Infinity || waves[0] > Infinity) return;

        this.siriWave.speed = waves[0]-5 < 0 ? .12 : waves[0]-5;
        this.siriWave.amplitude = waves[0];
      }
    },
    mounted() {
      let video = document.querySelector('video');
      let graph = document.getElementById('graphics');
      this.siriWave = new SiriWave({
      	container: graph,
      	width: graph.offsetWidth,
      	height: graph.innerHeight,
        speed: 0.12,
        style: 'default',
				amplitude: .3,
				autostart: true
      });

      video.onloadeddata = () => {
        let context = new AudioContext();
        let mediaSourceNode = context.createMediaElementSource(video);
        let analyserNode = context.createAnalyser();
        mediaSourceNode.connect(analyserNode);
        analyserNode.connect(context.destination);

        let waves = new Float32Array(1);
        setInterval(() => {
          analyserNode.getFloatTimeDomainData(waves);
          this.calcAmplitude(waves);
        }, 500);
      }
    }
  }

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div id=\"graphics\"></div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n#graphics {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-c73e8052", module.exports)
  } else {
    hotAPI.update("_v-c73e8052", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}