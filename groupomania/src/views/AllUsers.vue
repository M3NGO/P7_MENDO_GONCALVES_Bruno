<template>
    <v-main>
        <v-container>
            <v-card-title>Liste de tous les utilisateurs</v-card-title>
            
            <v-card class="mx-auto mb-5" max-width="400" v-for="user in allActiveUsers" :key="user.id">
            <v-card-title>
            
                <v-list-item class="grow">
                    <v-btn icon class="rounded-xl" link :to="{path:'/profil'}"><!-- click sur icone avatar et go to profil user -->
                        <v-avatar color="grey" class="me-5" v-if="user.upload_url != null">
                            <v-img small v-bind:src="'http://localhost:3000/' + user.upload_url" ></v-img>
                        </v-avatar>
                    
                        <v-avatar color="grey" class="me-5" v-if="user.upload_url == null">
                            <v-icon center color="white" >mdi-account-circle</v-icon>
                        </v-avatar>
                    </v-btn>
                <v-list-item-title class="text-wrap">{{user.email}} 
                    <v-list-item-subtitle class="text-wrap">{{user.firstname}} {{user.lastname}}</v-list-item-subtitle>
                    <v-list-item-subtitle class="text-wrap"> {{user.poste}}</v-list-item-subtitle>
                </v-list-item-title>
                </v-list-item>
            </v-card-title>
        
            <v-card-actions>
                <v-list-item class="grow">
                <v-row align="center" justify="end">

                    <v-btn icon class="rounded-xl" v-if="profile.role == 2"><!-- Lock user doit apparaitre que dans Liste tous les utilisateurs et uniquement pour moderateurs -->
                        <v-icon class="mr-1" v-on:click="blockUser(user.uuid, profile.uuid, user.email)" color="error">mdi-lock</v-icon><!-- bouton moderation user pour les moderateurs uniquement -->
                    </v-btn>
                    <span class="mr-1" color="primary" v-if="profile.role == 2">·</span>

                    <v-icon class="mr-1" color="primary">mdi-email</v-icon>
                    <span class="subheading mr-2">256</span> <!-- Nombre de Posts faits par le user-->
                    
                    <span class="mr-1" color="primary">·</span>
                    <v-icon class="mr-1" color="primary">mdi-comment-text</v-icon>
                    <span class="subheading">45</span><!-- Nombre de Commentaires faits par le user-->
                </v-row>
                </v-list-item>
            </v-card-actions>
            </v-card>





        </v-container>
    </v-main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name:'AllUsers',
  components:{
    
  },



methods:{
      blockUser(user, moderator, email){
        let confirmation = confirm("Êtes-vous sûr(e) de vouloir bloquer l'utilisateur : "+email)
      if(confirmation){
       this.$store.dispatch('moderation/blockUser', {uuid:user, moderator:moderator, email:email})
      }else{
        window.location.reload
      }
        

      },
  
},
    computed: {
    ...mapState('getUsers', ['allActiveUsers']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])

  },

  mounted(){
    this.$store.dispatch('getUsers/getAllUsersAct') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    this.$store.dispatch('getProfile/getProfile') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    
  },  
  
//   updated(){
//     this.$store.dispatch('getUsers/getAllUsersAct') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
//   },

        
}
</script>