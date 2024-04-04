<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "GameOverScreen",
  data() {
    return {
      modalShown: false
    }
  },
  computed: {
    ...mapGetters(['getScore']),
    ...mapGetters(['getFinalScore']),
    ...mapGetters(['getGameState'])
  },
  methods: {
    ...mapActions(['updateGameState']),

    newGame() {
      this.modalShown = true
      this.updateGameState('preGame');
    },
    resumeGame() {
      this.updateGameState('active');
    },
    handleKeyDown(event) {
      if (this.getGameState === 'levelComplete' && event.key === 'Enter') {
        this.updateGameState('active')
      } else if(this.getGameState === 'preGame'){
        this.modalShown = true
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
}
</script>

<template>
  <div>
    <!-- game over screen -->
    <div class="modal-overlay" v-show="getGameState === 'gameOver'">
      <div class="modal-content">
        <h2>Game Over!</h2>
        <div>
          <h4>Punti totalizzati: {{ getFinalScore.toFixed(0) }}</h4>
        </div>
        <button @click="newGame">Start a new game</button>
      </div>
    </div>
    <!-- pause screen -->
    <div class="modal-overlay" v-show="getGameState === 'paused'">
      <div class="modal-content">
        <h2>Game paused</h2>
        <button @click="resumeGame">| P | Resume the game |</button>
      </div>
    </div>
    <!-- level complete -->
    <div class="modal-overlay" v-show="getGameState === 'levelComplete'">
      <div class="modal-content">
        <h2>You've completed a level!</h2>
        <p>Your timebar will be restored! get ready for a thougher challenge...</p>
        <button @click="resumeGame" @keydown.enter="resumeGame" tabindex="0">| Enter | Go to the next level |</button>
      </div>
    </div>

    <!-- pre-game instructions -->
    <div class="modal-overlay" v-show="getGameState === 'preGame' && this.modalShown === false ">
      <div class="modal-content">
        <br>
        <h2>Welcome to Combo Slayer!</h2>
        <p>Press directional arrows | <i class="fa-solid fa-arrow-up"></i> <i class="fa-solid fa-arrow-right"></i> <i class="fa-solid fa-arrow-down"></i> <i class="fa-solid fa-arrow-left"></i> | to complete combo and inflict damage to enemies!</p>
        <br>
        <h4>Beware of the time running out!</h4>
        <p>Timebar will slightly restore every time you complete a full combo sequence </p>
        <p>or completely upon completing a level consisting of 5 rounds when beating a whole level made of 5 rounds</p>
        
        <button @click="resumeGame" @keydown.enter="resumeGame" tabindex="0">| Enter | Start a new game! |</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/structure.scss';
@import '../assets/scss/font';

* {
  color: black;
}

.modal-overlay {
  font-family: alagard;

  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

i{
  font-size: 1.2rem;
}
</style>