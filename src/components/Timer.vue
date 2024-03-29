<template>
  <div>
    <p>Remaining Time: {{ remainingTime }} seconds</p>
    <div class="progress" role="progressbar" aria-label="Timer" aria-valuenow="100" aria-valuemin="0"
      aria-valuemax="100">
      <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }">{{ progress }}%</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startingTime: 20,
      remainingTime: 20,
      intervalId: null
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      this.remainingTime = this.startingTime;
      this.intervalId = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
          clearInterval(this.intervalId);
        }
      }, 1000);
    },
    updateTimer() {
      console.log("aggiorniamo il timer!")
      this.remainingTime += 1;
      if(this.remainingTime > this.startingTime){
        this.remainingTime = this.startingTime;
      }
    }
  },
  computed: {
    progress() {
      return (this.remainingTime / this.startingTime) * 100;
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  }
};
</script>

<style scoped>
/* Stili della progress bar */
</style>
