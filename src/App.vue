<template>
  <v-app id="inspire">
    <TheNavbar></TheNavbar>
    <!--Conteudo-->
    <v-content>
      <router-view :key="this.$route.path"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import TheNavbar from './components/Navbar'

export default {
  components: {
    TheNavbar,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
  #inspire {
    background: none;
  }
</style>