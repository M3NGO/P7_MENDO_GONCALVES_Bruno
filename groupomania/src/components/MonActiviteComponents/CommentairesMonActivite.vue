<template>
  <v-container fluid>
    <v-card class="mb-5" v-for="(commentaire, index) in profile.comment" :key="index">
      <v-timeline align-top dense class="me-3"  ><!-- timeline des commentaires -->
        <v-timeline-item><!-- créé l'item commentaire et place sur timeline -->
          <template v-slot:icon><!-- icone sur la timeline a gauche du commentaire ajouter l'avatar de la personne qui commente-->
            <v-avatar color="grey" v-if="commentaire.avatar != null">
              <v-img small v-bind:src="'http://localhost:3000/' + commentaire.avatar"></v-img>
            </v-avatar>
            <v-avatar color="grey" v-if="commentaire.avatar == null">
              <v-icon center dark >mdi-account-circle</v-icon>
            </v-avatar>
          </template><!-- FIN - icone sur la timeline a gauche du commentaire ajouter l'avatar de la personne qui commente-->

          <v-card class="d-flex flex-column elevation-2"><!-- créé carte commentaire accolée a la timeline -->
            <video controls width="100%" hegth="auto" v-if="commentaire.upload_url !== null && commentaire.upload_url.includes('videos') " :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + commentaire.upload_url" max-height="300"></video> <!-- FIN section image back du profil qui englobe l'avatar -->
            <v-dialog v-model="dialog.commentaire[index]" width="100%" >
              <template v-slot:activator="{ on, attrs }">
                <v-img class="rounded-t" v-bind="attrs" v-on="on" v-if="commentaire.upload_url !== null && commentaire.upload_url.includes('images')" :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + commentaire.upload_url" max-height="300"></v-img><!-- section image back du profil qui englobe l'avatar -->
              </template>

              <v-card class="d-flex align-center" >
                <v-img v-if="commentaire.upload_url !== null && commentaire.upload_url.includes('images')" :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + commentaire.upload_url" @click="dialog={commentaire:[]}"></v-img><!-- section image back du profil qui englobe l'avatar -->
              </v-card>
            </v-dialog>

            <v-card-title class="body-2">{{commentaire.email}}</v-card-title><!-- insert l'email user qui commente en tant que titre commentaire-->
            <v-card-text class="caption text-justify">{{ commentaire.content }}</v-card-text>
            <v-card-subtitle align="end" class="caption font-italic">Publié le: {{ commentaire.createdAt | moment('LL')}} </v-card-subtitle><!-- insert date à laquelle le user aura créé le commentaire -->
            
            <!-- section boutons de la card-->
            <v-card-actions class="d-flex justify-end flex-wrap" >
              <!-- Bouton effacer -->
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="deleteComments(commentaire.id)">
                    <v-icon size="15">mdi-close</v-icon>
                  </v-btn>
                </template>
                <span>Effacer</span>
              </v-tooltip>
              <!-- FIN - Bouton effacer -->
              <!-- Bouton mise a jour commentaire -->
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" plain text x-small @click="setActiveUpdate(index)">
                    <v-icon size="15">mdi-cog</v-icon>
                  </v-btn>
                </template>
                <span>Mise à jour</span>
              </v-tooltip>
              <!-- FIN - Bouton mise a jour commentaire -->
  
              <!-- bouton Like avec badge rouge compte les nombre de likes -->
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-badge overlap offset-x="15" offset-y="10" color="error">
                    <span slot="badge">{{commentaire.nbre_likes}}</span>
                      <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="commentLike(commentaire.post_id, commentaire.id)">
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
                      <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="commentDislike(commentaire.post_id, commentaire.id)">
                        <v-icon size="15">mdi-thumb-down</v-icon>
                      </v-btn>
                  </v-badge>
                </template>
                <span>J'aime pas</span>
              </v-tooltip>
                <!-- FIN - bouton disike avec badge rouge compte les nombre de dislikes -->
            </v-card-actions>
            <!-- FIN - section boutons de la card-->
            <v-divider></v-divider>
            <!-- transition fait apparaitre section update commentaire sous la section boutons card-->
            <v-expand-transition v-model="isActiveUpdate" v-if="isClickedUpdate === index">
              <v-form v-model="validUpdate">
                <v-card-title class="transition-fast-in-fast-out">
                  <v-row class="d-flex align-center">
                    <v-col cols="10" class="me-5"><!-- section création Post (message + upload multimedia) -->
                      <v-text-field class=" body-2" label="Votre nouveau commentaire ici" :rules="rulesUpdate" v-model="contentUpdate" clearable hide-details></v-text-field> 
                      <v-file-input class=" body-2" label="Upload Photo/Vidéo" v-model="uploadUpdate" type="file"></v-file-input>
                    </v-col><!-- FIN - section création Post (message + upload multimedia) -->
                  </v-row>
                  <v-btn color="error" height="40" class="me-4" text x-small v-on:click="updaterComments(commentaire.post_id, commentaire.id)" :disabled="!validUpdate" >
                    <v-icon>mdi-send</v-icon>
                      Updater
                  </v-btn>
                </v-card-title>
              </v-form>
            </v-expand-transition>
            <!-- FIN - transition fait apparaitre section update commentaire sous la section boutons card-->
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
  data: () => ({
    contentUpdate:'',//déclaration update contenu a vide
    uploadUpdate:[], //déclaration update upload a vide array pour contenir les photos/videos
    isClickedUpdate:'',//délcatation is clicked pour expand trasition et functions setactiveupdate
    isActiveUpdate: false, //déclaration que la section update est non active avant click
    dialog: {commentaire:[]}, // dialog avec index des commentaires pour les rendre uniques et afficher dans le dialog seulement l'image cliquée
    
    updateComment: false, //pour faire disparaitre section update commentaire au click sur bouton updater
    validUpdate: false, // pour désactiver le bouton update avant que le new comment ne remplissent les conditions du ruleUpdate
    rulesUpdate: [
      v => ( v && v.length >=10) || 'Votre commentaire doit faire au moins 10 caractères',
    ],  // FIN - controle le nombre de caractères inscrits dans partie Votre nouveau commentaire
  }),//FIN data

  computed: {
    ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    ...mapState('likesDislikes', ['commentLikesDislikes']), //pour la gestion des likes/dislikes
  },//FIN - computed

  async mounted(){
    await this.$store.dispatch('getProfile/getProfile') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    this.$store.dispatch('likesDislikes/getAllCommentLikesDislikes')
  },//FIN - mounted

  methods:{
    setActiveUpdate(index) { //permet de déclancher l'ouverture/fermeture unique de l'expand qu'on a cliqué (au lieux de tout expand sur toutes les cartes)
      this.isClickedUpdate = index // le clickupdate = index du v-for de la carte cliquée
      if(this.isActiveUpdate==false){
        this.isClickedUpdate = index
        this.isActiveUpdate = !this.isActiveUpdate
      }else{
        this.isClickedUpdate = ''
        this.isActiveUpdate = !this.isActiveUpdate
      }
    },//FIN SETACTIVEUPDATE

    async deleteComments(commentId){
      await this.$store.dispatch('getPosts/deleteComments', { commentId: commentId})
      await this.$store.dispatch('getProfile/getProfile')
      await this.$store.dispatch('getPosts/getAllPostsAct')
    }, //FIN DELETECOMMENTS

    async updaterComments(postId, commentId){
      await this.$store.dispatch('getPosts/updateComments', {contentUpdate: this.contentUpdate, postid: postId, commentId:commentId, uploadUpdate: this.uploadUpdate}) 
      await this.$store.dispatch('getProfile/getProfile')
      await this.$store.dispatch('getPosts/getAllPostsAct')
      //on redéclare les variables à l'initiale:
      this.isClickedUpdate=''
      this.isActiveUpdate = !this.isActiveUpdate
      this.contentUpdate = ''
      this.uploadUpdate=[]
    },//FIN - UPDATECOMMENTS

    async commentLike(postId, commentId){
        let comment_like = await this.commentLikesDislikes.filter(likes => likes.uuid ==this.profile.uuid && likes.comment_id == commentId)
        //click déclaré false au début dans data
        if(!comment_like[0]){ //si click false alors on envoit un like et on déclare a true
        // console.log("j'envoie 1")
          await this.$store.dispatch('likesDislikes/commentLikesDislikes', {postid: postId, commentId: commentId, likes: 1})
          await this.$store.dispatch('likesDislikes/getAllCommentLikesDislikes')
          await this.$store.dispatch('getProfile/getProfile')
        }else if(comment_like[0].likes == 1){ //si click false alors on envoit un like et on déclare a true
        // console.log("j'envoie 0")
          await this.$store.dispatch('likesDislikes/commentLikesDislikes', {postid: postId, commentId: commentId, likes: 0})
          await this.$store.dispatch('likesDislikes/getAllCommentLikesDislikes')
          await this.$store.dispatch('getProfile/getProfile')
        }else if(comment_like[0].likes == 0){//si click true on evoit 0 like et on déclare click false
        // console.log("j'envoie 1n le like existe mais est à 0")
          await this.$store.dispatch('likesDislikes/commentLikesDislikes', {postid: postId, commentId: commentId, likes: 1})
          await this.$store.dispatch('likesDislikes/getAllCommentLikesDislikes')
          await this.$store.dispatch('getProfile/getProfile')
        }
      },//FIN - COMMENT LIKES

      async commentDislike(postId, commentId){
        let comment_dislike = await this.commentLikesDislikes.filter(likes => likes.uuid ==this.profile.uuid && likes.comment_id == commentId)

        if(!comment_dislike[0]){
          await this.$store.dispatch('likesDislikes/commentLikesDislikes', {postid: postId, commentId: commentId, likes: -1})
          await this.$store.dispatch('likesDislikes/getAllCommentLikesDislikes')
          await this.$store.dispatch('getProfile/getProfile')

        }else if(comment_dislike[0].dislikes == 1 && comment_dislike[0].likes == 0){
          await this.$store.dispatch('likesDislikes/commentLikesDislikes', {postid: postId, commentId: commentId, likes: 0})
          await this.$store.dispatch('likesDislikes/getAllCommentLikesDislikes')
          await this.$store.dispatch('getProfile/getProfile')
 
        }else if(comment_dislike[0].dislikes == 0){
              await this.$store.dispatch('likesDislikes/commentLikesDislikes', {postid: postId, commentId: commentId, likes: -1})
              await this.$store.dispatch('likesDislikes/getAllCommentLikesDislikes')
              await this.$store.dispatch('getProfile/getProfile')
        }
      }//FIN - COMMENT DISLIKES
  },//FIN methods
}//FIN EXPORT DEFAULT
</script>

<style>

</style>
