<template>
 <v-container fluid class="mb-10"  >
  <v-card class="d-flex-column" >
    <v-form  v-model="valid" lazy-validation class="d-flex justify-center monPost"  no-gutters ref="monNewPost">
      <v-list-item-avatar class="ms-4" color="grey" > <!-- Avatar du user connecté-->
        <v-img small v-bind:src="'http://localhost:3000/' + profile.upload_url" v-if="profile.upload_url != null"></v-img>
        <v-icon center color="white" v-if="profile.upload_url == null">mdi-account-circle</v-icon>
      </v-list-item-avatar><!-- FIN - Avatar du user connecté-->
       <v-row >
      <v-col>
        <v-text-field label="Quoi de neuf aujourd'hui?" hide-details :rules="rulesContent" clearable v-model="content"></v-text-field> 
        <v-file-input label="Upload Photo/Vidéo" v-model="upload"></v-file-input>
      </v-col>
       </v-row>
      <div class="d-flex align-end justify-center mb-4" no-gutters>
        <v-btn :disabled="!valid" :enabled="upload" color="error"  text x-small v-on:click="publier(profile.email)">
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
    valid: false,//déclaration valid a false pour disable bouton
    content:[], //déclaration content du message a vide
    upload:[],//déclaration upload a vide
    //règle de comptage longueur contenu :
    rulesContent: [ 
      v => ( v && v.length >=10)  || 'Votre post doit faire au maximum 200 caractères',
    ],
  }),//FIN - Data
  computed:{
    ...mapState('getPosts', ['allPosts']),
    ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
  },//FIN - computed

  methods: {
    async publier(email){
      await this.$store.dispatch('getPosts/createPosts', {content: this.content, email:email, upload: this.upload}) //('nom module dans index.js/nom action liée'), payload
      await this.$store.dispatch('getPosts/getAllPostsAct')
      await this.$refs.monNewPost.reset(); // reset le formulaire un fois envoyé le post
    },//FIN - publier
 
  }, //FIN methods
 
}//FIN - EXPORT DEFAULT
</script>

<style>

</style>