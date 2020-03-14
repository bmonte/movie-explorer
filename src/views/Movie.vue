<template lang="pug">
  .single_movie(:style="{ 'background-image': 'url(' + base_url + image_path + ')' }")
    v-container.fluid
      v-row.no-gutters
        //Página do filme
        v-col(cols="12" sm="10" xl="8" offset-sm="1" offset-xl="2")
          v-card.card_color(flat tile)
            v-row.no-gutters
              //Capa do filme
              v-col(cols="12" md="3")
                v-img(:src="base_url + movie.poster_path")
              //Detalhes do filme
              v-col(cols="12" sm="9") 
                v-card-title.movie_title {{movie.title}}
                v-card-text.movie_description {{movie.overview}}
                v-card-actions.pl-4
                  span(class="grey--text text--lighten-2 caption mr-2") ({{rating.text}})
                  v-rating(
                    v-model="rating.value"
                    background-color="white"
                    color="amber"
                    half-increments
                    readonly)
                
                v-chip.movie_genres(v-for="item in movie.genres" :key="item.id" label) {{item.name}}
        //Informações
        v-col(cols="12" sm="10" xl="8" offset-sm="1" offset-xl="2")
          div(class="d-flex justify-space-around pt-4 black white--text")
            //Tempo do filme
            p
              v-icon(color="white") mdi-clock-outline
              span(class="hidden-sm-and-down pl-1") Runtime: 
              span.pl-1 {{movie.runtime | formatTime}}
            //Orçamento do filme
            p
              v-icon(color="white") mdi-cash-usd-outline
              span(class="hidden-sm-and-down pl-1") Budget:
              span.pl-1 {{movie.budget | formatPrice}}
            //Data de estreia
            p
              v-icon(color="white") mdi-calendar-check
              span(class="hidden-sm-and-down pl-1") Release Date:
              span.pl-1 {{movie.release_date}}
        //Atores
        v-col(cols="12" sm="10" xl="8" offset-sm="1" offset-xl="2")
          v-card.tile
            actors-list(:lista="credits")
        //Imagens
        v-col(cols="12" sm="10" xl="8" offset-sm="1" offset-xl="2" v-if="images.backdrops.length")
          v-card(class="card_color pa-4" tile)
            v-carousel(hide-delimiters :height="imageHeight")
              v-carousel-item(
                v-for="image in images.backdrops"
                :key="image.id"
                :src="base_url + image.file_path")
        //Filmes recomendados
        v-col(
          cols="12"
          sm="10"
          xl="8"
          offset-sm="1"
          offset-xl="2"
          v-if="recommendations.results.length")
          
          v-card.tile
            movie-list(title="Recommendations" :lista="recommendations")
</template>

<script>
import ActorsList from "../components/ActorsList.vue";
import MovieList from "../components/MovieList.vue";
import MovieAPI from "../services/MovieAPI.js";

export default {
  components: {
    ActorsList,
    MovieList
  },

  data() {
    return {
      //Movie ID
      id: this.$route.params.movie_id,
      //Movie Rating
      rating: {
        value: '',
        text: '',
      },
      //Movie components
      movie: [],
      credits: [],
      images: [],
      recommendations: [],
      //Background settings
      base_url: "https://image.tmdb.org/t/p/original/",
      image_path: ""
    };
  },

  computed: {
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "300px";
        case "sm":
          return "350px";
        default:
          return "auto";
      }
    }
  },

  mounted() {
    MovieAPI.fetchSingleMovie(this.id).then(response => {
      this.movie = response;
      this.image_path = response.backdrop_path;
      this.roundHalf(response.vote_average, this.rating)
    });

    MovieAPI.fetchMovieCredits(this.id).then(response => {
      this.credits = response;
    });

    MovieAPI.fetchMovieImages(this.id).then(response => {
      this.images = response;
    });

    MovieAPI.fetchMovieRecommendations(this.id).then(response => {
      this.recommendations = response;
    });
  },

  filters: {
    formatTime: function(runtime) {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;

      return hours + "h" + minutes + "m";
    },

    formatPrice: function(value) {
      const val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },

  methods: {
    roundHalf: function(num, rating)  {
      rating.text = num;
      rating.value = Math.floor(num) / 2;
    }
  }
};
</script>


<style scoped>
.single_movie {
  /* Full height */
  height: 100%;
  /* Center and scale the image */
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.card_color {
  background-color: rgba(0, 0, 0, 0.7) !important;
  border-color: rgba(255, 255, 255, 0) !important;
}

.movie_title {
  color: gold;
}

.movie_description {
  color: white;
}

.movie_genres {
  background-color: gold !important;
  margin-left: 16px;
  margin-top: 8px;
}
</style>