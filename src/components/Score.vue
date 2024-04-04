<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Score",
  data() {
    return {
      completedLevel: 1.01,
      completedRound: 0,
      completedCombo: 0,
      defeatedEnemy: 0
    }
  },
  components: {

  },
  computed: {
    ...mapGetters(['getScore']),
    ...mapGetters(['getGameState'])
  },
  watch: {
    getGameState(newValue) {
      if (newValue === 'gameOver') {
        this.updateNewGame();
      }
    }
  },
  methods: {
    ...mapActions(['updateScore']),
    ...mapActions(['resetScore']),

    updateRound() {
      this.completedRound++;
      const addScore = 25 * this.completedLevel;
      this.updateScore(addScore);
    },
    updateEnemy() {
      this.defeatedEnemy++;
    },
    updateCombo() {
      this.completedCombo++;
      const addScore = 10 * this.completedLevel;
      this.updateScore(addScore)
      this.completedLevel *= 1.02;
    },
    updateLevel() {
      const addScore = 100;
      this.updateScore(addScore);
      this.completedLevel *= 1.1;
    },
    updateNewGame() {
      console.log("reset punteggio di...", this.getScore.toFixed(0))
      this.completedLevel = 1.01;
      this.completedCombo = 0;
      this.completedRound = 0;
      this.defeatedEnemy = 0;

      /* store js */
      this.resetScore();
    }
  }
}
</script>

<template>
  <div id="my_score">
    <span>Score: {{ getScore.toFixed(0) }}</span> | <span>Multiplier: {{ this.completedLevel.toFixed(2) }} x</span>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/structure.scss';
@import '../assets/scss/font';

* {
  font-family: alagard;
  color: black;
  font-size: 1.25rem;
}

/* #my_score {
  
} */

</style>