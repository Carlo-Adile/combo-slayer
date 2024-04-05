<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Rounds",
  emits: ['completedRound', 'completedLevel'],
  data() {
    return {
      currentEnemy: null,
      currentRound: 1,
      currentLevel: 1
    }
  },
  components: {
    
  },
  computed: {
    ...mapGetters(['getGameState']),
    ...mapGetters(['getScore'])
  },
  watch: {
    getGameState(newState) {
      if (newState === 'gameOver') {
        this.currentRound = 1;
        this.currentLevel = 1
      }
    }
  },
  methods: {
    completeLevel() {
      this.$emit('completedLevel'); 

      this.currentRound = 1;
      this.currentLevel++;

      this.$refs.levelCompletedSound.play()
    },
    completedRound(){
      this.$emit('completedRound');

      this.currentRound++;
      if (this.currentRound < 5) {
        this.$refs.roundCompletedSound.volume = 0.4;
        this.$refs.roundCompletedSound.play()
      }
      if (this.currentRound > 5) {
        this.completeLevel();
      }
    }
  }
}

</script>

<template>

  <div id="my_rounds">
    <p>Level {{ this.currentLevel }} | Round {{ this.currentRound }}</p>
  </div>

  <audio ref="levelCompletedSound" src="../assets/sound/levelup.mp3"></audio>
  <audio ref="roundCompletedSound" src="../assets/sound/roundup.mp3"></audio>
  
</template>

<style lang="scss" scoped>
@import '../assets/scss/font';
@import '../assets/scss/structure';

* {
  font-family: alagard;
  color: black;
}

/* nome combo, tasti da premere */
#my_rounds {
  height: 90%;
  width: 100%;

  p{
    font-size: 1.3rem;
    padding: 0;
    margin: 0;
  }


}

</style>
