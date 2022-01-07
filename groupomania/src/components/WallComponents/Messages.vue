<template>
<v-container  fluid>
    <v-card  class="mb-10" v-for="(post, index) in allPosts" :key="index" > <!-- carte contenant le Post + commentaires -->
        <!-- balise video pour les cas où les users uploadent des videos -->
        <video controls width="100%" v-if=" post.upload_url !== null && post.upload_url.includes('videos') " :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + post.upload_url" max-height="400"></video> 
        
        <v-dialog v-model="dialogPost.post[index]" width="100%" v-if="post.upload_url !== null  && post.upload_url.includes('images')">
            <template v-slot:activator="{ on, image }"><!-- rend la balise img activateur pour le lancement du dialog image-->
                <v-img class="rounded-t" v-bind="image" v-on="on"  :aspect-ratio="16/9"  v-bind:src="'http://localhost:3000/' + post.upload_url"></v-img>
            </template>
            <v-card  class="d-flex align-center" >
                <v-img  :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + post.upload_url" @click="dialogPost={post:[]}"></v-img>
            </v-card>
        </v-dialog>
        
        <!-- Section message du user -->
        <v-row no-gutters>
            <!-- section avatar du user qui créé le post -->
            <v-col class="d-flex align-center justify-center" v-if="post.avatar != null">          
                
                    <v-avatar color="grey" rounded-pill border>
                    <v-img small v-bind:src="'http://localhost:3000/' + post.avatar"></v-img>
                    </v-avatar>

               
            </v-col>
            <v-col class="d-flex align-center justify-center" v-if="post.avatar == null"> 
                    <v-avatar color="grey" rounded-pill border >
                    <v-icon center dark >mdi-account-circle</v-icon>
                    </v-avatar>
            </v-col>
            <!-- FIN - section avatar du user qui créé le post -->

            <!-- section contenu message + identification du user + date-->
            <v-col cols="10" class="d-flex-column flex-wrap">
                <v-card-title class="body-1"> {{post.email}}</v-card-title>
                <v-card-text class="text-justify body-2" v-if="post.content != 'null' ">{{post.content}}</v-card-text> <!-- v-if="post.content != 'null' " au cas où un user upload image sans contenu on affiche pas-->
                <v-card-subtitle align="end" class="caption font-italic" > Posté le: {{ post.createdAt | moment('LL')}} </v-card-subtitle><!-- insert date à laquelle le user aura créé le commentaire avec moment-->
            </v-col>
            <!-- FIN - section contenu message + identification du user + date-->

        </v-row>
        <!-- FIN - Section message du user -->
        <v-divider></v-divider>

        <!-- section boutons card messages -->
        <v-card-actions class="d-flex justify-end"  >
            <v-tooltip bottom v-if="profile.role === 2"><!-- rendre visible que quand le role user est 2 -->
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="moderationPost(post.id, profile.uuid)" aria-label="Modération">
                        <v-icon size="20" color="error">mdi-alert-circle</v-icon>
                    </v-btn>
                </template>
                    <span>Modération</span>
            </v-tooltip>

            <v-divider v-show="profile.role == 2" vertical></v-divider><!-- rendre visible que quand le role user est 2 -->

            <v-tooltip bottom><!-- rend visible que quand le uuid profil == uuid du message -->
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-show="profile.uuid === post.uuid" v-bind="attrs" v-on="on" plain text x-small v-on:click="deletePosts(post.id)" aria-label="Effacer message">
                        <v-icon size="20">mdi-close</v-icon>
                    </v-btn>
                </template>
                    <span>Effacer</span>
            </v-tooltip>

            <v-divider v-show="profile.uuid === post.uuid" vertical></v-divider><!-- rendre visible que quand le user est celui qui a créé le commentaire -->

            <v-tooltip bottom><!-- rend visible que quand le uuid profil == uuid du message -->
                <template v-slot:activator="{ attrs }">
                    <v-btn v-show="profile.uuid === post.uuid" v-bind="attrs"  plain text x-small @click="setActiveUpdate(index)" aria-label="Mettre a jour message">
                        <v-icon size="20">mdi-cog</v-icon>
                    </v-btn>
                </template>
                    <span>Mise à jour</span>
            </v-tooltip>

            <v-divider v-if="profile.uuid === post.uuid" vertical></v-divider><!-- rendre visible que quand le user est celui qui a créé le commentaire -->

            <v-tooltip bottom >
                <template v-slot:activator="{ comment }">
                    <v-btn  v-bind="comment"  plain text x-small  @click="setActiveComment(index)" aria-label="Commenter le message">
                        <v-icon size="20">mdi-comment-text</v-icon>
                    </v-btn>
                </template>
                    <span>Commenter</span>
            </v-tooltip>

            <v-divider vertical></v-divider>

            <!-- bouton Like avec badge rouge compte les nombre de likes -->
            <v-tooltip bottom >
                <template v-slot:activator="{ on, like }" >
                    <v-badge  overlap offset-x="15" offset-y="10" color="error" >
                        <span slot="badge" >{{post.nbre_likes}}</span>
                        <v-btn  v-bind="like" v-on="on" plain text x-small v-on:click="postLike(post.id)" aria-label="J'aime">
                            <v-icon size="20">mdi-thumb-up</v-icon>
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
                        <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="postDislike(post.id)" aria-label="Je n'aime pas">
                            <v-icon size="20">mdi-thumb-down</v-icon>
                        </v-btn>
                    </v-badge>
                </template>
                    <span>J'aime pas</span>
            </v-tooltip>
            <!-- FIN - bouton disike avec badge rouge compte les nombre de dislikes -->

        </v-card-actions>
        <!-- FIN - section boutons card messages -->
        <v-divider v-if="isClicked === index"></v-divider>

        <!-- transition fait apparaitre section écrire commentaire sous la section boutons card-->
        <v-expand-transition v-model="isActive" v-if="isClicked === index">
            <v-form v-model="validCom">
                <v-card-title class="transition-fast-in-fast-out v-card-text--reveal">
                    <v-row class="d-flex align-center">
                        <v-col cols="10" class="me-5"  ><!-- section création Post (message + upload multimedia) -->
                            <v-text-field class=" body-2" label="Votre commentaire ici" :rules="rulesComment" clearable v-model="contentCom" hide-details></v-text-field> 
                            <v-file-input class=" body-2" label="Upload Photo/Vidéo" v-model="uploadCom" type="file"></v-file-input>
                        </v-col><!-- FIN - section création Post (message + upload multimedia) -->
                    </v-row>
                    <v-btn color="error" height="40" class="me-4" text x-small v-on:click="publierCommentaire(post.id, profile.email)" :enabled="uploadCom" :disabled="!validCom" aria-label="Publier">
                        <v-icon>mdi-send</v-icon>
                        Publier
                    </v-btn>
                </v-card-title>
            </v-form>
        </v-expand-transition>
        <!-- FIN - transition fait apparaitre section écrire commentaire sous la section boutons card-->
        <v-divider v-if="isClickedUpdate === index"></v-divider>
        
        <!-- transition fait apparaitre section update Post sous la section boutons card-->
        <v-expand-transition v-model="isActiveUpdate" v-if="isClickedUpdate === index">
            <v-form v-model="validUpdate">
                <v-card-title class="transition-fast-in-fast-out">
                    <v-row class="d-flex align-center">
                        <v-col cols="10" class="me-5"><!-- section création Post (message + upload multimedia) -->
                            <v-text-field class=" body-2" label="Votre nouveau Message" :rules="rulesUpdate" v-model="contentUpdate" clearable hide-details></v-text-field> 
                            <v-file-input class=" body-2" label="Upload Photo/Vidéo" v-model="uploadUpdate" type="file"></v-file-input>
                        </v-col><!-- FIN - section création Post (message + upload multimedia) -->
                    </v-row>
                    <div>
                    <v-btn color="error" height="40" class="me-4" text x-small v-on:click="updaterPost(post.id)" :disabled="!validUpdate" aria-label="Mettre à jour message">
                        <v-icon>mdi-send</v-icon>
                        Updater
                    </v-btn>
                    </div>
                </v-card-title>
            </v-form>
        </v-expand-transition>
        <!-- FIN - transition fait apparaitre section update Post sous la section boutons card-->
        <v-divider></v-divider>
        

        <!-- Section timeline avec commentaires -->
        <div v-for="commentaire in post.comment" :key="commentaire.id" >
            <Commentaires :commentaire="commentaire" :role="role" :profile="profile"/>
        </div>
        <!-- FIN - Section timeline avec commentaires -->
    </v-card>
</v-container>
</template>

<script>
import Commentaires from '@/components/WallComponents/Commentaires.vue'
import { mapState } from 'vuex'

export default {
    name: 'Message',
    components:{
        Commentaires, 
    },//FIN import component Commentaires
    data: () => ({
        contentCom:'',//déclaration ContentCommentaire vide
        postid: '',// déclaration postID vide pour fonctions
        uuid:'',//déclaration uuid vide pour fonctions
        role: '', //déclaration role vide pour filtres
        uploadCom:[],//déclaration uploadCom vide pour upload fichiers commentaires

        contentUpdate:'', //pour updater le post
        uploadUpdate:[], //pour updater le post

        isClicked: '', //definit si bouton commentaire a été clické en lui assignant l'index du post pour le rendre unique au click et ne pas dévoiler toutes les zones commentaire de toutes les cartes
        isClickedUpdate:'',

        isActive: false, // définit si la zone de publication commentaire est visible ou non
        isActiveUpdate: false,// définit si la zone d'update est visible ou non
        
        post:'',//déclaration post vide
        nbre_dislikes:'',//déclaration nombre de dislikes vide
        nbre_likes:'',//déclaration nombre de likes vide

        dialogPost: {post:[]},//déclaration v-model unique par post pour dialogPost images
    
        // controle le nombre de caractères inscrits dans partie Votre nouveau message
        validCom: false,
        rulesComment: [
            v => ( v && v.length >=10) || 'Votre message doit faire au moins 10 caractères',
            ],  // FIN - controle le nombre de caractères inscrits dans partie Votre nouveau message
        //controle le nombre de caractères inscrits dans partie update post
            validUpdate: false,
        rulesUpdate:[
            v => ( v && v.length >=10) || 'Votre message doit faire au moins 10 caractères',
            ], 
        //FIN - controle le nombre de caractères inscrits dans partie update post
    }),//FIN - data

    computed: {
    ...mapState('getPosts', ['allPosts']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    ...mapState('likesDislikes', ['postLikesDislikes']),
    },//FIN - computed

    async mounted(){
        await this.$store.dispatch('getProfile/getProfile') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
        await this.$store.dispatch('getPosts/getAllPostsAct') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
        await this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
    },

    methods:{
        //setActiveComment definit si l'icone commentaires a été cliqué ou non afin de ne pas ouvrir tous les expand panel d'un coup sur un click unique
        setActiveComment(index) {
            this.isClicked = index
            
            if(this.isActive==false){
                this.isClicked = index
                this.isActive = !this.isActive
            }else{
                this.isClicked = ''
                this.isActive = !this.isActive
            }
        },//FIN - setActiveComment

        //setActiveUpdate definit si l'icone update a été cliqué ou non afin de ne pas ouvrir tous les expand panel d'un coup sur un click unique
        setActiveUpdate(index) {
        this.isClickedUpdate = index
        if(this.isActiveUpdate==false){
                this.isClickedUpdate = index
                this.isActiveUpdate = !this.isActiveUpdate
            }else{
                this.isClickedUpdate = ''
                this.isActiveUpdate = !this.isActiveUpdate
            }
        },//FIN - SetActiveUpdate

        async publierCommentaire(postId, email){
            await this.$store.dispatch('getPosts/createComments', {contentCom: this.contentCom, postid: postId, email: email, uploadCom: this.uploadCom}) //('nom module dans index.js/nom action liée'), payload
            await this.$store.dispatch('getPosts/getAllPostsAct')
            //remise a zéro des variables
            this.isClicked='' // on remet le statut du click a zero
            this.isActive = !this.isActive // on set la zone commentaire comme active = false
            this.uploadCom=[] // reset le formulaire un fois envoyé le post
            this.contentCom=''// reset le formulaire un fois envoyé le post
        },//FIN - publierCommentaire

        async updaterPost(postId){
            await this.$store.dispatch('getPosts/updatePosts', {contentUpdate: this.contentUpdate, postid: postId, uploadUpdate: this.uploadUpdate})
            await this.$store.dispatch('getPosts/getAllPostsAct')
            //remise a zéro des variables
            this.isClickedUpdate=''
            this.isActiveUpdate = !this.isActiveUpdate
            this.contentUpdate = ''
            this.uploadUpdate=[]
        },//FIN updatePost

        async deletePosts(postId){
            await this.$store.dispatch('getPosts/deletePosts', { postid: postId})
        this.$store.dispatch('getPosts/getAllPostsAct')
        },//FIN - deletepost

        async moderationPost(postId, uuid){
            await this.$store.dispatch('moderation/moderationPost', {post_id: postId, uuid:uuid})
            await this.$store.dispatch('getPosts/getAllPostsAct')
            await this.$store.dispatch('moderation/getModeratedPosts')
        },//FIN moderationPost
        
        async postLike(postId){
            let post_like = await this.postLikesDislikes.filter(likes => likes.uuid ==this.profile.uuid && likes.post_id == postId)
            if(!post_like[0]){
                // console.log('test 1 premier')
                await this.$store.dispatch('likesDislikes/postLikesDislikes', {postId: postId, likes: 1})
                await this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
                await this.$store.dispatch('getPosts/getAllPostsAct')
            }else if(post_like[0].likes == 1){
                // console.log('test 1')
                await this.$store.dispatch('likesDislikes/postLikesDislikes', {postId: postId, likes: 0})
                await this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
                await this.$store.dispatch('getPosts/getAllPostsAct')
            }else if(post_like[0].likes == 0){
                // console.log('test 1')
                await this.$store.dispatch('likesDislikes/postLikesDislikes', {postId: postId, likes: 1})
                await this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
                await this.$store.dispatch('getPosts/getAllPostsAct')
            }
        },//FIN - POSTLIKE

        async postDislike(postId){
            let post_dislike = await this.postLikesDislikes.filter(dislikes => dislikes.uuid ==this.profile.uuid && dislikes.post_id == postId)
            if(!post_dislike[0]){
                // console.log('test dislike 1 premier')
                await this.$store.dispatch('likesDislikes/postLikesDislikes', {postId: postId, likes: -1})
                await this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
                await this.$store.dispatch('getPosts/getAllPostsAct')
            }else if(post_dislike[0].dislikes == 1 && post_dislike[0].likes == 0){
                // console.log('test 1 dislike')
                await this.$store.dispatch('likesDislikes/postLikesDislikes', {postId: postId, likes: 0})
                await this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
                await this.$store.dispatch('getPosts/getAllPostsAct')
            }else if(post_dislike[0].dislikes == 0){
                // console.log('test 1 dislike')
                await this.$store.dispatch('likesDislikes/postLikesDislikes', {postId: postId, likes: -1})
                await this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
                await this.$store.dispatch('getPosts/getAllPostsAct')
            }   
        },//FIN - POSTDISLIKE

    },//fin methods
}//FIN EXPORT DEFAULT
</script>

<style>

</style>
