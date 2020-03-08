<template>
  <div>
    <h1 
      v-if="title"
      style="font-family: Lobster;" 
      class="text-center pt-4"
    >
      {{title}}
    </h1>

    <v-row>
      <v-col 
        cols="10" 
        offset="1"
      >
        <v-row>
          <v-col 
            cols="6"
            sm="4"
            md="3"
            xl="2"
            v-for="item in lista.results" 
            :key="item.id" 
          >
            <v-card
              class="d-flex flex-wrap justify-center"
              color="black"
            >
              <v-img
                v-if="item.poster_path"
                :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`"
                @click="singleMedia(item.id)"
              />

              <!--Caso não exista poster uma imagem padrão é mostrada-->
              <v-img
                v-else
                src="https://imagens.liveoficial.com.br/app/img/product/500x750/not-found.jpg"
              />

              <v-card-title 
                class="titulo"
                
              >
                {{item.title}}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
	name: 'media-list',

	props: {
    title: String,
		lista: {
			type: Array,
			required: true
		}, //Lista de filmes/séries 
	},
	
	data: () => ({
		//
  }),

	methods: {
	singleMedia: function(id){
		this.$router.push({ name: "Movie", params: { movie_id: id } })
		this.$route.params.pathMatch
	},
	}
}
</script>

<style scoped>
	.titulo {
	word-break: break-word;
	color: white;
	font-weight: 500;
	font-size: 13px;
	line-height: 110%;
	}
</style>