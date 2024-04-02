<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "GameOverScreen",
  data() {
    return {

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

      this.updateGameState('preGame');
    },
    resumeGame() {
      this.updateGameState('active');
    },
    handleKeyDown() {
      if (this.getGameState === 'levelComplete') {
        this.updateGameState('active')
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
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
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/structure.scss';
@import '../assets/scss/font';

* {
  font-family: alagard;
  color: black;
}

.modal-overlay {
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
</style>