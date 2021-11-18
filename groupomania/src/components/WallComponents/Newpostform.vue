<template>
<v-container>
    <v-card class="d-flex align-center ms-15">
      <v-row class="d-flex align-center">
<v-col>
        <v-list-item-avatar class="ms-4">
        <v-img
          src="@/assets/logo.png"
          alt="avatar user"
        />
      </v-list-item-avatar>
      </v-col>

      <v-col cols="10" class="me-5">
     
      <v-text-field
        label="Quoi de neuf aujourd'hui?"
        :rules="rules"
        hide-details="auto"
      ></v-text-field>
 
      <v-file-input
      label="Upload Photo/Vidéo"
      ></v-file-input>
 
      </v-col>


</v-row>

      <v-btn color="error" height="40" class="me-4" small @click="upload">
        <v-icon>mdi-send</v-icon>
        Publier
      </v-btn>
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