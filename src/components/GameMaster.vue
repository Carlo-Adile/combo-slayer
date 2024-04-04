<script>
import GameState from './GameState.vue';
import Rounds from './Rounds.vue';
import Timer from './Timer.vue';
import Score from './Score.vue';
import GameOverScreen from './GameOverScreen.vue';
import World from './World.vue';
import Enemies from './Enemies.vue';
import Combos from './Combos.vue';

import { mapGetters, mapActions } from 'vuex';

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
    GameOverScreen,
    World,
    Combos,
    Enemies

  },
  computed: {
    ...mapGetters(['getGameState']),
    ...mapGetters(['getScore'])
  },
  mounted() {
    console.log("benvenuto!")
  },
  methods: {
    ...mapActions(['updateGameState']),


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
    handleCompletedCombo(damage) {
      console.log("hai eseguito una combo con successo! passiamo i danni ad Enemies");
      this.$refs.enemies.applyDamage(damage);
      this.$refs.score.updateCombo();
    },
    handleCompletedLevel() {
      console.log("hai completato un livello intero!");
      this.$refs.score.updateLevel();
      this.$refs.timer.restoreTimer();
      this.updateGameState('levelComplete');
      console.log("proviamo ad aggiornare game state a levelCompleted", this.getGameState)
    },
    handleDefeatedEnemy() {
      console.log("nemico sconfitto, passiamo al round successivo...")
      this.$refs.rounds.completedRound();
    },
    handleGameOver() {
      console.log("Game Over");
    },
    handleNewGame() {
      console.log("New game started!");
      this.$refs.score.updateNewGame();
    },
  }
}
</script>

<template>
  <!-- new template for COMPLETE UI -->
  <div id="game_master_ui" class="debug">

    <!-- background for main UI - everything except timebar -->
    <div id="my_background">
      <img src="../assets/UI/game_Master_UI.png" alt="" class="responsive-img my_background">

      <div id="my_world_frame">
        <World />
      </div>

      <div id="my_enemy_frame">
        <Enemies ref="enemies" @defeatedEnemy="handleDefeatedEnemy" />
      </div>

      <div class="" id="my_score_frame">
        <Score ref="score" />
      </div>

      <div id="my_combos_frame">
        <Combos @completedCombo="handleCompletedCombo" />
      </div>

      <div id="my_rounds_frame">
        <Rounds ref="rounds" @completedRound="handleCompletedRound" @completedLevel="handleCompletedLevel" />
      </div>

    </div>

    <div id="my_timer_frame">
      <Timer ref="timer" @gameOver="handleGameOver" />
    </div>

    <!-- not visible on default -->
    <GameState @newGame="handleNewGame" />
    <!-- modals for gameState: pause, levelComplete and gameOver -->
    <GameOverScreen />

  </div>

  <!-- <div class="container-fluid mx-auto">
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
          <Rounds @completedRound="handleCompletedRound"      @defeatedEnemy="handleDefeatedEnemy"
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

  </div> -->

</template>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0 auto;
}

/* 
  New CSS 
*/

.debug {
  border: 1px dashed white;
}

#game_master_ui {
  display: flex;
  justify-content: center;
  position: relative;
  height: 100%;
  width: 100%;
}

#my_background {
  position: absolute;
  z-index: 1;
  height: 100%;
  width: auto;

  img {
    height: 100%;
    width: auto;
    object-fit: cover;
  }
}

#my_world_frame {
  position: absolute;
  z-index: 2;
  top: 10.5%;
  left: 14.5%;

  width: 47%;
  height: 100%;
}

/* to fix !!! */
#my_enemy_frame {
  position: absolute;
  z-index: 2;
  top: 10%;
  left: 25%;

  width: 30%;
  height: 30%;
}

#my_combos_frame {
  position: absolute;
  z-index: 2;
  top: 59%;
  left: 23.5%;

  width: 51%;
  height: 23%;
}

#my_rounds_frame {
  position: absolute;
  z-index: 2;
  top: 2.5%;
  left: 22%;


}

#my_score_frame {
  min-width: 100px;
  min-height: 100px;

  position: absolute;
  z-index: 2;
  top: 82.5%;
  left: 24%;
}

#my_timer_frame {
  position: absolute;
  bottom: 0.5%;

  width: 60%;
  height: 10%;
}
</style>
