<!-- Composant login Groupomania -->

<!-- HTML -->
<template>  
  <v-container  class="fill-height ">
    <v-card elevation="20" class="mx-auto rounded-xl"><!-- carte login -->
      <v-col cols="12" class="text-center">
        <img width="200" src="../assets/Logo_Groupomania.png" alt="logo Groupomania">
        <v-form ref="form" class="mb-5 me-5 ms-5" v-model="valid" lazy-validation><!-- Formulaire login -->
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" outlined dense required></v-text-field>
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
          ></v-text-field>

      
            <!--Dialog inscription sur bouton pas encore inscrit de la page login -->
            <v-dialog v-model="dialog" persistent><!-- Dialog inscription -->
              <template v-slot:activator="{ on, attrs }">
                <!-- bouton pas encore inscrit qui déclanche au clic le dialog inscription -->
                <v-btn elevation="10" color="primary" dark class="rounded-xl" v-bind="attrs" v-on="on">
                  Pas encore inscrit(e)?
                </v-btn>
              </template>
                  
              <v-card class="mx-auto rounded-xl" ><!-- Carte inscription dans le dialog -->
                <v-col class="text-center">
                  <img width="200" src="../assets/Logo_Groupomania.png" alt="logo Groupomania">
                </v-col>
                <v-card-title class="justify-center">Inscription</v-card-title>
                <v-card-text><!-- zone email + password inscription -->
                  <v-container>
                    <v-col>
                      <v-text-field v-model="email" :rules="emailRules" label="E-mail" outlined dense required></v-text-field>
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
                  <v-btn :disabled="!valid" color="error darken-1" text class="rounded-xl" @click="dialog = false">
                    Valider
                  </v-btn>
                </v-card-actions>
              </v-card><!-- FIN - Carte inscription dans le dialog -->
            </v-dialog><!-- FIN - Dialog inscription -->

          <v-btn :disabled="!valid" color="error" class="ms-4 rounded-xl" @click="validate" elevation="10">
              Entrer
          </v-btn>
        </v-form><!-- FIN - Formulaire login -->
      </v-col>
    </v-card><!-- FIN - carte login -->
  </v-container>
</template>
<!-- HTML -->

<!-- JAVASCRIPT -->
<script>


export default {
  name: 'Login',
  
    data: () => ({
    //verif si email entré correspond a un email
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail obligatoire',
      v => /.+@.+\..+/.test(v) || 'Veuillez renseigner un email valide',
    ],
    //FIN - verif si email entré correspond a un email
    //verif si MDP entré correspond contient au moins 8 caractères
    password: '',
    passwordRules: [
      v => !!v || 'Mot de passe obligatoire',
      v => v.length >= 8 || 'Au moins 8 caractères',
     ],
     //FIN - verif si MDP entré correspond contient au moins 8 caractères
     //verif la checkbox du dialog est cliquée (demande user de verif email entré a l'inscription)
    checkbox: false,
    checkboxRules: [v => !!v || 'Vous devez accepter pour continuer votre inscription'],
    //FIN - verif la checkbox du dialog est cliquée (demande user de verif email entré a l'inscription)


    dialog: false, //fonction dialog false pour quitter le dialog d'inscription
    
    show: false, // déclare false icon vision password par défaut
    

    
    methods: {
    validate () {
      this.$refs.form.validate()
    },
  
      },
  }),


};

 

</script>
<!-- JAVASCRIPT -->

<!-- CSS -->
<style>


</style>
<!-- CSS -->
