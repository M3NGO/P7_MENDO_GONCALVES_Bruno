<template>
  <v-timeline align-top dense class="me-3"><!-- timeline des commentaires -->
    <v-timeline-item><!-- créé l'item commentaire et place sur timeline -->
      <template  v-slot:icon><!-- icone sur la timeline a gauche du commentaire ajouter l'avatar de la personne qui commente-->
        <v-avatar color="grey" v-if="commentaire.avatar != null">
          <v-img small v-bind:src="'http://localhost:3000/' + commentaire.avatar"></v-img>
        </v-avatar>
        <v-avatar color="grey" v-if="commentaire.avatar == null">
          <v-icon center dark >mdi-account-circle</v-icon>
        </v-avatar>
      </template><!-- FIN - icone sur la timeline a gauche du commentaire ajouter l'avatar de la personne qui commente-->

      <v-card class="d-flex flex-column elevation-2"><!-- créé carte commentaire accolée a la timeline -->
      <v-img v-if="commentaire.upload_url !== null" :aspect-ratio="16/9" src="@/assets/Logo_Groupomania.png" max-height="300"></v-img><!-- section image back du profil qui englobe l'avatar -->
        <v-card-title class="body-2">{{commentaire.email}}</v-card-title><!-- insert l'email user qui commente en tant que titre commentaire-->
        <v-card-text class="caption text-justify">{{ commentaire.content }}</v-card-text>
        <v-card-subtitle align="end" class="caption font-italic">Publié {{ commentaire.updatedAt}}</v-card-subtitle><!-- insert date à laquelle le user aura créé le commentaire -->
        
        <v-card-actions class="d-flex justify-end flex-wrap" ><!-- section boutons card messages -->

            <!-- bouton Like avec badge rouge compte les nombre de likes -->

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-badge overlap offset-x="15" offset-y="10" color="error" content="10">
                        <v-btn v-bind="attrs" v-on="on" plain text x-small
                        ><v-icon size="15">mdi-thumb-up</v-icon>
                        </v-btn>
                    </v-badge>
                </template>
                    <span>J'aime</span>
            </v-tooltip>

            
            <!-- FIN - bouton Like avec badge rouge compte les nombre de likes -->
            
            <!-- bouton dislike avec badge rouge compte les nombre de dislikes -->


            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-badge overlap offset-x="15" offset-y="10" color="error" content="8">
                        <v-btn v-bind="attrs" v-on="on" plain text x-small 
                        ><v-icon size="15">mdi-thumb-down</v-icon>
                        </v-btn>
                    </v-badge>
                </template>
                    <span>J'aime</span>
            </v-tooltip>
            <!-- FIN - bouton disike avec badge rouge compte les nombre de dislikes -->
        </v-card-actions><!-- FIN - section boutons card messages -->

      </v-card><!-- FIN - carte commentaire accolée a la timeline -->
    </v-timeline-item><!-- FIN - créé l'item commentaire et place sur timeline -->
  </v-timeline><!-- FIN - timeline des commentaires -->
</template>
 
  


<script>
export default {
  name: 'Commentaires',
  props: {
   commentaire: {
        type: Object,
        default: null
   },
   profile:{
        type: Object,
        default: null
   }
  },




}
</script>

<style>
/* .image{
    height: 10em;
    width: 10em;
} */
/* .v-timeline-item__divider{
   justify-content: left
} */




</style>
