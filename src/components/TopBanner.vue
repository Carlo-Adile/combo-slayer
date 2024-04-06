<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "TopBanner",
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<template>
  <div id="top_banner">
    <div class="container-fluid">
      <div class="row w-100 mx-auto">
        <div class="col w-100" >
          <h2>Combo Slayer</h2>
        </div>

      </div>
    </div>

  </div>

</template>

<style lang="scss" scoped>
@import '../assets/scss/font';
@import '../assets/scss/structure';

* {
  font-family: alagard;
}

#top_banner {
  width: 100%;
}


</style>