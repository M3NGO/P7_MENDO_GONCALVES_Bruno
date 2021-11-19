<template>
  <v-container> <!-- Div Contenu Profil -->
    <v-card class=" ms-15">
      <v-img height="100%" src="@/assets/Logo_Groupomania.png"><!-- haut de la carte profil update-->
        <v-row align="end" class="fill-height">
          <v-col align-self="start" class="pa-0" cols="12">
            <v-avatar class="profile" color="grey" size="20%" rounded tile>
              <v-img src="https://i.pravatar.cc/64"></v-img>
            </v-avatar>
          </v-col>
          <v-col class="py-0">
            <v-list-item color="grey">
              <v-list-item-content>
                <v-list-item-title class="text-h6">Prénom Nom</v-list-item-title>
                <v-list-item-subtitle>Poste</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img><!-- FIN - haut de la carte profil update-->
      
      <v-col class="d-flex flex-column mt-5 mb-5 me-5"><!-- colonne contenant les field update du profil + boutons -->  

        <v-text-field  dense outlined disabled label="email@email.com" ></v-text-field>
        <v-text-field dense outlined label="Poste" ></v-text-field>
        <v-text-field dense outlined label="Prénom" ></v-text-field>
        <v-text-field dense outlined label="Nom" ></v-text-field>
        <v-text-field dense outlined label="Mot de passe" ></v-text-field>
        <v-file-input dense outlined label="Update Avatar"></v-file-input>

        <v-btn  text color="error">Mettre à jour</v-btn>

      </v-col><!-- FIN - colonne contenant les field update du profil + boutons -->  

      <v-row class="d-flex justify-end me-1 mb-1"><!--  BOUTON SUPPRIMER COMPTE -->
        <v-btn  text color="primary">Supprimer compte</v-btn>
      </v-row><!--  BOUTON SUPPRIMER COMPTE -->
      
    </v-card>
  </v-container><!-- Div Contenu Profil -->
</template>

<script>
export default {
  name: 'ProfilUpdate',

}
</script>

<style>

</style>