<script>
export default {
  name: "World",
  data () {
    return {}
  }
}
</script>

<template>
  <div id="my_world">
    
    <img src="../assets/levels/level_1.png" alt="">
  </div>
</template>



<style lang="scss" scoped>

#my_world{
  color:black;
  height: 100%;
  width: auto;

  img {
    height: 100%;
    width: auto;
    object-fit: cover; 
  }
}
</style>