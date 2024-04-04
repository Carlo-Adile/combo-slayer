<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      startingTime: 15,
      remainingTime: 15,
      intervalId: null,
      oldState: null
    };
  },
  mounted() {
    this.startTimer();
  },
  watch: {
    /* gestisci cambiamenti dello stato */
    getGameState(newState) {
      if (newState === 'active' && this.oldState !== 'gameOver') {
        this.startTimer();
      } else if (newState === 'active' && this.oldState === 'gameOver') {
        this.remainingTime = this.startingTime;
        this.startTimer();
      } else if (newState === 'paused' || newState === 'gameOver' || newState === 'levelComplete') {
        clearInterval(this.intervalId);
        this.oldState = newState;
      }
      if (newState === 'levelComplete') {
        console.log("il watch di timer viene chiamato...")
        this.reduceMaxTime();
        this.levelCompletePoints();
      }
    }
  },
  methods: {
    ...mapActions(['updateScore']),
    ...mapActions(['resetScore']),
    ...mapActions(['updateGameState']),

    startTimer() {
      if (this.getGameState === 'active') {
        this.intervalId = setInterval(() => {
          this.remainingTime -= 0.1;
          if (this.remainingTime <= 0) {
            clearInterval(this.intervalId);
            this.timeOver();
          }
        }, 100);
      }
    },
    updateTimer() {
      this.remainingTime += 1.5;
      if (this.remainingTime > this.startingTime) {
        this.remainingTime = this.startingTime;
      }
    },
    restoreTimer() {
      this.remainingTime = this.startingTime;
    },
    timeOver() {
      this.updateGameState('gameOver');
      this.$emit('gameOver');
      this.startingTime = 15;
    },
    reduceMaxTime() {
      this.startingTime -= 1;
      this.remainingTime -= 1;
      console.log("il tempo diminuisce....", this.startingTime);
    },
    levelCompletePoints() {
      const maxPoints = 500;
      const percentage = (this.remainingTime / this.startingTime) * 100;
      const addScore = Math.floor((percentage / 100) * maxPoints)
      this.updateScore(addScore);
    }
  },
  computed: {
    ...mapGetters(['getGameState']),

    progress() {
      return ((this.remainingTime) / this.startingTime) * 100;
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  }
};
</script>

<template>
  <div id="my_timer" class="row w-100 d-flex mx-auto justify-content-center align-items-center">
    <!-- hourglass frame -->
    <div class="col-12 mx-auto" id="my_hourglass">
      <img src="../assets/hourglass/Inverted hourglass14.png" alt="">
    </div>
    <!-- timebar frame -->
    <div class="col-12 mx-auto">
      <div id="my_progress" class="progress" role="progressbar" aria-label="Timer" aria-valuenow="100" aria-valuemin="0"
        aria-valuemax="100">
        <div class="progress-bar bg-danger" role="progressbar" :style="{ width: progress + '%' }">{{
          remainingTime.toFixed(1) }} secondi rimanenti
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
@import '../assets/scss/font';
@import '../assets/scss/structure';

* {
  font-family: alagard;
}

#my_timer{
  height:100%;
}

#my_hourglass{
  height: 45%;
  margin-bottom: -0.5rem;

  img{
    height: 100%;
    width: auto;
    object-fit: cover;
  }
}

#my_progress {
  border: 1px solid #d7d1a7;
}

</style>
