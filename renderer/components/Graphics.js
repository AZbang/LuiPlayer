var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n#graphics {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n")
























































  const siriWave = require('siriwavejs');

  module.exports = {
    name: 'graphics',
    methods: {
      calcAmplitude(waves) {
        if(waves[0] < -Infinity || waves[0] > Infinity) this.siriWave.amplitude = 0;
        else {
          this.siriWave.setAmplitude(waves[0]/200);
          this.siriWave.frequency = waves[0]/100;
        }
      }
    },
    mounted() {
      let video = document.querySelector('video');
      let graph = document.getElementById('graphics');
      let app = document.getElementById('app');
      this.siriWave = new SiriWave({
      	container: graph,
      	width: app.offsetWidth,
      	height: app.offsetHeight,
        speed: 0.12,
        style: 'default',
				amplitude: .3,
				autostart: true
      });

      let waves = new Uint8Array(1);
      let context = new AudioContext();
      let mediaSourceNode = context.createMediaElementSource(video);
      let analyserNode = context.createAnalyser();
      mediaSourceNode.connect(analyserNode);
      analyserNode.connect(context.destination);

      setInterval(() => {
        analyserNode.getByteFrequencyData(waves);
        this.calcAmplitude(waves);
      }, 500);
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
    hotAPI.createRecord("_v-32fca22d", module.exports)
  } else {
    hotAPI.update("_v-32fca22d", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}