<script>
import { ref } from 'vue';
import Enemies from './Enemies.vue';
import Combos from './Combos.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Rounds",
  data() {
    return {
      currentEnemy: null,
      currentRound: 1,
      currentLevel: 1
    }
  },
  components: {
    Enemies,
    Combos
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
    handleCompletedCombo(damage) {
      //passa il danno da Combos a Enemies
      this.$refs.enemies.applyDamage(damage);
      this.completedCombo++;

      this.$emit('completedCombo');
    },
    handleDefeatedEnemy() {
      this.$emit('defeatedEnemy')
      this.currentRound++;
      if (this.currentRound > 5) {
        this.completeLevel();
      }

      this.$emit('completedRound');
    },
    completeLevel() {
      console.log("hai completato un livello intero!")
      this.currentRound = 1;
      this.currentLevel++;
      this.$emit('completeLevel');
    }
  }
}

</script>

<template>
  <div>
    <h1>Current Level: {{ this.currentLevel }}</h1>
    <h2>Current Round: {{ this.currentRound }}</h2>
    <br>
    <Enemies ref="enemies" @defeatedEnemy="handleDefeatedEnemy" />
    <br>
    <Combos ref="damage" @completedCombo="handleCompletedCombo" />
  </div>
</template>

<style lang="scss" scoped>
/* Stili CSS */
</style>
