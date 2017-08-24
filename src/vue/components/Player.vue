<template lang="html">
  <div>
    <div id="player" class="app-drag">
      <video v-bind:src="srcVideo" autoplay></video>
    </div>

    <transition name="hide">
      <main-screen v-show="isMainScreeShow" class="app-drag"></main-screen>
    </transition>

    <search @searchTrack="searchTrack" :queryTrack="searchText" class="no-app-drag"></search>

    <transition name="hide">
      <graphics v-show="!isLoading"></graphics>
    </transition>

    <controls v-show="!isMainScreeShow" @downloadTrack="downloadTrack" class="no-app-drag"></controls>

    <transition name="hide">
      <div v-show="isLoading" class="loader-wrap">
        <div class="signal"></div>
      </div>
    </transition>
  </div>
</template>

<script>
  const YTsearch = require('youtube-search');
  const youtubedl = require('youtube-dl');
  const fs = require('fs');
  const mkdirp = require('mkdirp');

  const Controls = require('./Controls');
  const Search = require('./Search');
  const Graphics = require('./Graphics');
  const MainScreen = require('./MainScreen');

  module.exports = {
    name: 'player',
    components: {
      Controls,
      Search,
      Graphics,
      MainScreen
    },
    data() {
      return {
        youtubeSearch: {
          maxResults: 10,
          key: 'AIzaSyD3Wt5im8JEaFu_oRAlGmAYxA1fHXEo0lQ'
        },
        searchText: '',
        srcVideo: '',
        isLoading: false,
        isMainScreeShow: true,
        savePath: '../saved',
        player: null
      }
    },
    methods: {
      searchTrack(req) {
        if(req === '') return;

        this.isLoading = true;
        this.isMainScreeShow = false;

        YTsearch(req, this.youtubeSearch, (err, results) => {
          if(err) throw err;
          this.setVideo(results[0].id);
        });
      },
      setVideo(id) {
        this.track = youtubedl('http://www.youtube.com/watch?v=' + id, ['--format=18'], {cwd: __dirname});
        this.track.on('info', (info) => {
          this.trackInfo = info;
          this.searchText = info.title;
          this.srcVideo = info.url;
          this.isLoading = false;
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
      this.searchText = 'Enter Track Name';
    }
  }
</script>

<style lang="css">
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

  .loader-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .signal {
    border: 5px solid #515970;
    border-radius: 30px;
    height: 30px;
    left: 50%;
    margin: -15px 0 0 -15px;
    opacity: 0;
    position: absolute;
    top: 45%;
    width: 30px;

    animation: pulsate 1s ease-out;
    animation-iteration-count: infinite;
  }
  @keyframes pulsate {
    0% {
      transform: scale(.1);
      opacity: 0.0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
</style>
