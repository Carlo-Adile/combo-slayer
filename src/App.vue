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
      console.log("hai superato un round!")
      this.$refs.timer.updateTimer();
      this.$refs.score.updateRound();
    },
    handleDefeatedEnemy(){
      console.log("hai sconfitto un nemico!")
      this.$refs.score.updateEnemy();
    },
    handleCompletedCombo(){
      console.log("hai eseguito una combo con successo!");
      this.$refs.score.updateCombo();
    },
    handleCompletedLevel(){
      console.log("hai completato un livello intero!");
      this.$refs.score.updateLevel();
    },
    handleGameOver(){
      console.log("Game Over");
    },
    handleNewGame(){
      console.log("New game started!");
      this.$refs.score.updateNewGame();
    }
  }
}
</script>

<template>
  <div>
    
    <Score ref="score" />
    
    <br>

    <Rounds 
    @completedRound="handleCompletedRound"
    @defeatedEnemy="handleDefeatedEnemy"
    @completedCombo="handleCompletedCombo"
    @completeLevel="handleCompletedLevel"
     />

    <br>
    <br>

    <Timer ref="timer" 
    @gameOver="handleGameOver"
    />

    <br>
    <br>

    <GameState 
    @newGame="handleNewGame"
    />


  </div>

</template>

<style scoped></style>
