<script>
import GameState from './GameState.vue';
import Rounds from './Rounds.vue';
import Timer from './Timer.vue';
import Score from './Score.vue';
import GameOverScreen from './GameOverScreen.vue';

export default {
  name: "GameMaster",
  data() {
    return {
      enemy: null
    }
  },
  components: {
    Rounds,
    Timer,
    GameState,
    Score,
    GameOverScreen

  },
  mounted() {
    console.log("benvenuto!")
  },
  methods: {
    //passa a Timer un evento per aggiornare il timer rimanente
    handleCompletedRound() {
      console.log("hai superato un round!")
      this.$refs.timer.updateTimer();
      this.$refs.score.updateRound();
    },
    handleDefeatedEnemy() {
      console.log("hai sconfitto un nemico!")
      this.$refs.score.updateEnemy();
    },
    handleCompletedCombo() {
      console.log("hai eseguito una combo con successo!");
      this.$refs.score.updateCombo();
    },
    handleCompletedLevel() {
      console.log("hai completato un livello intero!");
      this.$refs.score.updateLevel();
    },
    handleGameOver() {
      console.log("Game Over");
    },
    handleNewGame() {
      console.log("New game started!");
      this.$refs.score.updateNewGame();
    }
  }
}
</script>

<template>
  <div class="container-fluid border mx-auto">
    <div class="row mx-auto justify-content-between">
      <div class="col-3" id="score_container">
        <Score ref="score" />
      </div>
      <div class="col-6">
        <div id="gameover_container">
          <GameOverScreen />
        </div>
        


        <Rounds @completedRound="handleCompletedRound" @defeatedEnemy="handleDefeatedEnemy"
          @completedCombo="handleCompletedCombo" @completeLevel="handleCompletedLevel" />

        <Timer ref="timer" @gameOver="handleGameOver" />

        

        
        <br>

      </div>
      <div class="col-3">
        <GameState @newGame="handleNewGame" />
      </div>
    </div>

  </div>

</template>

<style scoped>
*{
  padding: 0;
}

#score_container{
  position: relative;

  div{
    position: absolute;
    left:40%;
    bottom: 25%;
  }
}
</style>
