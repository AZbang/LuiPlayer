<template lang="html">
  <div id="search" >
    <i class="material-icons search-icon">search</i>
    <input v-model="queryTrack" @keyup.enter="searchTrack">
  </div>
</template>

<script>
  module.exports = {
    name: 'search',
    props: ['queryTrack', 'isLoading'],
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
  #search .search-icon {
    top: 14px;
    left: 15px;
    position: absolute;
    color: #fff;
  }

  #search input {
    text-overflow: ellipsis;
    width: 70%;
    padding-left: 50px;
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
