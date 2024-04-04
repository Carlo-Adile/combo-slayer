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
    <div>
      <TopBanner />
    </div>
  </header>


  <div id="app_main">
    <GameMaster />
    
  </div>

  <div id="app_footer">

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
  height: 10vh;
}

#app_main {
  @include align_all;
  height: 80vh;

}

#app_footer {
  @include align_all;
  height: 10vh;
}
</style>
