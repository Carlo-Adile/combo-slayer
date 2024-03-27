<!-- set active enemy -->
<script>
  import { enemies } from '../enemies.js';

  export default {
    name: "Enemies",
    props: {
      activeEnemy: Object
    },
    data(){
      return{
        currentEnemy: null
      }
    },
    methods: {
      chooseRandomEnemy(){
        const randomIndex = Math.floor(Math.random() * enemies.length);
        this.currentEnemy = enemies[randomIndex];
        this.$emit('chooseRandomEnemy', this.currentEnemy)
      },
      completeRound(){
        this.$emit('chooseRandomEnemy');
      }
    },
    mounted(){
      this.chooseRandomEnemy();
    }
  }
</script>

<template>
  <div v-if="currentEnemy">
    <h2>Active Enemy: {{ currentEnemy.name }}</h2>
    <h3>Health: {{ currentEnemy.health }}</h3>
  </div>
</template>


<style>

</style>