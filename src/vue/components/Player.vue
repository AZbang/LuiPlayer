<template lang="html">
  <div>
    <div id="search">
      <input v-model="searchText" @keyup.enter="search">
    </div>
    <div id="player">
      <video v-bind:src="srcVideo" autoplay></video>
    </div>
    <div id="controls">
      <div class="progress-bar">
        <span class="time-stamp">{{currentTrackTime}} / {{totalTrackTime}}</span>
        <div class="tuls" v-bind:style="currentTrackTime / totalTrackTime * 100 + '%'"></div>
      </div>
    </div>
  </div>
</template>

<script>
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
</script>

<style lang="css">
  #search {
    position: absolute;
    width: 100vw;
    height: 50px;
    z-index: 1000;
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
  #player video {
      width: 150vw;
      height: 150vh;
      left: -25%;
      filter: blur(30px);
      position: absolute;
      top: -25%;
  }

  .progress-bar {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 40px;
    background: #FFC107;
    box-shadow: 0 0 10px #FFC107;
  }
  .progress-bar .tuls {
    height: 100%;
    background: #FF5722;
    box-shadow: 0 0 10px #FF5722;
  }
  .time-stamp {
    position: absolute;
    top: 10px;
    color: #333;
    font-family: Roboto;
  }
</style>
