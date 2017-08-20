<template lang="html">
  <div>
    <div id="search">
      <input v-model="searchText" @keyup.enter="search">
    </div>
    <div id="player">
      <video v-bind:src="srcVideo" autoplay></video>
    </div>
    <controls :player="player"></controls>
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
</script>

<style lang="css">
  #search {
    position: absolute;
    width: 100vw;
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
  #player video {
      width: 150vw;
      height: 150vh;
      left: -25%;
      filter: blur(30px);
      position: absolute;
      top: -25%;
  }
</style>
