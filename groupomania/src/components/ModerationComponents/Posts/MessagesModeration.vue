<template>
<v-container fluid>
    <v-card class="mb-15" v-for="post in allPostsModeration" :key="post.id"> <!-- carte contenant le Post + commentaires -->
        <video controls width="100%" heigth="auto" v-if="post.upload_url !== null && post.upload_url.includes('videos') " :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + post.upload_url" max-height="400" @click="dialog=false"><!--section image back du profil qui englobe l'avatar-->
        </video> <!-- FIN section image back du profil qui englobe l'avatar -->
        <v-dialog v-model="dialog" persistent fullscreen width="500" >
            <template v-slot:activator="{ on, attrs }">
                <v-img class="rounded-t" v-bind="attrs" v-on="on" v-if="post.upload_url !== null && post.upload_url.includes('images')" :aspect-ratio="16/9" v-bind:href="'http://localhost:3000/' + post.upload_url" v-bind:src="'http://localhost:3000/' + post.upload_url" max-height="400" @click="dialog=true"><!-- section image back du profil qui englobe l'avatar -->
                </v-img> <!-- FIN section image back du profil qui englobe l'avatar --> <!--post.upload_url.includes('images') car les images sont stockées dans dossier images et le lien contiendra tjrs images -->
                <!-- <v-divider></v-divider> -->
            </template>

            <v-card class="d-flex align-center" >
                <v-img v-if="post.upload_url !== null && post.upload_url.includes('images')" contain :aspect-ratio="16/9" v-bind:href="'http://localhost:3000/' + post.upload_url" v-bind:src="'http://localhost:3000/' + post.upload_url" @click="dialog=false" ><!-- section image back du profil qui englobe l'avatar -->
                    </v-img> <!-- FIN section image back du profil qui englobe l'avatar --> <!--post.upload_url.includes('images') car les images sont stockées dans dossier images et le lien contiendra tjrs images -->
                <!-- <v-divider></v-divider> -->

            </v-card>
            
        </v-dialog>
        <v-divider></v-divider>

        <!-- Section message du user -->
        <v-row no-gutters>
            <!-- <v-div v-model="postid" :value= post.id>{{post.id}}</v-div> -->
            <v-col class="d-flex align-center justify-center" v-if="post.avatar != null">          
                
                    <v-avatar class="profile" color="grey"  rounded-pill border>
                    <v-img small v-bind:src="'http://localhost:3000/' + post.avatar"></v-img>
                    </v-avatar>

               
            </v-col>
            <v-col class="d-flex align-center justify-center" v-if="post.avatar == null"> 
                    <v-avatar class="profile" color="grey"  rounded-pill border >
                    <v-icon center dark >mdi-account-circle</v-icon>
                    </v-avatar>
            </v-col>
            <v-col cols="10" class="d-flex-column flex-wrap">
        <v-card-title class="body-1"> {{post.email}}</v-card-title>
        <v-card-text class="text-justify body-2" >{{post.content}}</v-card-text>
        <v-card-subtitle align="end" class="caption font-italic">Posté le: {{ post.createdAt | moment('LL')}} </v-card-subtitle><!-- insert date à laquelle le user aura créé le commentaire -->
            </v-col>

        </v-row>
        <!-- FIN - Section message du user -->
        <v-divider></v-divider>

        <v-card-actions class="d-flex justify-end"  ><!-- section boutons card messages -->
            <v-tooltip bottom v-show="profile.role == 2"><!-- rendre visible que quand le role user est 2 -->
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="unModeratePost(post.id, profile.uuid)"
                    ><v-icon size="20" color="green">mdi-alert-circle</v-icon>
                    </v-btn>
                </template>
                    <span>Modération</span>
            </v-tooltip>

            <v-divider vertical></v-divider><!-- rendre visible que quand le role user est 2 -->

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="deletePosts(post.id)"
                    ><v-icon size="20">mdi-close</v-icon>
                    </v-btn>
                </template>
                    <span>Effacer</span>
            </v-tooltip>

            <v-divider vertical></v-divider><!-- rendre visible que quand le user est celui qui a créé le commentaire -->

            <!-- bouton Like avec badge rouge compte les nombre de likes -->

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-badge overlap offset-x="15" offset-y="10" color="error">
                        <span slot="badge">{{post.nbre_likes}}</span>
                        <v-btn v-bind="attrs" v-on="on" plain text x-small 
                        ><v-icon size="20">mdi-thumb-up</v-icon>
                        </v-btn>
                    </v-badge>
                </template>
                    <span>J'aime</span>
            </v-tooltip>

            

            <!-- FIN - bouton Like avec badge rouge compte les nombre de likes -->
            <v-divider vertical></v-divider>
            <!-- bouton dislike avec badge rouge compte les nombre de dislikes -->


            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-badge overlap offset-x="15" offset-y="10" color="error">
                        <span slot="badge">{{post.nbre_dislikes}}</span>
                        <v-btn v-bind="attrs" v-on="on" plain text x-small 
                        ><v-icon size="20">mdi-thumb-down</v-icon>
                        </v-btn>
                    </v-badge>
                </template>
                    <span>J'aime pas</span>
            </v-tooltip>
            <!-- FIN - bouton disike avec badge rouge compte les nombre de dislikes -->
        </v-card-actions><!-- FIN - section boutons card messages -->


    <!-- Section timeline avec commentaires -->
        <div v-for="commentaire in post.comment" :key="commentaire.id" >
            <CommentairesMessagesModeration :commentaire="commentaire" :role="role" :profile="profile"/>
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
      
  },
  data: () => ({
    contentCom:'',
    postid: '',
    uuid:'',
    role: '',
    uploadCom:[],
    
    contentUpdate:'',
    uploadUpdate:[],
    
    
  reveal: false, // reveal false pour faire disparaitre section écrire commentaire au dessus de timeline commentaires
  updatePost: false, //pour faire disparaitre section update post au click sur bouton updater
  // controle le nombre de caractères inscrits dans partie Votre nouveau message UPDATEPOST
  
  rules: [
    value => (value && value.length >= 10 ) || 'Votre message doit faire au moins 10 caractères',
    ],  // FIN - controle le nombre de caractères inscrits dans partie Votre nouveau message UPDATEPOST
  }),

//debut gestion axios + vuex
  computed: {
    ...mapState('moderation', ['allPostsModeration']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    
  },
  mounted(){
    this.$store.dispatch('moderation/getModeratedPosts') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    this.$store.dispatch('getProfile/getProfile') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    
    // this.role = localStorage.getItem('role')// déclare role au montage = localstorage on s'en sert ensuite dans v-if pour cacher aux role 1
  },
//     updated(){
//     this.$store.dispatch('getPosts/getAllPostsAct') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
//     this.role = localStorage.getItem('role')// déclare role au montage = localstorage on s'en sert ensuite dans v-if pour cacher aux role 1
//   },

  methods:{
      deletePosts(postId){
        this.$store.dispatch('getPosts/deletePosts', { postid: postId}) 

      },
      unModeratePost(postId, uuid){
        this.$store.dispatch('moderation/unModeratePost', {post_id: postId, uuid:uuid}) 
      },


  },

//FIN gestion axios + vuex


}
</script>

<style>
.image{
    height: 10em;
    width: 10em;
}
.v-btn__content {
    display:flex;
    flex-direction:column;
}



</style>
