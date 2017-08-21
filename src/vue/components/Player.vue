<template lang="html">
  <div>
    <div id="search">
      <input v-model="searchText" @keyup.enter="search">
    </div>
    <div id="player">
      <video v-bind:src="srcVideo" autoplay></video>
    </div>
    <controls @downloadTrack="downloadTrack" :player="player"></controls>
  </div>
</template>

<script>
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
        savePath: '../saved/',
        player: null
      }
    },
    methods: {
      search() {
        if(this.searchText === '') return;

        YTsearch(this.searchText, this.youtubeSearch, (err, results) => {
          if(err) return console.log(err);
          this.setVideo(results[0].id);
        });
      },
      setVideo(id, cb) {
        this.track = youtubedl('http://www.youtube.com/watch?v=' + id, ['--format=18'], {cwd: __dirname});
        this.track.on('info', (info) => {
          this.trackInfo = info;
          this.searchText = info.title;
          this.srcVideo = info.url;
          cb();
        });
      },
      downloadTrack() {
        console.log(this.savePath + this.trackInfo.title + '.mp3');
        this.track.pipe(fs.createWriteStream(this.savePath + this.trackInfo.title + '.mp3'));
      }
    },
    mounted() {
      this.player = document.querySelector('video');
      this.setVideo('nbIAxHO5A7M', () => {
        this.searchText = 'Enter Track Name';
      });
    }
  }
</script>

<style lang="css">
  #search {
    position: absolute;
    width: 100%;
    height: 50px;
    z-index: 1000;
  }
  .search-track {
    font-size: 2em;
    text-align: center;
    line-height: 20px;
    color: #fff;
  }
  #search input {
      width: 100%;
      padding-left: 20px;
      height: 100%;
      background: transparent;
      font-size: 1.5em;
      border: none;
      color: #fff;
      font-family: Roboto;
  }
  #search input:focus {
    outline-offset: 0;
    outline: none;
  }
  #player {
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    height: 99%;
    background: #fff;
  }
  #player video {
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    filter: blur(30px);
    position: absolute;
    border-radius: 10px;
}
</style>
