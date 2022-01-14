<template> <!-- Composant unique commentaires moderation -->
  <v-container fluid>
    <v-card class="mb-5" v-for="(commentaire, index) in allCommentsModeration" :key="index">
      <v-timeline align-top dense class="me-3"  ><!-- timeline des commentaires -->
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
            <video controls width="100%" height="auto" v-if="commentaire.upload_url !== null && commentaire.upload_url.includes('videos') " :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + commentaire.upload_url" max-height="300"></video> <!-- FIN section image back du profil qui englobe l'avatar -->
            <v-dialog v-model="dialogCommentaire.commentaire[index]" width="100%" >
              <template v-slot:activator="{ on, attrs }">
                <v-img class="rounded-t" v-bind="attrs" v-on="on" v-if="commentaire.upload_url !== null && commentaire.upload_url.includes('images')" :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + commentaire.upload_url" max-height="300" @click="dialog=true"></v-img><!-- section image back du profil qui englobe l'avatar -->
              </template>

              <v-card class="d-flex align-center" >
                <v-img v-if="commentaire.upload_url !== null && commentaire.upload_url.includes('images')" :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + commentaire.upload_url" @click="dialogCommentaire={commentaire:[]}"></v-img><!-- section image back du profil qui englobe l'avatar -->
              </v-card>
            </v-dialog>
            <v-card-title class="body-2">{{commentaire.email}}</v-card-title><!-- insert l'email user qui commente en tant que titre commentaire-->
            <v-card-text class="caption text-justify">{{ commentaire.content }}</v-card-text>
            <v-card-subtitle align="end" class="caption font-italic">Publié le : {{ commentaire.createdAt | moment('LL')}} </v-card-subtitle><!-- insert date à laquelle le user aura créé le commentaire -->
            
            <v-card-actions class="d-flex justify-end flex-wrap" ><!-- section boutons card messages -->
              <!-- Bouton Moderation vert pour remettre en live le commentaire-->
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="unModerateComment(commentaire.id, profile.uuid)" aria-label="Modération">
                    <v-icon size="15" color="green">mdi-alert-circle</v-icon>
                  </v-btn>
                </template>
                <span>Modération</span>
              </v-tooltip>
              <!-- FIN - Bouton Moderation vert pour remettre en live le commentaire-->

              <!-- Bouton effacer pour effacer définitivement le commentaire-->
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="deleteComments(commentaire.id)" aria-label="Effacer commentaire">
                    <v-icon size="15">mdi-close</v-icon>
                  </v-btn>
                </template>
                <span>Effacer</span>
              </v-tooltip>
              <!-- FIN - Bouton effacer pour effacer définitivement le commentaire-->

              <!-- bouton Like avec badge rouge compte les nombre de likes désactivé -->
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-badge overlap offset-x="15" offset-y="10" color="error">
                    <span slot="badge">{{commentaire.nbre_likes}}</span>
                      <v-btn v-bind="attrs" v-on="on" plain text x-small disabled aria-label="J'aime">
                        <v-icon size="15">mdi-thumb-up</v-icon>
                      </v-btn>
                  </v-badge>
                </template>
                <span>J'aime</span>
              </v-tooltip>
              <!-- FIN - bouton Like avec badge rouge compte les nombre de likes désactivé -->
                
              <!-- bouton dislike avec badge rouge compte les nombre de dislikes désactivé -->
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-badge overlap offset-x="15" offset-y="10" color="error">
                    <span slot="badge">{{commentaire.nbre_dislikes}}</span>
                      <v-btn v-bind="attrs" v-on="on" plain text x-small disabled aria-label="Je n'aime pas">
                        <v-icon size="15">mdi-thumb-down</v-icon>
                      </v-btn>
                  </v-badge>
                </template>
                <span>J'aime pas</span>
              </v-tooltip>
              <!-- FIN - bouton dislike avec badge rouge compte les nombre de dislikes désactivé -->
            </v-card-actions><!-- FIN - section boutons card messages -->

          </v-card><!-- FIN - carte commentaire accolée a la timeline -->
        </v-timeline-item><!-- FIN - créé l'item commentaire et place sur timeline -->
      </v-timeline><!-- FIN - timeline des commentaires -->
      </v-card>
  </v-container>
</template>

<script>
import { mapState} from 'vuex'
export default {
  name: 'Commentaires',
  data:() => ({
    dialogCommentaire: {commentaire:[]},// dialogCommentaire pour donner id unique aux images des commentaire pour les dialogs
  }),//FIN data

  computed: {
    ...mapState('moderation', ['allCommentsModeration']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    ...mapState('getProfile', ['profile']), //utilisé pour envoyer au back le uuid du moderateur qui click (s'assure que c'est profil 2)
  },// FIN - computed

  async mounted(){
    await this.$store.dispatch('moderation/getModeratedComments') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
  },//FIN - mounted

  methods:{
    async deleteComments(commentId){
      let confirmation = confirm("Êtes-vous sûr(e) de vouloir supprimer définitivement ce commentaire?")
      if(confirmation){
        await this.$store.dispatch('getPosts/deleteComments', { commentId: commentId})
        await this.$store.dispatch('moderation/getModeratedComments')
        await this.$store.dispatch('getPosts/getAllPostsAct') 
      }//FIN if
      else{
        window.location.reload
      }//FIN ELSE

    },//FIN DELETECOMMENTS
    async unModerateComment(commentId, uuid){
      let confirmation = confirm("Êtes-vous sûr(e) de vouloir remettre ce commentaire dans le wall?")
      if(confirmation){
        await this.$store.dispatch('moderation/unModerateComment', {comment_id: commentId, uuid:uuid})
        await this.$store.dispatch('moderation/getModeratedComments') 
      }//FIN if
      else{
        window.location.reload
      }//FIN ELSE

    },//FIN UNMODERATECOMMENT
  },//FIN - methods

}
</script>

<style>

</style>
