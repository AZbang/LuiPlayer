<template lang="html">
  <div>
    <div id="player" class="app-drag">
      <video v-bind:src="srcVideo" autoplay></video>
    </div>
    <graphics></graphics>
    <search @searchTrack="searchTrack" :queryTrack="searchText" class="no-app-drag"></search>
    <controls @downloadTrack="downloadTrack" :player="player" class="no-app-drag"></controls>
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

  module.exports = {
    name: 'player',
    components: {
      Controls,
      Search,
      Graphics
    },
    data() {
      return {
        youtubeSearch: {
          maxResults: 10,
          key: 'AIzaSyD3Wt5im8JEaFu_oRAlGmAYxA1fHXEo0lQ'
        },
        searchText: '',
        srcVideo: '',
        savePath: '../saved',
        player: null
      }
    },
    methods: {
      searchTrack(req) {
        if(req === '') return;

        YTsearch(req, this.youtubeSearch, (err, results) => {
          if(err) throw err;
          this.setVideo(results[0].id);
        });
      },
      setVideo(id, cb) {
        this.track = youtubedl('http://www.youtube.com/watch?v=' + id, ['--format=18'], {cwd: __dirname});
        this.track.on('info', (info) => {
          this.trackInfo = info;
          this.searchText = info.title;
          this.srcVideo = info.url;
          cb && cb();
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
      this.setVideo('nbIAxHO5A7M', () => {
        this.searchText = 'Enter Track Name';
      });
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
</style>
