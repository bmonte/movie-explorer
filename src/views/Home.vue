<template>
  <div class="home">
    <movie-list 
      :lista="movies"
    />

    <v-pagination
      v-model="page"
      class="my-4"
      :length="movies.total_pages"
      :total-visible="7"
      @input="nextPage()"
    ></v-pagination>
  </div>
</template>

<script>
import MovieAPI from '../services/MovieAPI.js'
import MovieList from '../components/MovieList.vue'

export default {
  components: {
    MovieList
  },

  data:() => ({
    page: 1,
    order_by: 'popular',
    movies: [],
  }),

  mounted() {
    this.nextPage()
  },

  methods: {
    nextPage: function() {
      MovieAPI.fetchMovieCollection(this.order_by, this.page)      
        .then(response => {
          this.movies = response
        })
      this.$router.replace({ name: "Home", query: { page: this.page } })
    }
  }
}
</script>