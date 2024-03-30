<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Score",
  data(){
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

    updateRound(){
      this.completedRound++;
      const addScore = 5;
      this.updateScore(addScore);

    },
    updateEnemy(){
      this.defeatedEnemy++;
    },
    updateCombo(){
      this.completedCombo++;
      const addScore = 5;
      this.updateScore(addScore)
    },
    updateLevel(){
      this.completedLevel++;
      const addScore = 50;
      this.updateScore(addScore);
    },
    updateNewGame(){
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
  <div>
    <h3>Current score: {{ getScore }}</h3>
  </div>
</template>

<style lang="scss" scoped></style>