<template>
  <v-app-bar
    app
    dark
  >
    <v-toolbar-title
      @click="homePage()"
    >
      <v-icon x-large>
        mdi-movie
      </v-icon>

      <span class="navbar_title hidden-sm-and-down">
        MovieExplorer
      </span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="mt-5 mr-4">
      <v-text-field
        v-model="search"
        label="Search"
        append-icon="mdi-magnify"
        @change="searchMovie(search)"
      ></v-text-field>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    search: '',
  }),

	methods: {
    searchMovie: function(query) {
      if (query) {
       this.$router.push({ name: "Search", query: { q: query } }) 
       this.search = ''
      }
    },

    homePage: function() {
      this.$router.push({ name: "Home", query: { page: 1 } })
    }
	}
}
</script>

<style scoped>
  .navbar_title {
    font-family: Lobster;
    color: white;
    margin-left: 4px;
    cursor: pointer;
  }
</style>