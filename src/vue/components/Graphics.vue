<template lang="html">
  <div id="graphics"></div>
</template>

<script>
  const siriWave = require('siriwavejs');
  const createAnalyser = require('web-audio-analyser');

  module.exports = {
    name: 'graphics',
    methods: {
      calcAmplitude(waves) {
        if(waves[0] < -Infinity || waves[0] > Infinity) return;

        this.siriWave.amplitude = waves[0]*3 < 0 ? .3 : waves[0]*3;
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
</script>

<style lang="css">
  #graphics {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
