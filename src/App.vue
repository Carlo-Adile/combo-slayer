<script>
import GameState from './components/GameState.vue';
import Rounds from './components/Rounds.vue';
import Timer from './components/Timer.vue';
import Score from './components/Score.vue';

export default {
  name: "App",
  data(){
    return {
      enemy: null
    }
  },
  components: {
    Rounds,
    Timer,
    GameState,
    Score
    
  },
  mounted(){
    console.log("benvenuto!")
  },
  methods: {
    //passa a Timer un evento per aggiornare il timer rimanente
    handleCompletedRound(){
      this.$refs.timer.updateTimer();
    }
  }
}
</script>

<template>
  <div>
    
    <Score />
    
    <br>

    <Rounds @completedRound="handleCompletedRound" />

    <br>
    <br>

    <Timer ref="timer" />

    <br>
    <br>

    <GameState />


  </div>

</template>

<style scoped></style>
