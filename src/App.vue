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


  <!-- particles animation on bg -->
  <div class="animation-wrapper">
  <div class="particle particle-1"></div>
  <div class="particle particle-2"></div>
  <div class="particle particle-3"></div>
  <div class="particle particle-4"></div>


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

/* particles animation on bg */
/* Config */
$color-bg: #1e1e1e;
$color-particle: #fff;
$spacing: 2560px;
$time-1: 60s;
$time-2: 120s;
$time-3: 180s;
$time-4: 200s;

/* mixins */
@function particles($max) {
  $val: 0px 0px $color-particle;
  @for $i from 1 through $max {
    $val: #{$val}, random($spacing)+px random($spacing)+px $color-particle;
  }
  @return $val;
}

@mixin particles($max) {
  box-shadow: particles($max);
  border-radius: 50%;
}

/* Styles */
html, body {
  height: 100%;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  overflow: hidden;
}

.page-bg, .animation-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.page-bg {
  background: $color-bg;
  background-blend-mode: screen;
  background-size: cover;
  filter: grayscale(100%);
  z-index: -1;
}

.particle, .particle:after {
  background: transparent;
}

.particle:after {
  position: absolute;
  content: "";
  top: $spacing;
}

.particle-1 {
  animation: animParticle $time-1 linear infinite;
  @include particles(1000);
  height: 2px;
  width: 2px;
}

.particle-1:after {
  @include particles(900);
  height: 2px;
  width: 2px;
}

.particle-2 {
  animation: animParticle $time-2 linear infinite;
  @include particles(800);
  height: 2px;
  width: 2px;
}

.particle-2:after {
  @include particles(500);
  height: 3px;
  width: 3px;
}

.particle-3:after {
  @include particles(1100);
  height: 3px;
  width: 3px;
  border-radius: 50%;
}

.particle-4 {
  animation: animParticle $time-4 linear infinite;
  @include particles(1200);
  height: 1px;
  width: 1px;
}

.particle-4:after {
  @include particles(700);
  height: 1px;
  width: 1px;
}

@keyframes animParticle {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY($spacing * -1);
  }
}

.page-wrapper {
  text-align: center;
  color: #fff;
  z-index: 2;
}

h4 {
  color: #fff;
  font-family: Monoton;
  -webkit-animation: neon1 1.5s ease-in-out infinite alternate;
  -moz-animation: neon1 1.5s ease-in-out infinite alternate;
  animation: neon1 1.5s ease-in-out infinite alternate;
}

h4:hover {
  color: #FF1177;
  -webkit-animation: none;
  -moz-animation: none;
  animation: none;
}

/*glow for webkit*/

@-webkit-keyframes neon1 {
  from {
    text-shadow: 0 0 10px #fff,
      0 0 20px #fff,
      0 0 30px #fff,
      0 0 40px #FF1177,
      0 0 70px #FF1177,
      0 0 80px #FF1177,
      0 0 100px #FF1177,
      0 0 150px #FF1177;
  }
  to {
    text-shadow: 0 0 5px #fff,
      0 0 10px #fff,
      0 0 15px #fff,
      0 0 20px #FF1177,
      0 0 35px #FF1177,
      0 0 40px #FF1177,
      0 0 50px #FF1177,
      0 0 75px #FF1177;
  }
}

/*glow for mozilla*/

@-moz-keyframes neon1 {
  from {
    text-shadow: 0 0 10px #fff,
      0 0 20px #fff,
      0 0 30px #fff,
      0 0 40px #FF1177,
      0 0 70px #FF1177,
      0 0 80px #FF1177,
      0 0 100px #FF1177,
      0 0 150px #FF1177;
  }
  to {
    text-shadow: 0 0 5px #fff,
      0 0 10px #fff,
      0 0 15px #fff,
      0 0 20px #FF1177,
      0 0 35px #FF1177,
      0 0 40px #FF1177,
      0 0 50px #FF1177,
      0 0 75px #FF1177;
  }
}

/*glow*/

@keyframes neon1 {
  from {
    text-shadow: 0 0 10px #fff,
      0 0 20px #fff,
      0 0 30px #fff,
      0 0 40px #FF1177,
      0 0 70px #FF1177,
      0 0 80px #FF1177,
      0 0 100px #FF1177,
      0 0 150px #FF1177;
  }
  to {
    text-shadow: 0 0 5px #fff,
      0 0 10px #fff,
      0 0 15px #fff,
      0 0 20px #FF1177,
      0 0 35px #FF1177,
      0 0 40px #FF1177,
      0 0 50px #FF1177,
      0 0 75px #FF1177;
  }
}


</style>