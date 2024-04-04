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
    handleTimeScore(timeScore){
      this.$refs.score.updateTimeScore(timeScore);
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

      <!-- world and enemy -->
      <div id="my_main_frame">

        <div id="my_world_frame">
          <World />
        </div>

        <div id="my_enemy_frame">
          <Enemies ref="enemies" @defeatedEnemy="handleDefeatedEnemy" />
        </div>

        <div id="my_rounds_frame">
          <Rounds ref="rounds" @completedRound="handleCompletedRound" @completedLevel="handleCompletedLevel" />
        </div>


      </div>

      <!-- combos, score and other actions -->
      <div id="my_second_frame">

        <div id="my_combos_frame">
          <Combos @completedCombo="handleCompletedCombo" />
        </div>

        <div class="" id="my_score_frame">
          <Score ref="score" />
        </div>

      </div>




    </div>

    <div id="my_timer_frame">
      <Timer ref="timer" @gameOver="handleGameOver"
      @remainingTimeScore="handleTimeScore" />
    </div>

    <!-- not visible on default -->
    <GameState @newGame="handleNewGame" />
    <!-- modals for gameState: pause, levelComplete and gameOver -->
    <GameOverScreen />

  </div>

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
  /* border: 1px dashed white; */
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

/*************************
world and enemy 
**************************/
#my_main_frame {
  position: absolute;
  z-index: 2;
  top: 10%;
  left: 12%;

  width: 50%;
  height: 33%;

  border: 2px dashed black;
}

#my_world_frame {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  /* border: 2px dashed black; */
}

/* to fix !!! */
#my_enemy_frame {
  overflow: visible;
  position: absolute;
  z-index: 2;
  top: 0%;
  left: 20%;

  width: 55%;
  height: 60%;

  /* border: 2px dashed black; */
}

/*************************
combo, score and actions
**************************/

#my_second_frame {
  position: absolute;
  z-index: 2;
  top: 58.5%;
  left: 22%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 52%;
  height: 28%;

  /* border: 2px dashed black; */
}


#my_combos_frame {
  width: 100%;
  height: 42%;

  /* border: 2px dashed black; */
}

#my_score_frame {
  width: 100%;

  /* border: 2px dashed black; */
}

#my_rounds_frame {
  width: 60%;
  position: absolute;
  z-index: 2;
  top: -25%;
  left: 15%;

  /* border: 2px dashed black; */
}

#my_timer_frame {
  position: absolute;
  bottom: 0.5%;

  width: 60%;
  height: 10%;
}
</style>
