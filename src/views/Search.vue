<template lang="pug">
  .search_page
    div(v-if="movies.results.length")
      movie-list(:lista="movies")
      v-pagination(
        v-model="page"
        class="my-4"
        :length="movies.total_pages"
        :total-visible="7"
        @input="nextPage()")
    <!-- Se não tiver nenhum resultado-->
    div(class="text-center mt-4")
      h1 Nenhum filme encontrado!
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
    movies: []
  }),

  watch: {
    "$route.query.q": function() {
      this.nextPage();
    }
  },

  mounted() {
    this.nextPage();
  },

  methods: {
    nextPage: function() {
      MovieAPI.searchMovies(this.$route.query.q, this.page).then(response => {
        this.movies = response;
      });
    }
  }
};
</script>

<style scoped>
.titulo {
  display: inline-block;
  word-break: break-word;
  font-weight: 500;
  font-size: 13px;
  line-height: 120%;
}
</style>
