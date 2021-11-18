<template>
<v-timeline align-top dense class="me-5">
      <v-timeline-item large
      >
        <template v-slot:icon>
          <v-avatar>
            <img src="https://i.pravatar.cc/64">
          </v-avatar>
        </template>

        <v-card class="d-flex flex-column elevation-2">
          <v-card-title class="text-h5">
            email@email.com
          </v-card-title>
          <v-card-subtitle>le :15 /01/2021</v-card-subtitle>
          <v-card-text>ici on vera le commentaire de cet user, c'est un commentaire de fou, vous n'êtes pas pret.</v-card-text>
          <v-card-actions class="justify-end">
            
            <v-badge overlap bordered offset-x="30" offset-y="15" color="error" content="10">
              <v-btn plain width="100">
                <v-icon>mdi-thumb-up</v-icon>J'aime
              </v-btn>
            </v-badge>
    
            <v-badge overlap bordered offset-x="30" offset-y="15" color="error" content="8">
              <v-btn plain width="100">
                <v-icon>mdi-thumb-down</v-icon>J'aime pas
              </v-btn>
            </v-badge>
          </v-card-actions>
             
    </v-card>

 
 
      </v-timeline-item>
</v-timeline>
    
</template>
 
  


<script>
export default {
  name: 'Commentaires',

}
</script>

<style>
.image{
    height: 10em;
    width: 10em;
}

</style>
