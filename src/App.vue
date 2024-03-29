<script>
import GameState from './components/GameState.vue';
import Enemies from './components/Enemies.vue';
import Levels from './components/Levels.vue';
import Combos from './components/Combos.vue';
import Rounds from './components/Rounds.vue';

export default {
  name: "App",
  data(){
    return {
      enemy: null
    }
  },
  components: {
    Rounds
    
  },
  methods: {
    
  }

}
</script>

<template>
  <div>

    <Rounds />

    <br>
    <br>

    

  </div>

</template>

<style scoped></style>
