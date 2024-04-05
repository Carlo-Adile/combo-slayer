<script>
import GameMaster from './components/GameMaster.vue';
import TopBanner from './components/TopBanner.vue';

const imgUrls = import.meta.glob('../assets/UI/*.png');
const imgHourglassUrls = import.meta.glob('../src/assets/hourglass/*.png');
const imgEnemyUrls = import.meta.glob('../assets/enemies/*.png');
const imgCursorsUrls = import.meta.glob('../src/assets/cursor/*.png');
const soundUrls = import.meta.glob('../src/assets/sound/*.mp3');
const soundWavUrls = import.meta.glob('../src/assets/sound/*.wav');

export default {
  name: "App",
  data() {
    return {
      enemy: null,
      imgUrls: {},
      imgHourglassUrls: {},
      imgEnemyUrls: {},
      imgCursorsUrls: {},
      soundUrls: {},
      soundWavUrls: {}
    }
  },
  components: {
    GameMaster,
    TopBanner
  },
  mounted() {
    this.loadResources();
  },
  methods: {
    loadResources() {
      this.loadImages(imgUrls, 'imgUrls');
      this.loadImages(imgHourglassUrls, 'imgHourglassUrls');
      this.loadImages(imgEnemyUrls, 'imgEnemyUrls');
      this.loadImages(imgCursorsUrls, 'imgCursorsUrls');
      this.loadSounds(soundUrls, 'soundUrls');
      this.loadSounds(soundWavUrls, 'soundWavUrls');
    },
    loadImages(imageUrls, propertyName) {
      Object.keys(imageUrls).forEach((key) => {
        imageUrls[key]().then((module) => {
          // Aggiungi la nuova proprietà direttamente all'oggetto
          this[propertyName][key] = module.default;
        });
      });
    },
    loadSounds(soundUrls, propertyName) {
      Object.keys(soundUrls).forEach((key) => {
        soundUrls[key]().then((module) => {
          // Aggiungi la nuova proprietà direttamente all'oggetto
          this[propertyName][key] = module.default;
        });
      });
    }
  }
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