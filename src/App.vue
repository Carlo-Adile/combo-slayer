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
    <div class="container">
      <div class="row mx-auto">
        <div class="col">
          <div id="main_frame">
            <GameMaster />
          </div>
        </div>
      </div>
    </div>

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
  height: 90vh;

  #main_frame {
    /* width: 700px; */
  }
}

#app_footer {
  @include align_all;
  height: 5vh;
}
</style>
