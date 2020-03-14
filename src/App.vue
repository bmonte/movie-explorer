<template lang="pug">
  v-app#inspire
    //Navbar
    TheNavbar
    //Conteudo
    v-content
      router-view(:key="this.$route.path")
    //Footer
    footer(class="text-center white--text black")
      div © {{new Date().getFullYear()}}, made with
          v-icon(class="red--text px-1" small) mdi-heart-multiple
          a.white--text(href="https://github.com/bmonte" target="_blank") bmonte
</template>

<script>
import TheNavbar from "./components/Navbar";

export default {
  components: {
    TheNavbar
  },

  data: () => ({
    //
  })
};
</script>

<style scoped>
#inspire {
  background: none;
}
</style>