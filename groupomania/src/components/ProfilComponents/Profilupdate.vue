<template>
  <v-container fluid> <!-- Div Contenu Profil -->
    <v-card>
      <!-- haut de la carte profil update contenu avatar + groupomania photo background + nom/prénom et poste-->
      <v-img height="100%" min-height="200" max-height="400" src="@/assets/Logo_Groupomania.png">
        <v-row align="end" class="fill-height">
          <v-col align-self="start" class="pa-0" cols="12" >
            <!-- photo avatar uploadée par user-->
            <v-avatar  color="grey" size="15vh" max-height="15vh" rounded tile v-if="profile.upload_url != null">
              <v-img small v-bind:src="'http://localhost:3000/' + profile.upload_url"></v-img>
            </v-avatar>
            <!-- si pas d'avatar uploadé par user alors icone -->
            <v-avatar  color="grey" size="15vh" max-height="15vh" rounded tile v-if="profile.upload_url == null" >
              <v-icon size="5vh" color="white" v-if="profile.upload_url == null">mdi-account-circle</v-icon>
            </v-avatar>
          </v-col>
          <v-col class="py-0 mt-5">
            <v-list-item color="grey">
              <v-list-item-content>
                <v-list-item-title class="text-h6">{{profile.firstname}} {{profile.lastname}}</v-list-item-title>
                <v-list-item-subtitle>{{profile.poste}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img>
      <!-- FIN - haut de la carte profil update contenu avatar + groupomania photo background + nom/prénom et poste-->
      
      <v-col class="d-flex flex-column mt-5 mb-5 me-5"><!-- colonne contenant les field update du profil + boutons -->  

        <v-text-field dense outlined disabled :label= profile.email></v-text-field>
        <v-text-field v-model="poste" dense outlined placeholder="Poste" :label= profile.poste></v-text-field>
        <v-text-field v-model="firstname" dense outlined placeholder="Prénom" :label= profile.firstname></v-text-field>
        <v-text-field v-model="lastname" dense outlined placeholder="Nom" :label= profile.lastname></v-text-field>
        
        <v-text-field v-model="password" dense outlined label="Mot de passe" clearable :append-outer-icon=" 'mdi-lock-reset' " @click:append-outer="updatePassword()"></v-text-field>
        
        <v-file-input v-model="upload" dense outlined label="Update Avatar" clearable :append-outer-icon=" 'mdi-image-remove' " @click:append-outer="deleteAvatar(profile.upload_url)"></v-file-input>

        <v-btn  text color="error" v-on:click="updateUser()">Mettre à jour</v-btn>

      </v-col><!-- FIN - colonne contenant les field update du profil + boutons -->  

      <v-row class="d-flex justify-end me-1 mb-1"><!--  BOUTON SUPPRIMER COMPTE -->
        <v-btn  text color="primary" v-on:click="toNotActiveUser()">Supprimer compte</v-btn>
      </v-row><!--  BOUTON SUPPRIMER COMPTE -->
      
    </v-card>
  </v-container><!-- Div Contenu Profil -->
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProfilUpdate',
  data: () => ({
    poste:'',//Déclaration field poste vide
    firstname:'',//Déclaration field Prénom vide
    lastname:'',//Déclaration field Nom de famille vide
    password:'',//Déclaration field mot de passe vide
    upload: [],//Déclaration avatar vide
  }),//FIN - data

  methods:{
    async updateUser(){
      await this.$store.dispatch('getProfile/updateUser', {poste: this.poste, firstname: this.firstname, lastname: this.lastname, password: this.password, upload: this.upload}) //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
      //remise des valeurs a zéro du formulaire
      this.poste='',this.firstname='',this.lastname='', this.password='',this.upload=[]
    },//FIN- UPDATEUSER

    async updatePassword(){
      await this.$store.dispatch('getProfile/updatePassword', {password: this.password}) //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    },//FIN - UPDATE PASSWORD

    async deleteAvatar(avatar){
        let confirmation = confirm("Êtes-vous sûr(e) de vouloir supprimer votre avatar ?")
        document.location.reload
          if(!avatar && confirmation){
            alert("Vous n'avez pas d'avatar a supprimer")
          }else if(confirmation){
            await this.$store.dispatch('getProfile/deleteAvatar',{upload_url:avatar})
            await this.$store.dispatch('getProfile/getProfile')
          }else{
            window.location.reload
          }
    },//FIN DELETEAVATAR

    async toNotActiveUser(){
        let confirmation = confirm("Êtes-vous sûr(e) de vouloir supprimer votre compte Groupomania?")
        if(confirmation){
          this.$store.dispatch('getProfile/toNotActiveUser')
        }else{
          window.location.reload
        }
        
    }//FIN - toneNotActiveUser

    },//FIN methods

    computed: {
      ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    },//FIN - computed
    
    async mounted(){ //monte profil a la creation de page
      await this.$store.dispatch('getProfile/getProfile') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    },//FIN mounted

}//FIN EXPORT DEFAULT
</script>

<style>

</style>