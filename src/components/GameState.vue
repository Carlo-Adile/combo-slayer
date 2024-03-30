<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "GameState",
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
      }
    },
    toggleGameState() {
      if (this.getGameState === 'active') {
        this.updateGameState('paused');
      }
      else if (this.getGameState === 'paused') {
        this.updateGameState('active')
      }
      else if (this.getGameState === 'gameOver') {
        console.log("non puoi entrare in pausa da game over")
      }
    },
    handleKeyPress(event) {
      /* 
      al momento non riesco a impedire che il gioco passi da game over a pause, anche se ciò non rovina il gioco, non è intenzionale.
      probabilmente il conflitto è dovuto a start new game.
      pare che lo stato di gioco che controlliamo è sempre indietro di una fase.
      */
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
  <div>
    <h3>Stato di gioco: {{ this.getGameState }}</h3>
    <h4 v-if="getGameState === 'preGame'">Premi qualsiasi tasto per iniziare</h4>
    <h4 v-if="getGameState === 'paused'">Premi p oppure esc per riprendere la partita</h4>
  </div>
</template>


<style></style>