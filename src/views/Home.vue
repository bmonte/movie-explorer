<template lang="pug">
  div.home
    movie-list(:lista="movies")

    v-pagination.my-4(
      v-model="page"
      :length="movies.total_pages"
      :total-visible="7"
      @input="nextPage()")
      
</template>

<script>
import MovieAPI from "../services/MovieAPI.js";
import MovieList from "../components/MovieList.vue";

export default {
  components: {
    MovieList
  },

  data: () => ({
    page: 1,
    order_by: "popular",
    movies: []
  }),

  mounted() {
    this.nextPage();
  },

  methods: {
    nextPage: function() {
      MovieAPI.fetchMovieCollection(this.order_by, this.page).then(response => {
        this.movies = response;
      });
      this.$router.replace({ name: "Home", query: { page: this.page } });
    }
  }
};
</script>