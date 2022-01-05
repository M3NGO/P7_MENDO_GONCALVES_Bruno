<template>
<v-container fluid>
    <v-card class="mb-15" v-for="(post, index) in allPostsModeration" :key="index"> <!-- carte contenant le Post + commentaires -->
        <video controls width="100%" height="auto" v-if="post.upload_url !== null && post.upload_url.includes('videos') " :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + post.upload_url" max-height="400" @click="dialog=false"><!--section image back du profil qui englobe l'avatar-->
        </video> <!-- FIN section image back du profil qui englobe l'avatar -->
        <v-dialog v-model="dialogPostMod.post[index]" width="100%" v-if="post.upload_url !== null && post.upload_url.includes('images')" >
            <template v-slot:activator="{ on, attrs }">
                <v-img class="rounded-t" v-bind="attrs" v-on="on" :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + post.upload_url" max-height="400" @click="dialog=true"><!-- section image back du profil qui englobe l'avatar -->
                </v-img> <!-- FIN section image back du profil qui englobe l'avatar --> <!--post.upload_url.includes('images') car les images sont stockées dans dossier images et le lien contiendra tjrs images -->
                <!-- <v-divider></v-divider> -->
            </template>

            <v-card class="d-flex align-center" >
                <v-img  contain :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + post.upload_url" @click="dialogPostMod={post:[]}" ><!-- section image back du profil qui englobe l'avatar -->
                    </v-img> <!-- FIN section image back du profil qui englobe l'avatar --> <!--post.upload_url.includes('images') car les images sont stockées dans dossier images et le lien contiendra tjrs images -->
                <!-- <v-divider></v-divider> -->

            </v-card>
            
        </v-dialog>
        <v-divider></v-divider>

        <!-- Section message du user -->
        <v-row no-gutters>
            <v-col class="d-flex align-center justify-center" v-if="post.avatar != null">          
                <v-avatar color="grey"  rounded-pill border>
                    <v-img small v-bind:src="'http://localhost:3000/' + post.avatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col class="d-flex align-center justify-center" v-if="post.avatar == null"> 
                <v-avatar color="grey"  rounded-pill border >
                    <v-icon center dark >mdi-account-circle</v-icon>
                </v-avatar>
            </v-col>
            <v-col cols="10" class="d-flex-column flex-wrap">
                <v-card-title class="body-1"> {{post.email}}</v-card-title>
                <v-card-text class="text-justify body-2" >{{post.content}}</v-card-text>
                <v-card-subtitle align="end" class="caption font-italic">Posté le: {{ post.createdAt | moment('LL')}} </v-card-subtitle><!-- insert date à laquelle le user aura créé le commentaire utilisation de moment pour présentation date-->
            </v-col>
        </v-row>
        <!-- FIN - Section message du user -->
        <v-divider></v-divider>

        <v-card-actions class="d-flex justify-end"  ><!-- section boutons card messages -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="unModeratePost(post.id, profile.uuid)">
                        <v-icon size="20" color="green">mdi-alert-circle</v-icon>
                    </v-btn>
                </template>
                <span>Modération</span>
            </v-tooltip>

            <v-divider vertical></v-divider>

            <v-tooltip bottom><!-- accessible en moderation pour les moderateurs puissent delete post -->
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="deletePosts(post.id)">
                        <v-icon size="20">mdi-close</v-icon>
                    </v-btn>
                </template>
                <span>Effacer</span>
            </v-tooltip>

            <v-divider vertical></v-divider>

            <!-- bouton Like avec badge rouge compte les nombre de likes -->

            <v-tooltip bottom> <!-- icone like avec badge désactivé -->
                <template v-slot:activator="{ on, attrs }">
                    <v-badge overlap offset-x="15" offset-y="10" color="error">
                        <span slot="badge">{{post.nbre_likes}}</span>
                        <v-btn v-bind="attrs" v-on="on" plain text x-small disabled>
                            <v-icon size="20">mdi-thumb-up</v-icon>
                        </v-btn>
                    </v-badge>
                </template>
                    <span>J'aime</span>
            </v-tooltip>
            <!-- FIN - bouton Like avec badge rouge compte les nombre de likes -->

            <v-divider vertical></v-divider>

            <!-- bouton dislike avec badge rouge compte les nombre de dislikes -->
            <v-tooltip bottom><!-- icone dislike avec badge désactivé -->
                <template v-slot:activator="{ on, attrs }">
                    <v-badge overlap offset-x="15" offset-y="10" color="error">
                        <span slot="badge">{{post.nbre_dislikes}}</span>
                        <v-btn v-bind="attrs" v-on="on" plain text x-small disabled>
                            <v-icon size="20">mdi-thumb-down</v-icon>
                        </v-btn>
                    </v-badge>
                </template>
                    <span>J'aime pas</span>
            </v-tooltip>
            
            <!-- FIN - bouton disike avec badge rouge compte les nombre de dislikes -->
        </v-card-actions><!-- FIN - section boutons card messages -->
        <v-divider></v-divider>

    <!-- Section timeline avec commentaires -->
        <div v-for="commentaire in post.comment" :key="commentaire.id" > <!-- Descente props vers composant enfant-->
            <CommentairesMessagesModeration :commentaire="commentaire"/>
        </div>
    <!-- FIN - Section timeline avec commentaires -->

    </v-card>
</v-container>
</template>

<script>
import CommentairesMessagesModeration from '@/components/ModerationComponents/Posts/CommentairesMessagesModeration.vue'
import { mapState } from 'vuex'

export default {
  name: 'Message',
  components:{
      CommentairesMessagesModeration, 
  },// FIN composant Commentaire importé
  data: () => ({
    contentCom:'', //declaration contenu commentaire vide
    postid: '', //déclaration argument postId vide pour fonctions deletePosts & unModeratePost dans methods
    uuid:'', //déclaration argument uuid vide pour fonction unModeratePost dans methods
    dialogPostMod: {post:[]},//déclaration v-model unique par post pour dialog images
  }), // FIN data


  computed: {
    ...mapState('moderation', ['allPostsModeration']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
  },// FIN COMPUTED
  
  async mounted(){
    await this.$store.dispatch('moderation/getModeratedPosts') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
  },//FIN mounted

  methods:{
    async deletePosts(postId){
        await this.$store.dispatch('getPosts/deletePosts', { postid: postId})
        await this.$store.dispatch('moderation/getModeratedPosts') 
        await this.$store.dispatch('getPosts/getAllPostsAct')
    },//FIN DELETEPOSTS
    async unModeratePost(postId, uuid){
        await this.$store.dispatch('moderation/unModeratePost', {post_id: postId, uuid:uuid})
        await this.$store.dispatch('moderation/getModeratedPosts') 
    },//FIN UNMODERATEPOSTS
  },//FIN methods

}//FIN EXPORT DEFAULT
</script>

<style>

</style>
