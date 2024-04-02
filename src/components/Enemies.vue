<script>
import { enemies } from '../enemies.js';
import { mapGetters } from 'vuex';

export default {
  name: "Enemies",
  emits: ['chooseRandomEnemy', 'defeatedEnemy'],
  data() {
    return {
      currentEnemy: null,
      // Array originale dei nemici
      originalEnemies: []
    }
  },
  computed: {
    ...mapGetters(['getGameState'])
  },
  methods: {
    chooseRandomEnemy() {
      console.log("Generazione nemico in corso...");
      const randomIndex = Math.floor(Math.random() * this.originalEnemies.length);
      this.currentEnemy = this.originalEnemies[randomIndex];
      this.$emit('chooseRandomEnemy', this.currentEnemy);
    },
    applyDamage(damage) {
      this.currentEnemy.health -= damage;
      if (this.currentEnemy.health <= 0) {
        this.defeatEnemy();
      }
    },
    defeatEnemy() {
      this.$emit('defeatedEnemy');
      // Reimposta la vita del nemico corrente alla vita massima
      this.currentEnemy.health = this.currentEnemy.maxHealth;
      // Genera un nuovo nemico casuale
      this.chooseRandomEnemy();
    }
  },
  mounted() {
    // Copia profonda degli enemy in originalEnemies
    this.originalEnemies = enemies.map(enemy => ({ ...enemy }));
    // Seleziona un nemico casuale all'avvio
    this.chooseRandomEnemy();
  }
}
</script>

<template>
  <div id="enemy_frame" v-if="currentEnemy">
    <div id="name_frame">
      <p> {{ currentEnemy.name }} </p>
    </div>
    <div id="health_frame">
      <p> {{ currentEnemy.health }}/{{ currentEnemy.maxHealth }}     Health</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/structure.scss';
@import '../assets/scss/font';

*{
  color: black;
  font-family: alagard;
}

#enemy_frame{
  width: 400px;
  height: 125px;
  margin: 0 auto;
  p{
    margin: 0;
  }
}

#name_frame{
  font-size: 1.8rem;
  
}

#health_frame{
  font-size: 1.4rem;
}

</style>
