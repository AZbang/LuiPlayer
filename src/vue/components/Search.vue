<template lang="html">
  <div id="search" >
    <input v-model="queryTrack | shortText" @keyup.enter="searchTrack">
  </div>
</template>

<script>
  module.exports = {
    name: 'search',
    props: ['queryTrack'],
    data() {
      return {
        queryTrack: ''
      }
    },
    filters: {
      shortText(str, 30) {
        str.length = 30;
        return str;
      }
    },
    methods: {
      searchTrack() {
        this.$emit('searchTrack', this.queryTrack);
      }
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

  #search input {
      width: 100%;
      padding-left: 20px;
      height: 100%;
      background: transparent;
      font-size: 1.2em;
      border: none;
      color: #fff;
      font-family: Roboto;
  }
  #search input:focus {
    outline-offset: 0;
    outline: none;
  }
</style>
