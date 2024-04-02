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
      this.$refs.timer.restoreTimer();
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
  <div class="container-fluid mx-auto">
    <div class="row mx-auto justify-content-center">
      <div id="score_container">
        <div>
          <Score ref="score" />
        </div>

      </div>
      <div class="col-12">
        <div id="gameover_container">
          <GameOverScreen />
        </div>

        <div>
          <Rounds @completedRound="handleCompletedRound" @defeatedEnemy="handleDefeatedEnemy"
            @completedCombo="handleCompletedCombo" @completeLevel="handleCompletedLevel" />
        </div>





      </div>

      <div id="timer_frame">
        <Timer ref="timer" @gameOver="handleGameOver" />
      </div>


      <div>
        <GameState @newGame="handleNewGame" />
      </div>
    </div>

  </div>

</template>

<style scoped>
* {
  padding: 0;
  overflow-y: hidden;
  margin: 0 auto;
}

/* score */
#score_container {
  position: fixed;
  width: 280px;
  left: 18%;
  bottom: 17%;
}

#timer_frame {
  position: fixed;
  width: 60%;
  bottom: 1%;
  left: 20%;
}
</style>
