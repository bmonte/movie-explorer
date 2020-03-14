<template lang="pug">
  v-container
    div(class="d-flex justify-space-between")
      h1(class="child-flex align-self-center" style="font-family: Lobster;") Actors

      v-switch(v-model="showAll" label="Show all" dense)
    //Lista de atores
    v-row
      v-col(
        cols="6"
        sm="4"
        md="2"
        v-for="item in lista.cast.slice(0, this.showAll ? this.lista.cast.length : 6)"
        :key="item.id")
        
        v-card(class="d-flex flex-wrap justify-center" tile)
          v-img(
            v-if="item.profile_path"
            :src="`https://image.tmdb.org/t/p/w500/${item.profile_path}`")
          
          //Caso não exista poster uma imagem padrão é mostrada
          v-img(
            v-else
            src="https://imagens.liveoficial.com.br/app/img/product/500x750/not-found.jpg")

          v-card-title.actor_name {{item.name}}

          v-card-subtitle(class="caption text-center") {{item.character}}
</template>

<script>
export default {
  name: "actors-list",

  props: {
    lista: {
      type: Array,
      required: true
    } //Lista de atores
  },

  data: () => ({
    showAll: false
  })
};
</script>

<style scoped>
.actor_name {
  word-break: break-word;
  font-size: 13px;
  line-height: 110%;
  text-align: center;
}
</style>