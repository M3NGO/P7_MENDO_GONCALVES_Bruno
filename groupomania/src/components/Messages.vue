<template>

<v-card width="800" class="mb-10"><!-- carte contenant le Post + commentaires -->
      <v-img
        src="@/assets/Logo_Groupomania.png"
        max-height="1000"
      >
        <v-row
          align="end"
          class="fill-height"
        >
          <v-col
            align-self="end"
            class="pa-0 ms-5"
            cols="12"
          >
            <v-avatar
              class="profile"
              color="grey"
              size="164"
              rounded-pill
              border
            >
              <v-img small src="https://i.pravatar.cc/64"></v-img>
            </v-avatar>
          </v-col>
        </v-row>
          </v-img>
<v-divider></v-divider>
    <v-card-title>Ici le message du user Lambda!</v-card-title>

<v-divider></v-divider>

<v-card-actions class="d-flex justify-end">
    <v-card-actions>
    <v-btn plain text width="150" @click="reveal=true">
        <v-icon>mdi-comment-text</v-icon>Commenter
    </v-btn>
    </v-card-actions>


    <v-divider vertical></v-divider>
    <v-badge overlap bordered offset-x="30" offset-y="15" color="error" content="10">
        <v-btn plain width="100">
        <v-icon>mdi-thumb-up</v-icon>J'aime
        </v-btn>
    </v-badge>
    <v-divider vertical></v-divider>
    <v-badge overlap bordered offset-x="30" offset-y="15" color="error" content="8">
        <v-btn plain width="100">
        <v-icon>mdi-thumb-down</v-icon>J'aime pas
        </v-btn>
    </v-badge>
    <!-- Bloc réaction commentaire -->
</v-card-actions>
    <v-divider></v-divider>
            <v-expand-transition>
    <v-card-title v-if="reveal" class="transition-fast-in-fast-out v-card-text--reveal">
        <v-text-field dense label="Réagir" class="me-3" ></v-text-field>
        <v-btn color="error" height="40" class="me-4" small @click="reveal = false">
        <v-icon>mdi-send</v-icon>
        Publier
      </v-btn>
    </v-card-title>
    </v-expand-transition>
<v-divider></v-divider>
    <!-- FIN - Bloc réaction commentaire -->

<Commentaires/>

</v-card>

</template>

<script>
import Commentaires from '@/components/Commentaires.vue'

export default {
  name: 'Message',
  components:{
      Commentaires,
  },
  data: () => ({
 
  reveal: false, // reveal false pour faire apparaitre section écrire commentaire au dessus de timeline commentaires
  }),
}
</script>

<style>
.image{
    height: 10em;
    width: 10em;
}
.v-btn__content {
    display:flex;
    flex-direction:column;
}
.v-card-title--reveal {
bottom: 0;
opacity: 1 !important;
position: absolute;
width: 100%;
}


</style>
