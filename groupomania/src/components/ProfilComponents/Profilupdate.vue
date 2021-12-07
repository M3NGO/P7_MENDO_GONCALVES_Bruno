<template>
  <v-container fluid> <!-- Div Contenu Profil -->
    <v-card>
      <v-img height="100%" min-height="300" src="@/assets/Logo_Groupomania.png"><!-- haut de la carte profil update-->
        <v-row align="end" class="fill-height">
          <v-col align-self="start" class="pa-0" cols="12">
            <v-avatar class="profile" color="grey" size="20%" rounded tile>
              <v-img src="https://i.pravatar.cc/64">{{profile.upload_url}}</v-img>
            </v-avatar>
          </v-col>
          <v-col class="py-0">
            <v-list-item color="grey">
              <v-list-item-content>
                <v-list-item-title class="text-h6">{{profile.firstname}} {{profile.lastname}}</v-list-item-title>
                <v-list-item-subtitle>{{profile.poste}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img><!-- FIN - haut de la carte profil update-->
      
      <v-col class="d-flex flex-column mt-5 mb-5 me-5"><!-- colonne contenant les field update du profil + boutons -->  

        <v-text-field dense outlined disabled :label= profile.email></v-text-field>
        <v-text-field v-model="poste" dense outlined placeholder="Poste" :label= profile.poste></v-text-field>
        <v-text-field v-model="firstname" dense outlined placeholder="Prénom" :label= profile.firstname></v-text-field>
        <v-text-field v-model="lastname" dense outlined placeholder="Nom" :label= profile.lastname></v-text-field>
        
        <v-text-field v-model="password" dense outlined label="Mot de passe" clearable :append-outer-icon=" 'mdi-lock-reset' " @click:append-outer="updatePassword()"></v-text-field>
        
        <v-file-input dense outlined label="Update Avatar"></v-file-input>

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
    poste:'',
    firstname:'',
    lastname:'',
    password:'',
  }),

  methods:{
    updateUser(){
      this.$store.dispatch('getProfile/updateUser', {poste: this.poste, firstname: this.firstname, lastname: this.lastname, password: this.password}) //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    },
    updatePassword(){
      this.$store.dispatch('getProfile/updatePassword', {password: this.password}) //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    },
    toNotActiveUser(){
      let confirmation = confirm("Êtes-vous sûr(e) de vouloir supprimer votre compte Groupomania?")
      if(confirmation){
        this.$store.dispatch('getProfile/toNotActiveUser')
      }else{
        window.location.reload
      }
      
    }

  },


  computed: {
    ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
  },
    mounted(){ //monte profil a la creation de page
    this.$store.dispatch('getProfile/getProfile') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
  },
  //   updated(){//update profil a la mise a jour par le user de page
  //   this.$store.dispatch('getProfile/getProfile') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
  // },

}
</script>

<style>

</style>