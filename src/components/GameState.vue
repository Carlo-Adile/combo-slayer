<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "GameState",
  emits: ['newGame'],
  data() {
    return {

    }
  },
  mounted() {
    window.addEventListener('keydown', this.startNewGame);
    window.addEventListener('keydown', this.handleKeyPress);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.startNewGame);
    window.removeEventListener('keydown', this.handleKeyPress);
  },
  computed: {
    ...mapGetters(['getGameState'])
  },
  methods: {
    ...mapActions(['updateGameState']),

    startNewGame() {
      if (this.getGameState === 'preGame') {
        this.updateGameState('active');
        this.$emit('newGame');
        this.$refs.track1.volume = 0.1;
        this.$refs.track1.play();

      }
    },
    toggleGameState() {
      if (this.getGameState === 'active') {
        this.updateGameState('paused');
        this.$refs.track1.pause();
      }
      else if (this.getGameState === 'paused') {
        this.updateGameState('active');
        this.$refs.track1.play();
      }
      else if (this.getGameState === 'gameOver') {
        this.$refs.track1.pause();
        this.$refs.track1.currentTime = 0;
        console.log("non puoi entrare in pausa da game over")
      }
    },
    disableTrack1() {
      this.$refs.track1.volume = 0;
    },
    handleKeyPress(event) {
      if (event.key === 'p' || event.key === 'P' || event.key === 'Escape' || event.key === 'esc') {
        if (this.getGameState !== 'gameOver') {
          this.toggleGameState();
        }
      };
    }
  }
}
</script>

<template>
  <!-- dev check -->
  <div id="state_frame">
    <!-- <h3>Stato di gioco: {{ this.getGameState }}</h3> -->
    <!-- <p v-if="getGameState === 'preGame'">Premi qualsiasi tasto per iniziare</p>
    <p v-if="getGameState === 'levelComplete'">Premi enter per iniziare il prossimo livello</p> -->
    <button id="audio_button" @click="disableTrack1"></button>
  </div>

  <!-- music -->
  <audio ref="track1" src="./src/assets/sound/track1.mp3"></audio>
</template>


<style lang="scss" scoped>
@import '../assets/scss/font';
@import '../assets/scss/structure';

*{
  font-family: alagard;
}

#state_frame{
  position: absolute;
  top: 0%;
  left: 0%;
  display: flex;
  align-items: center;

  p{
    height: 20px;
    display: inline;
    font-size: 1.2rem;
  }

  #audio_button{
    position: fixed;
    bottom: 3%;
    left: 97%;
    display: inline;
    background-color: rgba(255, 255, 255, 0.384);
    width: 40px;
    height:40px;
    background-image: url(../src/assets/UI/Pressed_03.png);
    background-repeat: no-repeat;
    background-size: cover;
  }
}

</style>