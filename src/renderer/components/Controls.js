var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n#controls {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 20%;\n  background: rgba(255, 255, 255, .3);\n}\n.timeslider {\n  width: 100%;\n  height: 5%;\n  transition: all .5s;\n  background: #FFC107;\n  box-shadow: 0 0 10px #FFC107;\n  transition: all .5s;\n  cursor: pointer;\n}\n.timeslider:hover {\n  height: 10%;\n}\n.timeslider-fill, .volumeslider-fill {\n  position: relative;\n  transition: all .5s;\n  height: 100%;\n  background: #FF5722;\n  box-shadow: 0 0 10px #FF5722;\n}\n.timeslider-handle, .volumeslider-handle {\n  width: 20px;\n  height: 100%;\n  position: absolute;\n}\n.volumeslider-wrap {\n  position: relative;\n}\n.volumeslider {\n  position: absolute;\n  top: 11px;\n  background: #FFC107;\n  cursor: pointer;\n  left: 42px;\n  width: 65%;\n  height: 10px;\n}\n.volumeslider-icon {\n  font-size: 2em;\n  color: #FFC107;\n  cursor: pointer;\n}\n.time-stamp {\n  position: absolute;\n  top: -50px;\n  color: #fff;\n  background: #FFC107;\n  text-align: center;\n  width: 110px;\n  line-height: 30px;\n  left: 50%;\n  margin-left: -50px;\n  padding-top: 0;\n  height: 30px;\n  font-size: 15px;\n  border-radius: 20px;\n  box-shadow: 0 0 10px #FFC107;\n  font-family: Roboto;\n}\n\n.controls-bar {\n  width: 100%;\n  height: 95%;\n}\n.controls-bar .row {\n  height: 100%;\n}\n.button {\n  font-size: 2.4em;\n  color: #FFC107;\n  text-align: center;\n}\n.button i {\n  cursor: pointer;\n  transition: all .5s;\n}\n.button i:hover {\n  color: #FF5722;\n  text-shadow: 0 0 10px #FF5722;\n}\n")


























































































































































































































const rangeSlider = require('rangeslider-pure');

module.exports = {
  name: 'controls',
  props: ['player'],
  data() {
    return {
      currentTrackTime: null,
      totalTrackTime: null,
      timeTrackInPer: 10,
      isPlayTrack: true,
      isSoundTrackOn: true
    }
  },
  filters: {
    formatTime(time) {
      if(time == null) return '00:00';

      time = Math.floor(time);
      let m = Math.floor(time / 60);
      let s = time - m*60;

      return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
    }
  },
  methods:  {
    setTrackTime(value) {
      this.player.currentTime = value*(this.totalTrackTime/100);
      this.updateTime();
    },
    setTrackVolume(value) {
      this.player.volume = value;
    },
    updateTime() {
      this.currentTrackTime = this.player.currentTime;
      this.totalTrackTime = this.player.duration;
      this.timeTrackInPer = this.currentTrackTime / this.totalTrackTime * 100;
      this.timeslider.rangeSlider.update({value: this.timeTrackInPer});
    },
    stopTrack() {
      this.isPlayTrack = false;
      this.player.pause();
    },
    playTrack() {
      this.isPlayTrack = true;
      this.player.play();
    },
    offSoundTrack() {
      this.isSoundTrackOn = false;
      this.player.volume = 0;
    },
    onSoundTrack() {
      this.isSoundTrackOn = true;
      this.player.volume = 1;
    }
  },
  mounted() {
    this.timeslider = document.querySelector('input[name="timeslider"]');
    rangeSlider.create(this.timeslider, {
      rangeClass: 'timeslider',
      fillClass: 'timeslider-fill',
      handleClass: 'timeslider-handle',
      min: 0,
      max: 100,
      step: .1,
      value: 0,
      onSlide: (v) => this.setTrackTime(v)
    });

    this.volumeslider = document.querySelector('input[name="volumeslider"]');
    rangeSlider.create(this.volumeslider, {
      rangeClass: 'volumeslider',
      fillClass: 'volumeslider-fill',
      handleClass: 'volumeslider-handle',
      min: 0,
      max: 1,
      step: 0.1,
      value: .7,
      onSlide: (v) => this.setTrackVolume(v)
    });

    setInterval(() => this.updateTime(), 1000);
  }
}

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div id=\"controls\">\n  <div class=\"time-stamp\" v-show=\"false\">{{currentTrackTime | formatTime}} / {{totalTrackTime | formatTime}}</div>\n  <input name=\"timeslider\" type=\"range\">\n  <div class=\"controls-bar\">\n    <div class=\"row middle-xs\">\n      <div class=\"col-xs-2\">\n        <div class=\"box button\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></div>\n      </div>\n      <div class=\"col-xs-2\"></div>\n      <div class=\"col-xs-1\">\n        <div class=\"box button\"><i class=\"fa fa-backward\" aria-hidden=\"true\"></i></div>\n      </div>\n      <div class=\"col-xs-1\">\n        <div class=\"box button\">\n          <i class=\"fa\"\n             :class=\"{'fa-play': !isPlayTrack, 'fa-pause': isPlayTrack}\"\n             @click=\"isPlayTrack ? stopTrack() : playTrack()\"\n             aria-hidden=\"true\"\n          ></i>\n        </div>\n      </div>\n      <div class=\"col-xs-1\">\n        <div class=\"box button\"><i class=\"fa fa-forward\" aria-hidden=\"true\"></i></div>\n      </div>\n      <div class=\"col-xs-2\"></div>\n      <div class=\"col-xs-3\">\n        <div class=\"volumeslider-wrap\">\n          <label for=\"volumeslider\">\n            <i class=\"fa volumeslider-icon\"\n               :class=\"{'fa-volume-off': !isSoundTrackOn, 'fa-volume-up': isSoundTrackOn}\"\n               @click=\"isSoundTrackOn ? offSoundTrack() : onSoundTrack()\"\n               aria-hidden=\"true\"\n            ></i>\n          </label>\n          <input name=\"volumeslider\" type=\"range\">\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n#controls {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 20%;\n  background: rgba(255, 255, 255, .3);\n}\n.timeslider {\n  width: 100%;\n  height: 5%;\n  transition: all .5s;\n  background: #FFC107;\n  box-shadow: 0 0 10px #FFC107;\n  transition: all .5s;\n  cursor: pointer;\n}\n.timeslider:hover {\n  height: 10%;\n}\n.timeslider-fill, .volumeslider-fill {\n  position: relative;\n  transition: all .5s;\n  height: 100%;\n  background: #FF5722;\n  box-shadow: 0 0 10px #FF5722;\n}\n.timeslider-handle, .volumeslider-handle {\n  width: 20px;\n  height: 100%;\n  position: absolute;\n}\n.volumeslider-wrap {\n  position: relative;\n}\n.volumeslider {\n  position: absolute;\n  top: 11px;\n  background: #FFC107;\n  cursor: pointer;\n  left: 42px;\n  width: 65%;\n  height: 10px;\n}\n.volumeslider-icon {\n  font-size: 2em;\n  color: #FFC107;\n  cursor: pointer;\n}\n.time-stamp {\n  position: absolute;\n  top: -50px;\n  color: #fff;\n  background: #FFC107;\n  text-align: center;\n  width: 110px;\n  line-height: 30px;\n  left: 50%;\n  margin-left: -50px;\n  padding-top: 0;\n  height: 30px;\n  font-size: 15px;\n  border-radius: 20px;\n  box-shadow: 0 0 10px #FFC107;\n  font-family: Roboto;\n}\n\n.controls-bar {\n  width: 100%;\n  height: 95%;\n}\n.controls-bar .row {\n  height: 100%;\n}\n.button {\n  font-size: 2.4em;\n  color: #FFC107;\n  text-align: center;\n}\n.button i {\n  cursor: pointer;\n  transition: all .5s;\n}\n.button i:hover {\n  color: #FF5722;\n  text-shadow: 0 0 10px #FF5722;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-f03adea4", module.exports)
  } else {
    hotAPI.update("_v-f03adea4", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}