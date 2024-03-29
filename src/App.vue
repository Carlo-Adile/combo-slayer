<script>
import GameState from './components/GameState.vue';
import Enemies from './components/Enemies.vue';
import Levels from './components/Levels.vue';
import Combos from './components/Combos.vue';
import Rounds from './components/Rounds.vue';
import Timer from './components/Timer.vue';

export default {
  name: "App",
  data(){
    return {
      enemy: null
    }
  },
  components: {
    Rounds,
    Timer
    
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

    <Rounds @completedRound="handleCompletedRound" />

    <br>
    <br>

    <Timer ref="timer" />

  </div>

</template>

<style scoped></style>
