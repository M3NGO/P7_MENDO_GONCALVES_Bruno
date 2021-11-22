<template>
 <v-container fluid>
  <v-card class="d-flex-column" >
    <v-div class="d-flex justify-center"  no-gutters>
      <v-list-item-avatar class="ms-4"> <!-- Avatar du user connecté-->
        <v-img src="https://i.pravatar.cc/64" alt="avatar user"/>
      </v-list-item-avatar><!-- FIN - Avatar du user connecté-->
       
      <v-col>
        <v-text-field label="Quoi de neuf aujourd'hui?" :rules="rules" hide-details="auto"></v-text-field> 
        <v-file-input label="Upload Photo/Vidéo"></v-file-input>
      </v-col>
      <v-div class="d-flex align-end justify-center mb-4" no-gutters>
        <v-btn color="error"  height="40" text x-small @click="upload">
          <v-icon>mdi-send</v-icon>
            Publier
        </v-btn>
      </v-div>
    </v-div><!-- FIN - section création Post (message + upload multimedia) -->
    
    </v-card>
 </v-container>

</template>

<script>
export default {
  name: 'Newposts',

  data: () => ({
    rules: [
      value => (value && value.length >= 10 ) || 'Votre post doit faire au moins 10 caractères',
    ],
})
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>