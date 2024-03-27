<script >
import GameState from './components/GameState.vue';
import Enemies from './components/Enemies.vue';
import Levels from './components/Levels.vue';
import Combos from './components/Combos.vue'

export default {
  name: "App",
  components: {
    Levels,
    Enemies,
    Combos
  }
}
</script>

<template>
  <div>

    <Levels />

    <br>
    <br>

    <Enemies />

    <br>
    <br>

    <Combos />

  </div>
  
</template>

<style scoped>

</style>
