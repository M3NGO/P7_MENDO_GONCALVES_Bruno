<template>
  <v-container> <!-- Div Contenu Profil -->
    <v-card class=" ms-15">
      <v-img height="100%"
        src="@/assets/Logo_Groupomania.png"
      >
        <v-row
          align="end"
          class="fill-height"
        >
          <v-col
            align-self="start"
            class="pa-0"
            cols="12"
          >
            <v-avatar
              class="profile"
              color="grey"
              size="164"
              rounded
              tile
            >
              <v-img src="https://i.pravatar.cc/64"></v-img>
            </v-avatar>
          </v-col>
          <v-col class="py-0">
            <v-list-item
              color="grey"
            >
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  Prénom Nom
                </v-list-item-title>
                <v-list-item-subtitle>Poste</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img>


   <v-col class="d-flex flex-column mt-5 mb-5 me-5">         

<v-text-field  dense outlined disabled label="email@email.com" ></v-text-field>

<v-text-field dense outlined label="Poste" ></v-text-field>

<v-text-field dense outlined label="Prénom" ></v-text-field>

<v-text-field dense outlined label="Nom" ></v-text-field>

<v-text-field dense outlined label="Mot de passe" ></v-text-field>

<v-file-input dense outlined label="Update Avatar"></v-file-input>

<v-btn  text color="error">Mettre à jour</v-btn>
   </v-col>

           
            
        </v-card>
    </v-container><!-- Div Contenu Profil -->
</template>

<script>
export default {
  name: 'ProfilUpdate',

}
</script>

<style>
/* .card-img-top{
    max-height:10em;
    max-width: 10em;
} */
h1{
    text-align: center;
}
</style>