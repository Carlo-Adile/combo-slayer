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

    startNewGame(){
      if(this.getGameState === 'preGame' || this.getGameState === 'gameOver'){
        console.log("start new game");
        this.updateGameState('active');
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
        this.updateGameState('reset');
      }
    },
    handleKeyPress(event) {
      //test
      console.log('Key premuta: ', event.key);
      if (event.key === 'p' || event.key === 'P' || event.key === 'Escape' || event.key === 'esc') {
        this.toggleGameState();
      } else if (this.getGameState === 'paused'){
        this.toggleGameState();
      };
    }
  }
}
</script>

<template>
  <div>
    <h3>Stato di gioco: {{ this.getGameState }}</h3>
    <h4 v-if="getGameState === 'preGame'">Premi qualsiasi tasto per iniziare</h4>
  </div>
</template>


<style></style>