<script>
  export default {
    name: "Levels",
    data(){
      return {
        numRounds: 5,
        currentLevel: 1,
        currentRound: 1,
        timeRemaining: 60
      }
    },
    methods: {
      completeRound(){
        if (this.currentRound < this.numRounds){
          this.currentRound++;
        }
        else{
          completeLevel()
        }
      },
      completeLevel(){
        this.currentLevel++,
        this.currentRound = 1,
        this.timeRemaining = 60
      }
    }
  }
</script>

<template>
  <div>
    <h2> Current Level: {{ currentLevel }}</h2>
    <h3>Current Round: {{ currentRound }}</h3>
    <h4>Time Remaining: {{ timeRemaining }}</h4>
  </div>
</template>


<style>

</style>