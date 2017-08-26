<template lang="html">
  <div id="graphics"></div>
</template>

<script>
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
