<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Score",
  data() {
    return {
      completedLevel: 0,
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
  methods: {
    ...mapActions(['updateScore']),
    ...mapActions(['resetScore']),

    updateRound() {
      this.completedRound++;
      const addScore = 5;
      this.updateScore(addScore);

    },
    updateEnemy() {
      this.defeatedEnemy++;
    },
    updateCombo() {
      this.completedCombo++;
      const addScore = 5;
      this.updateScore(addScore)
    },
    updateLevel() {
      this.completedLevel++;
      const addScore = 50;
      this.updateScore(addScore);
    },
    updateNewGame() {
      console.log("reset punteggio di...", this.getScore)
      this.completedLevel = 0;
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
    <p>Score: {{ getScore }}</p>
    <div id="info_score">
      <ul>
        <li>level: {{ this.completedLevel }}</li>
        <li>round: {{ this.completedRound }}</li>
        <li>combo: {{ this.completedCombo }}</li>
        <li>enemy: {{ this.defeatedEnemy }}</li>
      </ul>
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

  background-image: url('../assets/UI/Ribbon_Red_Large_Complete.png');
  background-repeat: no-repeat;
  background-size: contain;

  p{
    text-align: start;
    font-size: 1.4rem;
    padding: 0.3rem 0 0 4rem;
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
</style>