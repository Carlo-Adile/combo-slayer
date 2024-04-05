<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      startingTime: 20,
      remainingTime: 20,
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
        this.reduceMaxTime();
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
      this.levelCompletePoints();
      this.remainingTime = this.startingTime;
    },
    /* game over */
    timeOver() {
      this.updateGameState('gameOver');
      this.$emit('gameOver');
      this.startingTime = 20;
    },
    reduceMaxTime() {
      if (this.startingTime > 12) {
        this.startingTime -= 2;
        this.remainingTime -= 2;
      } else if (this.startingTime <= 12 && this.startingTime > 9) {
        this.startingTime -= 0.5;
        this.remainingTime -= 0.5;
      } else if (this.startingTime <= 9 && this.startingTime > 5) {
        this.startingTime -= 0.25;
        this.remainingTime -= 0.25;
      } else if (this.startingTime <= 5 && this.startingTime > 4) {
        this.startingTime -= 0.15;
        this.remainingTime -= 0.15;
      } else if (this.startingTime <= 4 && this.startingTime > 2) {
        this.startingTime -= 0.1;
        this.remainingTime -= 0.1;
      } else {
        this.startingTime -= 0.01;
        this.remainingTime -= 0.01;
        console.log("helldiving");
      }
      console.log("il tempo diminuisce....", this.startingTime);
    },
    levelCompletePoints() {
      const maxPoints = 100;
      const percentage = (this.remainingTime / this.startingTime) * 100;
      const addScore = Math.floor((percentage / 100) * maxPoints);
      this.$emit('remainingTimeScore', addScore);
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

#my_timer {
  position: relative;
  z-index: 5;
  height: 100%;
}

#my_hourglass {
  height: 45%;
  margin-bottom: -0.5rem;

  img {
    height: 100%;
    width: auto;
    object-fit: cover;
  }
}

#my_progress {
  border: 1px solid #d7d1a7;
}
</style>
