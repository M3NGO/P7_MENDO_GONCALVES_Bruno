<template>
<v-container fluid>
    <v-card  class="mb-10" v-for="(post, index) in profile.post" :key="index" > <!-- carte contenant le Post + commentaires -->
        <video controls width="100%" heigth="auto" v-if="post.upload_url !== null && post.upload_url.includes('videos') " :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + post.upload_url" max-height="400"><!--section image back du profil qui englobe l'avatar-->
        </video> <!-- FIN section image back du profil qui englobe l'avatar -->
        <v-dialog v-model="dialogPost.post[index]"  width="1000" >
            <template v-slot:activator="{ on, image }">
                <v-img class="rounded-t" v-bind="image" v-on="on" v-if="post.upload_url !== null && post.upload_url.includes('images')" :aspect-ratio="16/9" v-bind:href="'http://localhost:3000/' + post.upload_url" v-bind:src="'http://localhost:3000/' + post.upload_url"><!-- section image back du profil qui englobe l'avatar -->
                </v-img> <!-- FIN section image back du profil qui englobe l'avatar --> <!--post.upload_url.includes('images') car les images sont stockées dans dossier images et le lien contiendra tjrs images -->
                <!-- <v-divider></v-divider> -->
            </template>

            <v-card class="d-flex align-center" >
                <v-img v-if="post.upload_url !== null && post.upload_url.includes('images')" contain :aspect-ratio="16/9" v-bind:href="'http://localhost:3000/' + post.upload_url" v-bind:src="'http://localhost:3000/' + post.upload_url" @click="dialogPost={post:[]}" ><!-- section image back du profil qui englobe l'avatar -->
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
        <v-card-subtitle align="end" class="caption font-italic">Posté le : {{ post.createdAt | moment('LL')}} </v-card-subtitle><!-- insert date à laquelle le user aura créé le commentaire -->
            </v-col>

        </v-row>
        <!-- FIN - Section message du user -->
        <v-divider></v-divider>

        <v-card-actions class="d-flex justify-end"  ><!-- section boutons card messages -->

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="deletePosts(post.id)"
                    ><v-icon size="20">mdi-close</v-icon>
                    </v-btn>
                </template>
                    <span>Effacer</span>
            </v-tooltip>

            <v-divider vertical></v-divider><!-- rendre visible que quand le user est celui qui a créé le commentaire -->

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" plain text x-small @click="setActiveUpdate(index)"
                    ><v-icon size="20">mdi-cog</v-icon>
                    </v-btn>
                </template>
                    <span>Mise à jour</span>
            </v-tooltip>

            <v-divider vertical></v-divider><!-- rendre visible que quand le user est celui qui a créé le commentaire -->

            <v-tooltip bottom>
                <template v-slot:activator="{ comment }">
                    <v-btn v-bind="comment" plain text x-small @click="setActiveComment(index)"
                    ><v-icon size="20">mdi-comment-text</v-icon>
                    </v-btn>
                </template>
                    <span>Commenter</span>
            </v-tooltip>

            <v-divider vertical></v-divider>
            <!-- bouton Like avec badge rouge compte les nombre de likes -->

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-badge overlap offset-x="15" offset-y="10" color="error">
                        <span slot="badge" >{{post.nbre_likes}}</span>
                        <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="postLike(post.id)"
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
                        <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="postDislike(post.id)"
                        ><v-icon size="20">mdi-thumb-down</v-icon>
                        </v-btn>
                    </v-badge>
                </template>
                    <span>J'aime pas</span>
            </v-tooltip>
            <!-- FIN - bouton disike avec badge rouge compte les nombre de dislikes -->
        </v-card-actions><!-- FIN - section boutons card messages -->

    <!-- Bloc création commentaire -->
        <v-divider></v-divider>
        <v-expand-transition v-model="isActive" v-if="isClicked === index"><!-- transition fait apparaitre section écrire commentaire sous la section boutons card-->
            <v-form v-model="validCom">
            <v-card-title class="transition-fast-in-fast-out v-card-text--reveal" ref="monNewComment">
                <v-row class="d-flex align-center">
                    <v-col cols="10" class="me-5"><!-- section création Post (message + upload multimedia) -->
                        <v-text-field class=" body-2" label="Votre commentaire ici" :rules="rulesCom" clearable v-model="contentCom" hide-details></v-text-field> 
                        <v-file-input class=" body-2" label="Upload Photo/Vidéo" v-model="uploadCom" type="file"></v-file-input>
                    </v-col><!-- FIN - section création Post (message + upload multimedia) -->
                </v-row>
                <v-btn color="error" height="40" class="me-4" text x-small v-on:click="publierCommentaire(post.id, profile.email)" :enabled="uploadCom" :disabled="!validCom">
                    <v-icon>mdi-send</v-icon>
                    Publier
                </v-btn>
            </v-card-title>
            </v-form>
        </v-expand-transition><!-- FIN - transition fait apparaitre section écrire commentaire sous la section boutons card-->

        <v-expand-transition v-model="isActiveUpdate" v-if="isClickedUpdate === index"><!-- transition fait apparaitre section update Post sous la section boutons card-->
            <v-form v-model="validUpdate">
            <v-card-title class="transition-fast-in-fast-out">
                <v-row class="d-flex align-center">
                    <v-col cols="10" class="me-5"><!-- section création Post (message + upload multimedia) -->
                        <v-text-field class=" body-2" label="Votre nouveau Message" :rules="rulesUpdate" v-model="contentUpdate" clearable hide-details></v-text-field> 
                        <v-file-input class=" body-2" label="Upload Photo/Vidéo" v-model="uploadUpdate" type="file"></v-file-input>
                    </v-col><!-- FIN - section création Post (message + upload multimedia) -->
                </v-row>
                <v-btn color="error" height="40" class="me-4" text x-small v-on:click="updaterPost(post.id)" :enabled="uploadCom" :disabled="!validUpdate">
                    <v-icon>mdi-send</v-icon>
                    Updater
                </v-btn>
            </v-card-title>
            </v-form>
        </v-expand-transition><!-- FIN - transition fait apparaitre section update Post sous la section boutons card-->
    <v-divider></v-divider>
        <!-- FIN - Bloc création commentaire -->
    <!-- Section timeline avec commentaires -->

    <!-- FIN - Section timeline avec commentaires -->
    </v-card>
</v-container>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Message',
  components:{
    
      
  },
  data: () => ({
    contentCom:'', 
    postid: '',
    uuid:'',
    role: '',
    uploadCom:[],

    contentUpdate:'', //pour updater le post
    uploadUpdate:[], //pour updater le post

    isClicked: '', //definit si bouton commentaire a été clické en lui assignant l'index du post pour le rendre unique au click et ne pas dévoiler toutes les zones commentaire de toutes les cartes
    isClickedUpdate:'',
    // count: 0,
    isActive: false, // définit si la zone de publication commentaire est visible ou non
    isActiveUpdate: false,

    post:'',
    nbre_dislikes:'',
    nbre_likes:'',

    dialogPost: {post:[]},

  // controle le nombre de caractères inscrits dans partie Votre nouveau message UPDATEPOST
  validCom: false,
  rulesCom: [
    v => ( v && v.length >=10) || 'Votre message doit faire au moins 10 caractères',
    ],  // FIN - controle le nombre de caractères inscrits dans partie Votre nouveau message UPDATEPOST
    
    validUpdate: false,
  rulesUpdate: [
    v => ( v && v.length >=10) || 'Votre message doit faire au moins 10 caractères',
    ],  // FIN - controle le nombre de caractères inscrits dans partie Votre nouveau message UPDATEPOST
  }),

  
//debut gestion axios + vuex
  computed: {
    ...mapState('getPosts', ['allPosts']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    ...mapState('likesDislikes', ['postLikesDislikes']),
  },
  mounted(){
   
    this.$store.dispatch('getPosts/getAllPostsAct') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    this.$store.dispatch('getProfile/getProfile') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
    // this.role = localStorage.getItem('role')// déclare role au montage = localstorage on s'en sert ensuite dans v-if pour cacher aux role 1
  },
//     updated(){
//     this.$store.dispatch('getPosts/getAllPostsAct') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
//     this.role = localStorage.getItem('role')// déclare role au montage = localstorage on s'en sert ensuite dans v-if pour cacher aux role 1
//   },

  methods:{
    setActiveComment(index) {
        // console.log(this.isActive)
        // console.log(index)
        this.isClicked = index
        
        // console.log('count avant'+this.count)
        
        if(this.isActive==false){
            this.isClicked = index
            this.isActive = !this.isActive
            // this.count +=1
            // console.log('count apres '+this.count)
            // console.log('active inversé ? '+this.isActive)
        }else{
            this.isClicked = ''
            this.isActive = !this.isActive
            // this.count -=1
            // console.log('count apres '+this.count)
            // console.log(' active true + count 0: '+this.isActive)
        }
        
        // if(this.isClicked == index) {
        //     this.count +=1
        // }if(this.count>1){
        //     this.isClicked = ''
        //     this.count=0
        // }
},
   setActiveUpdate(index) {
     
        this.isClickedUpdate = index
        
        if(this.isActiveUpdate==false){
            this.isClickedUpdate = index
            this.isActiveUpdate = !this.isActiveUpdate

        }else{
            this.isClickedUpdate = ''
            this.isActiveUpdate = !this.isActiveUpdate
   
        }
},
    async publierCommentaire(postId, email){
        // let PostId = document.getElementById("postich").innerHTML
        // this.postid = this.$refs.pich.innerHTML
        // alert('Post N°' + postid)
       await this.$store.dispatch('getPosts/createComments', {contentCom: this.contentCom, postid: postId, email: email, uploadCom: this.uploadCom}) //('nom module dans index.js/nom action liée'), payload
        // window.location.reload()
        await this.$store.dispatch('getPosts/getAllPostsAct')
        this.isClicked='' // on remet le statut du click a zero
        this.isActive = !this.isActive // on set la zone commentaire comme active = false
        this.uploadCom=[] // reset le formulaire un fois envoyé le post
        this.contentCom=''// reset le formulaire un fois envoyé le post
        
      },
      async updaterPost(postId){
        
        await this.$store.dispatch('getPosts/updatePosts', {contentUpdate: this.contentUpdate, postid: postId, uploadUpdate: this.uploadUpdate})
        await this.$store.dispatch('getPosts/getAllPostsAct')
        this.isClickedUpdate=''
        this.isActiveUpdate = !this.isActiveUpdate
        this.contentUpdate = ''
        this.uploadUpdate=[]
        

      },
        async deletePosts(postId){
        await this.$store.dispatch('getPosts/deletePosts', { postid: postId})
       this.$store.dispatch('getPosts/getAllPostsAct')

      },
      moderationPost(postId, uuid){
        this.$store.dispatch('moderation/moderationPost', {post_id: postId, uuid:uuid}) 
      },

    async postLike(postId){

        let post_like = await this.postLikesDislikes.filter(likes => likes.uuid ==this.profile.uuid && likes.post_id == postId)
        // console.log(post_like)

            if(!post_like[0]){
                // console.log('test 1 premier')
                await this.$store.dispatch('likesDislikes/postLikesDislikes', {postId: postId, likes: 1})
                await this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
                await this.$store.dispatch('getPosts/getAllPostsAct')
                await this.$store.dispatch('getProfile/getProfile') 
            }
            else if(post_like[0].likes == 1){
                // console.log('test 1')
                await this.$store.dispatch('likesDislikes/postLikesDislikes', {postId: postId, likes: 0})
                await this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
                await this.$store.dispatch('getPosts/getAllPostsAct')
                await this.$store.dispatch('getProfile/getProfile') 

            }else if(post_like[0].likes == 0){
                // console.log('test 1')
                await this.$store.dispatch('likesDislikes/postLikesDislikes', {postId: postId, likes: 1})
                await this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
                await this.$store.dispatch('getPosts/getAllPostsAct')
                await this.$store.dispatch('getProfile/getProfile') 

            }
      },

    async postDislike(postId){
        let post_dislike = await this.postLikesDislikes.filter(dislikes => dislikes.uuid ==this.profile.uuid && dislikes.post_id == postId)
        // console.log(post_dislike)

            if(!post_dislike[0]){
                // console.log('test dislike 1 premier')
                await this.$store.dispatch('likesDislikes/postLikesDislikes', {postId: postId, likes: -1})
                await this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
                await this.$store.dispatch('getPosts/getAllPostsAct')
                await this.$store.dispatch('getProfile/getProfile') 
            }
            else if(post_dislike[0].dislikes == 1 && post_dislike[0].likes == 0){
                // console.log('test 1 dislike')
                await this.$store.dispatch('likesDislikes/postLikesDislikes', {postId: postId, likes: 0})
                await this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
                await this.$store.dispatch('getPosts/getAllPostsAct')
                await this.$store.dispatch('getProfile/getProfile') 

            }else if(post_dislike[0].dislikes == 0){
                // console.log('test 1 dislike')
                await this.$store.dispatch('likesDislikes/postLikesDislikes', {postId: postId, likes: -1})
                await this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
                await this.$store.dispatch('getPosts/getAllPostsAct')
                await this.$store.dispatch('getProfile/getProfile') 

            }
            
        }




  },

//FIN gestion axios + vuex


}
</script>

<style>
/* .image{
    height: 10em;
    width: 10em;
}
.v-btn__content {
    display:flex;
    flex-direction:column;
} */



</style>
