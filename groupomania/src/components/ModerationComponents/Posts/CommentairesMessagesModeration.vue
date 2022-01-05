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
        <video controls width="100%" hegth="auto" v-if="commentaire.upload_url !== null && commentaire.upload_url.includes('videos') " :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + commentaire.upload_url" max-height="300"></video> <!-- FIN section image back du profil qui englobe l'avatar -->
        <v-dialog v-model="dialog" width="100%" >
            <template v-slot:activator="{ on, attrs }">
              <v-img class="rounded-t" v-bind="attrs" v-on="on" v-if="commentaire.upload_url !== null && commentaire.upload_url.includes('images')" :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + commentaire.upload_url" max-height="300" @click="dialog=true"></v-img><!-- section image back du profil qui englobe l'avatar -->
            </template>

            <v-card class="d-flex align-center" >
              <v-img v-if="commentaire.upload_url !== null && commentaire.upload_url.includes('images')" :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + commentaire.upload_url" @click="dialog=false"></v-img><!-- section image back du profil qui englobe l'avatar -->
            </v-card>
        </v-dialog>
        <v-card-title class="body-2">{{commentaire.email}}</v-card-title><!-- insert l'email user qui commente en tant que titre commentaire-->
        <v-card-text class="caption text-justify">{{ commentaire.content }}</v-card-text> <!-- insert le contenu du message du user -->
        <v-card-subtitle align="end" class="caption font-italic">Publié le : {{ commentaire.createdAt | moment('LL')}} </v-card-subtitle><!-- insert date à laquelle le user aura créé le commentaire  et utilisation de moment pour affichage date -->
        
        <v-card-actions class="d-flex justify-end flex-wrap" ><!-- section boutons card messages -->

          <!-- bouton Like avec badge rouge compte les nombre de likes -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-badge overlap offset-x="15" offset-y="10" color="error">
                <span slot="badge">{{commentaire.nbre_likes}}</span>
                <v-btn v-bind="attrs" v-on="on" plain text x-small disabled>
                  <v-icon size="15">mdi-thumb-up</v-icon>
                </v-btn>
              </v-badge>
            </template>
            <span>J'aime</span>
          </v-tooltip>
          <!-- FIN - bouton Like avec badge rouge compte les nombre de likes -->
            
          <!-- bouton dislike avec badge rouge compte les nombre de dislikes -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-badge overlap offset-x="15" offset-y="10" color="error">
                <span slot="badge">{{commentaire.nbre_dislikes}}</span>
                  <v-btn v-bind="attrs" v-on="on" plain text x-small disabled>
                    <v-icon size="15">mdi-thumb-down</v-icon>
                  </v-btn>
              </v-badge>
            </template>
            <span>J'aime pas</span>
          </v-tooltip>
          <!-- FIN - bouton dislike avec badge rouge compte les nombre de dislikes -->
        </v-card-actions><!-- FIN - section boutons card messages -->

      </v-card><!-- FIN - carte commentaire accolée a la timeline -->
    </v-timeline-item><!-- FIN - créé l'item commentaire et place sur timeline -->
  </v-timeline><!-- FIN - timeline des commentaires -->
</template>
 
<script>
export default {
  name: 'Commentaires',
  data:() => ({
    dialog: false,
  }),//FIN data
  props: {
   commentaire: {
        type: Object,
        default: null
   }, // FIN PROPS commentaire venant du composant parent Posts/MessagesModeration
  },// FIN des props importées du parent Posts/MessagesModeration
}// FIN EXPORT DEFAULT
</script>

<style>

</style>
