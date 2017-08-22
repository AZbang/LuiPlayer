var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n#controls {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 20%;\n  background: #434b60;\n  border-radius: 0 0 10px 10px;\n}\n.timeslider {\n  width: 100%;\n  height: 5%;\n  background: #515970;\n  transition: all .5s;\n  cursor: pointer;\n}\n.timeslider:hover {\n  height: 10%;\n}\n.timeslider-fill, .volumeslider-fill {\n  position: relative;\n  transition: all .5s;\n  height: 100%;\n  background: #2196F3;\n}\n.timeslider-handle, .volumeslider-handle {\n  width: 20px;\n  height: 10px;\n  position: absolute;\n}\n.volumeslider-wrap {\n  position: relative;\n}\n.volumeslider {\n  position: absolute;\n  top: 11px;\n  background: #FFC107;\n  cursor: pointer;\n  left: 42px;\n  width: 65%;\n  height: 10px;\n}\n.volumeslider-icon {\n  font-size: 3em;\n  color: #FFC107;\n  cursor: pointer;\n}\n.time-stamp {\n  position: absolute;\n  top: -50px;\n  color: #fff;\n  background: #FFC107;\n  text-align: center;\n  width: 110px;\n  line-height: 30px;\n  left: 50%;\n  margin-left: -50px;\n  padding-top: 0;\n  height: 30px;\n  font-size: 15px;\n  border-radius: 20px;\n  box-shadow: 0 0 10px #FFC107;\n  font-family: Roboto;\n}\n\n.controls-bar {\n  width: 100%;\n  height: 95%;\n}\n.controls-bar .row {\n  height: 100%;\n}\n.button {\n  color: #ffffff;\n  text-align: center;\n}\n.button i {\n  font-size: 2em;\n  cursor: pointer;\n  transition: all .5s;\n}\n")





















































































































































































































const rangeSlider = require('rangeslider-pure');

module.exports = {
  name: 'controls',
  data() {
    return {
      currentTrackTime: null,
      totalTrackTime: null,
      timeTrackInPer: 0,
      isPlayTrack: true,
      isRestartTrackBtnShow: false,
      isDownloadedTrack: false,
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
    },
    downloadTrack() {
      // this.isDownloadedTrack = true;
      this.$emit('downloadTrack');
    },
    restartTrack() {
      this.isRestartTrackBtnShow = false;
      this.setTrackTime(0);
      this.playTrack();
    }
  },
  mounted() {
    this.player = document.querySelector('video');

    this.timeslider = document.querySelector('input[name="timeslider"]');
    rangeSlider.create(this.timeslider, {
      rangeClass: 'timeslider',
      fillClass: 'timeslider-fill',
      handleClass: 'timeslider-handle',
      min: 0,
      max: 100,
      step: 1,
      value: 0,
      onSlide: this.setTrackTime.bind(this)
    });

    // this.volumeslider = document.querySelector('input[name="volumeslider"]');
    // rangeSlider.create(this.volumeslider, {
    //   rangeClass: 'volumeslider',
    //   fillClass: 'volumeslider-fill',
    //   handleClass: 'volumeslider-handle',
    //   min: 0,
    //   max: 1,
    //   step: 0.1,
    //   value: .7,
    //   onSlide: (v) => this.setTrackVolume(v)
    // });

    this.player.ontimeupdate = () => this.updateTime();
    this.player.onended = () => this.isRestartTrackBtnShow = true;
    this.player.onplay = () => this.isRestartTrackBtnShow = false;
  }
}

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div id=\"controls\">\n  <div class=\"time-stamp\" v-show=\"false\">{{currentTrackTime | formatTime}} / {{totalTrackTime | formatTime}}</div>\n  <input name=\"timeslider\" type=\"range\">\n  <div class=\"controls-bar\">\n    <div class=\"row middle-xs\">\n      <div class=\"col-xs-3\">\n        <div class=\"box button\"><i class=\"material-icons\" @click=\"!isDownloadedTrack && downloadTrack()\">{{!isDownloadedTrack ? \"playlist_add\" : \"playlist_add_check\"}}</i></div>\n      </div>\n      <div class=\"col-xs-2\">\n        <div class=\"box button\"><i class=\"material-icons\">skip_previous</i></div>\n      </div>\n      <div class=\"col-xs-2\">\n        <div class=\"box button\">\n          <!-- ugly logic -->\n          <i class=\"material-icons\" @click=\"isRestartTrackBtnShow ? restartTrack() : isPlayTrack ? stopTrack() : playTrack()\">{{isRestartTrackBtnShow ? \"replay\" : isPlayTrack ? \"pause\" : \"play_arrow\"}}</i>\n        </div>\n      </div>\n      <div class=\"col-xs-2\">\n        <div class=\"box button\"><i class=\"material-icons\">skip_next</i></div>\n      </div>\n      <div class=\"col-xs-3\">\n        <div class=\"box button\">\n          <i class=\"material-icons\" @click=\"isSoundTrackOn ? offSoundTrack() : onSoundTrack()\">{{isSoundTrackOn ? \"volume_up\" : \"volume_mute\"}}</i>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n#controls {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 20%;\n  background: #434b60;\n  border-radius: 0 0 10px 10px;\n}\n.timeslider {\n  width: 100%;\n  height: 5%;\n  background: #515970;\n  transition: all .5s;\n  cursor: pointer;\n}\n.timeslider:hover {\n  height: 10%;\n}\n.timeslider-fill, .volumeslider-fill {\n  position: relative;\n  transition: all .5s;\n  height: 100%;\n  background: #2196F3;\n}\n.timeslider-handle, .volumeslider-handle {\n  width: 20px;\n  height: 10px;\n  position: absolute;\n}\n.volumeslider-wrap {\n  position: relative;\n}\n.volumeslider {\n  position: absolute;\n  top: 11px;\n  background: #FFC107;\n  cursor: pointer;\n  left: 42px;\n  width: 65%;\n  height: 10px;\n}\n.volumeslider-icon {\n  font-size: 3em;\n  color: #FFC107;\n  cursor: pointer;\n}\n.time-stamp {\n  position: absolute;\n  top: -50px;\n  color: #fff;\n  background: #FFC107;\n  text-align: center;\n  width: 110px;\n  line-height: 30px;\n  left: 50%;\n  margin-left: -50px;\n  padding-top: 0;\n  height: 30px;\n  font-size: 15px;\n  border-radius: 20px;\n  box-shadow: 0 0 10px #FFC107;\n  font-family: Roboto;\n}\n\n.controls-bar {\n  width: 100%;\n  height: 95%;\n}\n.controls-bar .row {\n  height: 100%;\n}\n.button {\n  color: #ffffff;\n  text-align: center;\n}\n.button i {\n  font-size: 2em;\n  cursor: pointer;\n  transition: all .5s;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-597562fc", module.exports)
  } else {
    hotAPI.update("_v-597562fc", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}