<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h1 
        style="font-family: Lobster;" 
        class="child-flex align-self-center"
      >
        Actors
      </h1>

      <v-switch
        v-model="showAll"
        label="Show all"
        dense
      ></v-switch>
    </div>
    <!--Lista de atores-->
    <v-row>
      <v-col 
        class="d-flex"
        cols="6"
        sm="4"
        md="2"
        v-for="item in lista.cast.slice(0, this.showAll ? this.lista.cast.length : 6)" 
        :key="item.id" 
      >
        <v-card
          class="d-flex flex-wrap justify-center"
          tile
        >
          <v-img
            v-if="item.profile_path"
            :src="`https://image.tmdb.org/t/p/w500/${item.profile_path}`"
          />
          <!--Caso não exista poster uma imagem padrão é mostrada-->
          <v-img
            v-else
            src="https://imagens.liveoficial.com.br/app/img/product/500x750/not-found.jpg"
          />

          <v-card-title 
            class="body-2 text-center"
            style="word-break: break-word;"
          >
            {{item.name}}
          </v-card-title>

          <v-card-subtitle 
            class="caption text-center"
          >
            {{item.character}}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'actors-list',

  props: {
		lista: {
			type: Array,
			required: true
		} //Lista de atores
  },

  data: () => ({
    showAll: false,
  })
}
</script>