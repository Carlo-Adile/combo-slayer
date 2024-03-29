<script>
import { enemies } from '../enemies.js';

export default {
  name: "Enemies",
  data() {
    return {
      currentEnemy: null,
      // Array originale dei nemici
      originalEnemies: []
    }
  },
  methods: {
    chooseRandomEnemy() {
      console.log("Enemies sta producendo un nemico...");
      const randomIndex = Math.floor(Math.random() * this.originalEnemies.length);
      this.currentEnemy = this.originalEnemies[randomIndex];
      this.$emit('chooseRandomEnemy', this.currentEnemy);
    },
    applyDamage(damage) {
      console.log("Enemies legge damage traslato da Rounds: ", damage);
      this.currentEnemy.health -= damage;
      if (this.currentEnemy.health <= 0) {
        this.defeatEnemy();
      }
    },
    defeatEnemy() {
      console.log("defeatEnemy richiamata!");

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
  <div v-if="currentEnemy">
    <h2>Active Enemy: {{ currentEnemy.name }}</h2>
    <h3>Health: {{ currentEnemy.health }} / {{ currentEnemy.maxHealth }}</h3>
  </div>
</template>

<style></style>
