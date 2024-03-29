<script>
import { ref } from 'vue';
import Enemies from './Enemies.vue';
import Combos from './Combos.vue';

export default {
  name: "Rounds",
  data() {
    return {
      currentEnemy: null,
      currentRound: 1
    }
  },
  components: {
    Enemies,
    Combos
  },
  methods: {
    /* handleChooseRandomEnemy(enemy) {
      this.enemy = enemy;
      console.log("il nemico che rounds usa è...", enemy);
    },
    handleCompletedCombo(damage) {
      this.enemy.health -= damage;
      console.log("rounds dice che il danno è...", damage)
      if (this.enemy.health <= 0){
        console.log("il nemico attuale scende a 0 punti ferita!");
        this.enemy = null;
        this.$refs.enemies.chooseRandomEnemy();
        this.currentRound++;
        console.log("adesso sei al round...", this.currentRound);
      } */
    handleCompletedCombo(damage) {
      console.log("rounds legge e cerca di passare questi danni: ", damage);
      //passa il danno da Combos a Enemies
      this.$refs.enemies.applyDamage(damage);
    },
    handleDefeatedEnemy() {
      console.log("riceviamo correttamente emit defeated enemy")
      this.currentRound++;
    }
  }
}


</script>

<template>
  <div>
    <h2>Current Round: {{ this.currentRound }}</h2>

    <Enemies ref="enemies" @defeatedEnemy="handleDefeatedEnemy" />
    <Combos ref="damage" @completedCombo="handleCompletedCombo" />
  </div>
</template>

<style lang="scss" scoped>
/* Stili CSS */
</style>
