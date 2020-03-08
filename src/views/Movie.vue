<template>
  <div 
    class="single_movie"
    :style="{ 'background-image': 'url(' + base_url + image_path + ')' }"
  >
    <v-container fluid>
      <v-row no-gutters>
        <!--Informações do filme-->
        <v-col
          cols="12"
          sm="10"
          xl="8"
          offset-sm="1"
          offset-xl="2"
        >
          <v-card 
            class="card_color"
            flat tile
          >
            <v-row no-gutters>
              <!--Capa do filme-->
              <v-col 
                cols="12"
                md="3"
              >
                <v-img :src="base_url + movie.poster_path" />
              </v-col>
              <!--Detalhes do filme-->
              <v-col 
                cols="12"
                sm="9"
                class="d-flex flex-wrap align-center"
              >
                <v-card-title 
                  class="movie_title"
                >
                  {{movie.title}}
                </v-card-title>

                <v-card-text 
                  class="movie_description"
                >
                  {{movie.overview}}
                </v-card-text>

                <v-progress-linear
                  class="ml-4 hidden-sm-and-down"
                  color="amber"
                  buffer-value="10"
                  height="15"
                  :value="movie.vote_average"
                ></v-progress-linear>

                <v-chip
                  class="movie_genres"
                  v-for="item in movie.genres"
                  :key="item.id"
                >
                  {{item.name}}
                </v-chip>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <!--Informações-->
        <v-col 
          cols="12"
          sm="10"
          xl="8"
          offset-sm="1"
          offset-xl="2"
        >
          <div class="d-flex justify-space-around pt-4 black white--text">
            <!--Tempo do filme-->
            <p>
              <v-icon color="white">mdi-clock-outline</v-icon> 
              <span class="hidden-sm-and-down pl-1">Runtime:</span> {{movie.runtime | formatTime}}
            </p>
            <!--Orçamento do filme-->
            <p>
              <v-icon color="white">mdi-cash-usd-outline</v-icon> 
              <span class="hidden-sm-and-down pl-1">Budget:</span> {{movie.budget | formatPrice}}
            </p>
            <!--Data de estreia-->
            <p>
              <v-icon color="white">mdi-calendar-check</v-icon>
              <span class="hidden-sm-and-down pl-1 ">Release Date:</span> {{movie.release_date}}
            </p>
          </div>
        </v-col>
        <!--Atores-->
        <v-col
          cols="12"
          sm="10"
          xl="8"
          offset-sm="1"
          offset-xl="2"
        >
          <v-card tile>
            <actors-list
              :lista="credits"
            />
          </v-card>
        </v-col>
        <!--Imagens-->
        <v-col
          cols="12"
          sm="10"
          xl="8"
          offset-sm="1"
          offset-xl="2"
          v-if="images.backdrops.length"
        >
          <v-card 
            class="card_color pa-4"
            tile  
          >
            <v-carousel 
              hide-delimiters
              :height="imageHeight"
            >
              <v-carousel-item
                v-for="image in images.backdrops"
                :key="image.id"
                :src="base_url + image.file_path"
              ></v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <!--Filmes recomendados-->
        <v-col
          cols="12"
          sm="10"
          xl="8"
          offset-sm="1"
          offset-xl="2"
          v-if="recommendations.results.length"
        >
          <v-card tile>
            <movie-list
              title="Recommendations"
              :lista="recommendations"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ActorsList from '../components/ActorsList.vue'
import MovieList from '../components/MovieList.vue'
import MovieAPI from '../services/MovieAPI.js'

export default {
  components: {
    ActorsList,
    MovieList
  },

  data () {
    return {
      //Movie ID
      id: this.$route.params.movie_id,
      //Movie components
      movie: [],
      credits: [],
      images: [],
      recommendations: [],
      //Background settings
      base_url: 'https://image.tmdb.org/t/p/original/',
      image_path: ''
    }
  },

  computed: {
    imageHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs' : return '300px'
        case 'sm' : return '350px'
        default : return 'auto'
      }
    }
  },
  
  mounted(){
    MovieAPI.fetchSingleMovie(this.id)      
      .then(response => {
        this.movie = response
        this.image_path = response.backdrop_path
      })

    MovieAPI.fetchMovieCredits(this.id)      
      .then(response => {
        this.credits = response
      })

    MovieAPI.fetchMovieImages(this.id)      
      .then(response => {
        this.images = response
      })

    MovieAPI.fetchMovieRecommendations(this.id)
      .then(response => {
        this.recommendations = response
      })
  },

  filters: {
    formatTime: function(runtime) {
      const hours = Math.floor(runtime/60);
      const minutes = runtime % 60;

      return hours + 'h' + minutes + 'm';
    },

    formatPrice: function(value) {
        const val = (value / 1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  }
}
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
    margin-left: 12px;
    margin-bottom: 12px;
  }
</style>