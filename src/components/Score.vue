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
      this.resetScore();
    }
  }
}
</script>

<template>
  <div id="score_ribbon" class="mx-auto">
    <p>Score: {{ getScore.toFixed(0) }}</p>
    <div id="multiplier">
      {{ this.completedLevel.toFixed(2) }}x
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/structure.scss';
@import '../assets/scss/font';

*{
  font-family: alagard;
  color: black;
}

#score_ribbon {
  width: 280px;
  height: 150px;
  position: relative;

  /* background-image: url('../assets/UI/Ribbon_Red_Large_Complete.png'); */
  background-image: url('../assets/UI/Ribbon_Red_Large_1Ribbon.png');
  background-repeat: no-repeat;
  background-size: contain;

  p{
    text-align: start;
    font-size: 1.4rem;
    padding: 0.5rem 0 0 3rem;
  }

  #info_score{
    width: 120px;
    height: 75px;
    position: absolute;
    left: 25%;
    bottom: 10%;

    ul{
      list-style: none;
      padding: 0;
      text-align: start;

      li{
        line-height: 100%;
      }
    }
  }
}

#multiplier{
  font-size: 1.3rem;
  position: absolute;
  top: 35%;
  left: 25.5%;

}
</style>