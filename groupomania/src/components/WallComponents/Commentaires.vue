<template>
  <v-timeline align-top dense class="me-3" v-if="commentaire.active == true" ><!-- timeline des commentaires -->
    <v-timeline-item><!-- créé l'item commentaire et place sur timeline -->
      <template  v-slot:icon><!-- icone sur la timeline a gauche du commentaire ajouter l'avatar de la personne qui commente-->
        <v-avatar color="grey" v-if="commentaire.avatar != null"><!-- si avatar user est présent en BDD alors on sert l'image-->
          <v-img small v-bind:src="'http://localhost:3000/' + commentaire.avatar"></v-img>
        </v-avatar>
        <v-avatar color="grey" v-if="commentaire.avatar == null"><!-- si l'avatar user est null alors on met icone -->
          <v-icon center dark >mdi-account-circle</v-icon>
        </v-avatar>
      </template><!-- FIN - icone sur la timeline a gauche du commentaire ajouter l'avatar de la personne qui commente-->

      <v-card class="d-flex flex-column elevation-2"><!-- créé carte commentaire accolée a la timeline -->
        <video controls width="100%" hegth="auto" v-if="commentaire.upload_url !== null && commentaire.upload_url.includes('videos') " :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + commentaire.upload_url" max-height="300"></video> <!-- balise vidéo en cas de vidéo présente dans le commentaire -->
        <v-dialog v-model="dialog" width="100%" v-if="commentaire.upload_url !== null && commentaire.upload_url.includes('images')" >
          <template v-slot:activator="{ on, attrs }">
            <v-img class="rounded-t" v-bind="attrs" v-on="on" :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + commentaire.upload_url" max-height="300" @click="dialog=true"></v-img><!-- balise img en cas d'image uploadée pour le commentaire-->
          </template>

          <v-card class="d-flex align-center" ><!-- imgae du commentaire servie dans le dialog -->
            <v-img  :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + commentaire.upload_url" @click="dialog=false"></v-img><!-- section image back du profil qui englobe l'avatar -->
          </v-card>
        </v-dialog>
        
        
        <v-card-title class="body-2">{{commentaire.email}}</v-card-title><!-- insert l'email user qui commente en tant que titre commentaire-->
        <v-card-text class="caption text-justify">{{ commentaire.content }}</v-card-text>
        <v-card-subtitle align="end" class="caption font-italic">Publié le : {{ commentaire.createdAt | moment('LL')}} </v-card-subtitle><!-- insert date à laquelle le user aura créé le commentaire, utilisation de moment pour présentation date -->
        
        <!-- section boutons card messages -->
        <v-card-actions class="d-flex justify-end flex-wrap" >
          <v-tooltip bottom v-if="profile.role == 2"><!-- rendre visible que quand le role user est 2 (moderateur)-->
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="moderationComment(commentaire.id, profile.uuid)" aria-label="Modération">
                <v-icon size="15" color="error">mdi-alert-circle</v-icon>
              </v-btn>
            </template>
              <span>Modération</span>
          </v-tooltip><!-- rendre visible que quand le role user est 2 (moderateur -->

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-show="profile.uuid === commentaire.uuid" v-bind="attrs" v-on="on" plain text x-small v-on:click="deleteComments(commentaire.id)" aria-label="Effacer">
                <v-icon size="15">mdi-close</v-icon>
              </v-btn>
            </template>
              <span>Effacer</span>
          </v-tooltip>
          
          <v-tooltip bottom><!-- rendre visible que quand le user est celui qui a créé le commentaire -->
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-show="profile.uuid === commentaire.uuid" v-bind="attrs" v-on="on" plain text x-small @click="setActiveUpdate(commentaire.id, commentaire.content)" aria-label="Mettre a jour">
                <v-icon size="15">mdi-cog</v-icon>
              </v-btn>
            </template>
              <span>Mise à jour</span>
          </v-tooltip>
          
          <!-- bouton Like avec badge rouge compte les nombre de likes -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-badge overlap offset-x="15" offset-y="10" color="error">
                <span slot="badge">{{commentaire.nbre_likes}}</span>
                <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="commentLike(commentaire.post_id, commentaire.id)" aria-label="J'aime">
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
                <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="commentDislike(commentaire.post_id, commentaire.id)" aria-label="Je n'aime pas">
                  <v-icon size="15">mdi-thumb-down</v-icon>
                </v-btn>
              </v-badge>
            </template>
              <span>J'aime pas</span>
          </v-tooltip>
          <!-- FIN - bouton disike avec badge rouge compte les nombre de dislikes -->

        </v-card-actions>
        <!-- FIN - section boutons card messages -->
        <v-divider ></v-divider>
        <!-- transition fait apparaitre section update commentaire sous la section boutons card-->
        <v-expand-transition v-model="isActiveUpdate" v-if="isClickedUpdate === commentaire.id">
          <v-form v-model="validUpdate">
            <v-card-title  class="transition-fast-in-fast-out">
              <v-row class="d-flex align-center">
                <v-col cols="10" class="me-5"><!-- section création Post (message + upload multimedia) -->
                  <v-text-field class=" body-2" label="Votre nouveau commentaire ici" :rules="rulesUpdate" v-model="contentUpdate" clearable hide-details></v-text-field> 
                  <v-file-input class=" body-2" label="Upload Photo/Vidéo" v-model="uploadUpdate"></v-file-input>
                </v-col><!-- FIN - section création Post (message + upload multimedia) -->
              </v-row>
              <v-btn color="error" height="40" class="me-4" text x-small v-on:click="updaterComments(commentaire.post_id, commentaire.id)" :disabled="!validUpdate" aria-label="Mettre à jour commentaire">
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
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Commentaires',
  props: {
   commentaire: {
        type: Object,
        default: null
   },
   profile:{
        default: null
   }
  },//FIN - Props descendues du parent Messages.vue

  data: () => ({
    contentUpdate:'',//déclaration content update a vide
    uploadUpdate:[],//déclaration uploadupdate a vide

    isClickedUpdate:'', //definit si bouton update a été clické en lui assignant l'id du commentaire
    isActiveUpdate: false,// définit si la zone d'update est visible ou non

    dialog: false, // déclare le dialog image false pour ne pas montrer image en plein écran d'office

    // controle le nombre de caractères inscrits dans partie Votre nouveau commentaire
    validUpdate: false,
    rulesUpdate: [
      v => ( v && v.length >=10) || 'Votre commentaire doit faire au moins 10 caractères',
      ],
    // FIN - controle le nombre de caractères inscrits dans partie Votre nouveau commentaire
  }),//FIN - data

  computed: {
    ...mapState('likesDislikes', ['commentLikesDislikes']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
  },//FIN - computed

  methods:{
    setActiveUpdate(index, content) {
      this.isClickedUpdate = index
      this.contentUpdate = content
      if(this.isActiveUpdate==false){
        this.isClickedUpdate = index
        this.contentUpdate = content
        this.isActiveUpdate = !this.isActiveUpdate
      }else{
        this.isClickedUpdate = ''
        this.isActiveUpdate = !this.isActiveUpdate
      }
    },//FIN - SetActiveUpdate

    async updaterComments(postId, commentId){
      await this.$store.dispatch('getPosts/updateComments', {contentUpdate: this.contentUpdate, postid: postId, commentId:commentId, uploadUpdate: this.uploadUpdate}) 
      await this.$store.dispatch('getPosts/getAllPostsAct')
      //remise à zéro commentaire
      this.isClickedUpdate = ''
      this.isActiveUpdate = !this.isActiveUpdate
    },//FIN - updaterComments

    async deleteComments(commentId){
      let confirmation = confirm("Êtes-vous sûr(e) de vouloir supprimer définitivement votre commentaire?")
      if(confirmation){
        await this.$store.dispatch('getPosts/deleteComments', { commentId: commentId})
        await this.$store.dispatch('getPosts/getAllPostsAct')
      }//FIN if
      else{
        window.location.reload
      }//FIN else

    },//FIN - deleteComments

    async moderationComment(commentId, uuid){
        await this.$store.dispatch('moderation/moderationComment', {comment_id: commentId, uuid:uuid})
        await this.$store.dispatch('getPosts/getAllPostsAct')
        await this.$store.dispatch('moderation/getModeratedComments')
    },//FIN - moderationComment

    async commentLike(postId, commentId){
      let comment_like = await this.commentLikesDislikes.filter(likes => likes.uuid ==this.profile.uuid && likes.comment_id == commentId)
      //click déclaré false au début dans data
      if(!comment_like[0]){ //si clck false alors on envoit un like et on déclare a true
      // console.log("j'envoie 1")
        await this.$store.dispatch('likesDislikes/commentLikesDislikes', {postid: postId, commentId: commentId, likes: 1})
        await this.$store.dispatch('likesDislikes/getAllCommentLikesDislikes')
        await this.$store.dispatch('getPosts/getAllPostsAct')
      }else if(comment_like[0].likes == 1){ //si clck false alors on envoit un like et on déclare a true
        // console.log("j'envoie 0")
        await this.$store.dispatch('likesDislikes/commentLikesDislikes', {postid: postId, commentId: commentId, likes: 0})
        await this.$store.dispatch('likesDislikes/getAllCommentLikesDislikes')
        await this.$store.dispatch('getPosts/getAllPostsAct')
      }else if(comment_like[0].likes == 0){//si click true on evoit 0 like et on déclare click false
        // console.log("j'envoie 1n le like existe mais est à 0")
        await this.$store.dispatch('likesDislikes/commentLikesDislikes', {postid: postId, commentId: commentId, likes: 1})
        await this.$store.dispatch('likesDislikes/getAllCommentLikesDislikes')
        await this.$store.dispatch('getPosts/getAllPostsAct')
      }
    },//FIN - commentLike

    async commentDislike(postId, commentId){
      let comment_dislike = await this.commentLikesDislikes.filter(likes => likes.uuid ==this.profile.uuid && likes.comment_id == commentId)
      if(!comment_dislike[0]){
        await this.$store.dispatch('likesDislikes/commentLikesDislikes', {postid: postId, commentId: commentId, likes: -1})
        await this.$store.dispatch('likesDislikes/getAllCommentLikesDislikes')
        await this.$store.dispatch('getPosts/getAllPostsAct')
      }else if(comment_dislike[0].dislikes == 1 && comment_dislike[0].likes == 0){
        await this.$store.dispatch('likesDislikes/commentLikesDislikes', {postid: postId, commentId: commentId, likes: 0})
        await this.$store.dispatch('likesDislikes/getAllCommentLikesDislikes')
        await this.$store.dispatch('getPosts/getAllPostsAct')
      }else if(comment_dislike[0].dislikes == 0){
        await this.$store.dispatch('likesDislikes/commentLikesDislikes', {postid: postId, commentId: commentId, likes: -1})
        await this.$store.dispatch('likesDislikes/getAllCommentLikesDislikes')
        await this.$store.dispatch('getPosts/getAllPostsAct')
      }
    }//FIN - CommentDislike

  },//FIN - methods

}//FIN EXPORT DEFAULT
</script>

<style>

</style>
