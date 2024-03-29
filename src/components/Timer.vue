<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      startingTime: 5,
      remainingTime: 5,
      intervalId: null,
      oldState: null
    };
  },
  mounted() {
    this.startTimer();
  },
  watch: {
    getGameState(newState) {
      //avvia il timer quando lo stato di gioco diventa "active"
      if (newState === 'active' && this.oldState !== 'gameOver') {
        this.startTimer();
      }
      //praticamente new game per il timer
      else if (newState === 'active' && this.oldState === 'gameOver'){
        this.remainingTime = this.startingTime;
        this.startTimer();
      }
      //interrompe il timer quando lo stato di gioco diventa "paused" o "gameOver"
      else if (newState === 'paused' || newState === 'gameOver') {
        clearInterval(this.intervalId);
        this.oldState = newState;
        
        console.log("aggiornamento stato del gioco: ", this.oldState);
      }
    }
  },
  methods: {
    startTimer() {
      if (this.getGameState === 'active') {
        this.intervalId = setInterval(() => {
          this.remainingTime--;

          if (this.remainingTime <= 0) {
            clearInterval(this.intervalId);
            this.timeOver();
          }
        }, 1000);
      }
    },
    updateTimer() {
      console.log("aggiorniamo il timer!")
      this.remainingTime += 1;
      if (this.remainingTime > this.startingTime) {
        this.remainingTime = this.startingTime;
      }
    },
    timeOver(){
      //cambia game state a game over
      this.updateGameState('gameOver');
      console.log("timer dice Game Over!!!");
      console.log("secondo timer game state è...", this.getGameState);
    },
    ...mapActions(['updateGameState'])
  },
  computed: {
    ...mapGetters(['getGameState']),
    progress() {
      return (this.remainingTime / this.startingTime) * 100;
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  }
};
</script>

<template>
  <div>
    <p>Remaining Time: {{ remainingTime }} seconds</p>
    <div class="progress" role="progressbar" aria-label="Timer" aria-valuenow="100" aria-valuemin="0"
      aria-valuemax="100">
      <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }">{{ progress }}%</div>
    </div>
  </div>
</template>

<style scoped>
/* Stili della progress bar */
</style>
