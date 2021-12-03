<template>
 <v-container fluid>
  <v-card class="d-flex-column" >
    <v-form class="d-flex justify-center monPost"  no-gutters ref="monNewPost">
      <v-list-item-avatar class="ms-4"> <!-- Avatar du user connecté-->
        <v-img src="https://i.pravatar.cc/64" alt="avatar user"/>
      </v-list-item-avatar><!-- FIN - Avatar du user connecté-->
       
      <v-col>
        <v-text-field label="Quoi de neuf aujourd'hui?" :rules="rules" hide-details="auto" clearable v-model="content"></v-text-field> 
        <v-file-input label="Upload Photo/Vidéo" v-model="upload"></v-file-input>
      </v-col>
      <div class="d-flex align-end justify-center mb-4" no-gutters>
        <v-btn color="error"  height="40" text x-small v-on:click="publier(profile.email)">
          <v-icon>mdi-send</v-icon>
            Publier
        </v-btn>
      </div>
    </v-form><!-- FIN - section création Post (message + upload multimedia) -->
    
    </v-card>
 </v-container>

</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Newposts',

  data: () => ({
    content:'',
    upload:[],
    rules: [
      value => (value && value.length >= 10 ) || 'Votre post doit faire au moins 10 caractères',
    ],
}),//FIN - Data
computed:{
  ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
},
    methods: {
      publier(email){
        this.$store.dispatch('getPosts/createPosts', {content: this.content, email:email, upload: this.upload}) //('nom module dans index.js/nom action liée'), payload
        this.$refs.monNewPost.reset(); // reset le formulaire un fois envoyé le post
        
      },
 
    }, //FIN methods
  //     computed: {
  //   ...mapState('getAllPosts', ['allPosts']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    
  // },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>