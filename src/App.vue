<script>
import GameMaster from './components/GameMaster.vue';
import TopBanner from './components/TopBanner.vue'

export default {
  name: "App",
  data() {
    return {
      enemy: null
    }
  },
  components: {
    GameMaster,
    TopBanner

  },
  methods: {

  },

}

</script>

<template>
  <header id="app_header">
    <TopBanner />
    <hr class="w-100 border border-2 border-danger">
  </header>

  <div id="app_main">
    <GameMaster />
  </div>

  <div id="app_footer">
    <hr class="w-100 border border-2 border-danger">
  </div>

</template>

<style lang="scss" scoped>
@import './assets/scss/structure.scss';

* {
  background-color: #282828;
  color: lightgrey;
  cursor: url('./assets/cursor/01.png'), auto;

  overflow-y: hidden;
}

#app_header {
  @include align_all;
  height: 12vh;

  position: relative;
  hr{
    position: absolute;
    bottom: 0;
  }
}

#app_main {
  @include align_all;
  height: 80vh;

}

#app_footer {
  @include align_all;
  position: relative;
  height: 8vh;

  position: relative;
  hr{
    position: absolute;
    top: 0;
  }
}

</style>
