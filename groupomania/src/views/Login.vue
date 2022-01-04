<!-- Composant login Groupomania -->

<!-- HTML -->
<template>  
  <v-container  class="fill-height ">
    <v-card elevation="20" class="mx-auto rounded-xl"><!-- carte login -->
      <v-col cols="12" class="text-center">
        <img width="200" src="../assets/Logo_Groupomania.png" alt="logo Groupomania">
        <v-form ref="form" class="mb-5 me-5 ms-5"  lazy-validation><!-- Formulaire login -->
          <v-text-field class="mb-5" v-model="email" :rules="emailRules" label="E-mail"  hint="E-mail obligatoire" outlined dense clearable required hide-details></v-text-field>
          <v-text-field v-model="password"
            name="password"
            :rules="passwordRules"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            hint="Au moins 8 caractères"
            label="Password"
            required
            outlined
            dense
            hide-details
            clearable
            class="mb-5"
          ></v-text-field>
                       
                <!-- bouton pas encore inscrit qui déclanche au clic le dialog inscription -->
                <v-btn elevation="10" color="primary" dark class="mt-5 rounded-xl" @click.stop="dialog = true">
                  Pas encore inscrit(e)?
                </v-btn>
              
      
            <!--Dialog inscription sur bouton pas encore inscrit de la page login -->
            <v-dialog v-model="dialog"><!-- Dialog inscription -->

                  
              <v-card class="mx-auto rounded-xl" ><!-- Carte inscription dans le dialog -->
                <v-col class="text-center">
                  <img width="200" src="../assets/Logo_Groupomania.png" alt="logo Groupomania">
                </v-col>
                <v-card-title class="justify-center">Inscription</v-card-title>
                <v-card-text><!-- zone email + password inscription -->
                  <v-container>
                    <v-col>
                      <v-text-field v-model="email" :rules="emailRules" label="E-mail" outlined dense required hide-details class="mb-5"></v-text-field>
                        <v-text-field
                          v-model="password"
                          name="password"
                          :rules="passwordRules"
                          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show ? 'text' : 'password'"
                          @click:append="show = !show"
                          
                          hint="Au moins 8 caractères"
                          label="Password"
                          required
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                    </v-col>
                    <v-checkbox v-model="checkbox" :rules="checkboxRules" @click="checkbox = true" label="Avez-vous vérifié votre email?" required></v-checkbox>
                  </v-container>
                  
                </v-card-text><!-- FIN - zone email + password inscription -->

                <v-card-actions><!-- Boutons inscription -->
                <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text class="rounded-xl" @click="dialog = false">
                    Quitter
                  </v-btn>
                  <v-btn :disabled="!validReg" color="error darken-1" text class="rounded-xl" @click="dialog = false" v-on:click="Register()">
                    Valider
                  </v-btn>
                </v-card-actions>
              </v-card><!-- FIN - Carte inscription dans le dialog -->
            </v-dialog><!-- FIN - Dialog inscription -->

          <v-btn :disabled="!valid" color="error" class="mt-5 ms-5 rounded-xl" width="100" v-on:click="LogIn(), isLoading=true" v-if="isLoading==false" elevation="10">
              Entrer
          </v-btn>
          <v-btn v-if="isLoading==true" color="error" class="mt-5 ms-5 rounded-xl" width="100">
              <v-progress-circular indeterminate color="white"></v-progress-circular>
          </v-btn>
        </v-form><!-- FIN - Formulaire login -->
      </v-col>
    </v-card><!-- FIN - carte login -->
  </v-container>
</template>
<!-- HTML -->

<!-- JAVASCRIPT -->
<script>
import { mapState } from 'vuex'

export default {
  name: 'Login',
  
    data: () => ({
    //verif si email entré correspond a un email
    // valid: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail obligatoire',
      v => /.+@groupomania.com/.test(v) || 'Veuillez renseigner un email valide',
    ],
    //FIN - verif si email entré correspond a un email
    //verif si MDP entré correspond contient au moins 8 caractères
    password: '',
    passwordRules: [
      v => !!v || 'Mot de passe obligatoire',
      v => ( v && v.length >=8) || 'Au moins 8 caractères',
     ],
     //FIN - verif si MDP entré correspond contient au moins 8 caractères
     //verif la checkbox du dialog est cliquée (demande user de verif email entré a l'inscription)
    checkbox: false,
    checkboxRules: [v => !!v || 'Vous devez accepter pour continuer votre inscription'],
    //FIN - verif la checkbox du dialog est cliquée (demande user de verif email entré a l'inscription)


    dialog: false, //fonction dialog false pour quitter le dialog d'inscription
    
    show: false, // déclare false icon vision password par défaut
    isLoading:false

    

  }), //fin de data

    methods: {
      LogIn(){
        this.$store.dispatch('Auth/postLogin', {email: this.email, password: this.password}) //('nom module dans index.js/nom action liée'), payload
      },
      Register(){
        this.$store.dispatch('Auth/register', {email: this.email, password: this.password}) //('nom module dans index.js/nom action liée'), payload
      }
      

      },

  //debut gestion axios + vuex
  computed: {
    ...mapState('Auth', ['login']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    valid(){
      return(
      this.email && this.password.length >=8
      )
    },
    validReg(){
      return(
      this.email && this.password.length >=8 && this.checkbox == true
      )
    }
  },


//FIN gestion axios + vuex


};

 

</script>
<!-- JAVASCRIPT -->

<!-- CSS -->
<style>


</style>
<!-- CSS -->
