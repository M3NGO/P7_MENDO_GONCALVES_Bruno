<template>
<v-container fluid>
    <v-card  class="mb-10" v-for="(post, index) in profile.post" :key="index" > <!-- carte contenant le Post uniquement basé sur le contenu du profil-->
        <video controls width="100%" heigth="auto" v-if="post.upload_url !== null && post.upload_url.includes('videos') " :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + post.upload_url" max-height="400"><!--Vidéo au cas où l'upload du user est une vidéo et non image--></video>
        <v-dialog v-model="dialogPost.post[index]"  width="1000" v-if="post.upload_url !== null && post.upload_url.includes('images')">
            <!-- image uploadée et donne droit a ouvrir dialog-->
            <template v-slot:activator="{ on, image }">
                <v-img class="rounded-t" v-bind="image" v-on="on" :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + post.upload_url"><!-- image uploadés par users --></v-img>
            </template>
            <!-- FIN - image uploadée et donne droit a ouvrir dialog-->
            <!-- image présente apres click sur image du Post-->
            <v-card class="d-flex align-center" >
                <v-img  contain :aspect-ratio="16/9" v-bind:src="'http://localhost:3000/' + post.upload_url" @click="dialogPost={post:[]}" ><!-- image uploadés par users dans dialog--></v-img>
            </v-card>
            <!-- FIN - image présente apres click sur image du Post-->
        </v-dialog>

        <v-divider></v-divider>

        <!-- Section message du user -->
        <v-row no-gutters>
            <!-- partie avatar du user qui post le message -->
            <v-col class="d-flex align-center justify-center" v-if="post.avatar != null"><!-- avatar uploadé par le user --> 
                <v-avatar color="grey"  rounded-pill border>
                    <v-img small v-bind:src="'http://localhost:3000/' + post.avatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col class="d-flex align-center justify-center" v-if="post.avatar == null"><!-- si pas d'avatar uploadé par le user alors icone -->
                <v-avatar color="grey"  rounded-pill border >
                    <v-icon center dark >mdi-account-circle</v-icon>
                </v-avatar>
            </v-col>
            <!-- FIN - partie avatar du user qui post le message -->
            <v-col cols="10" class="d-flex-column flex-wrap">
                <v-card-title class="body-1"> {{post.email}}</v-card-title>
                <v-card-text class="text-justify body-2" >{{post.content}}</v-card-text>
                <v-card-subtitle align="end" class="caption font-italic">Posté le : {{ post.createdAt | moment('LL')}} </v-card-subtitle><!-- insert date à laquelle le user aura créé le commentaire, utilisé moment pour mise en forme date -->
            </v-col>
        </v-row>
        <!-- FIN - Section message du user -->
        <v-divider></v-divider>

        <!-- section boutons card messages -->
        <v-card-actions class="d-flex justify-end">
            <!-- bouton effacer message -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="deletePosts(post.id)">
                        <v-icon size="20">mdi-close</v-icon>
                    </v-btn>
                </template>
                    <span>Effacer</span>
            </v-tooltip>
            <!-- FIN - bouton effacer message -->
            <v-divider vertical></v-divider>
            <!-- bouton Mise a jour commentaire -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" plain text x-small @click="setActiveUpdate(index)"
                    ><v-icon size="20">mdi-cog</v-icon>
                    </v-btn>
                </template>
                    <span>Mise à jour</span>
            </v-tooltip>
            <!-- FIN - bouton Mise a jour commentaire -->
            <v-divider vertical></v-divider>
            <!-- bouton Commenter le message -->
            <v-tooltip bottom>
                <template v-slot:activator="{ comment }">
                    <v-btn v-bind="comment" plain text x-small @click="setActiveComment(index)"
                    ><v-icon size="20">mdi-comment-text</v-icon>
                    </v-btn>
                </template>
                    <span>Commenter</span>
            </v-tooltip>
            <!-- FIN - bouton Commenter le message -->
            <v-divider vertical></v-divider>

            <!-- bouton Like avec badge rouge compte les nombre de likes -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-badge overlap offset-x="15" offset-y="10" color="error">
                        <span slot="badge" >{{post.nbre_likes}}</span>
                        <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="postLike(post.id)">
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
                        <v-btn v-bind="attrs" v-on="on" plain text x-small v-on:click="postDislike(post.id)">
                            <v-icon size="20">mdi-thumb-down</v-icon>
                        </v-btn>
                    </v-badge>
                </template>
                    <span>J'aime pas</span>
            </v-tooltip>
            <!-- FIN - bouton disike avec badge rouge compte les nombre de dislikes -->
        </v-card-actions>
        <!-- FIN - section boutons card messages -->

        <!-- Bloc création commentaire -->
        <v-divider v-if="isClicked === index"></v-divider>
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

        <v-divider v-if="isClickedUpdate === index"></v-divider>
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
        <!-- FIN - Bloc création commentaire -->

    </v-card>
</v-container>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Message',
    data: () => ({
        contentCom:'',//Déclaration contenu du commentaire a vide
        uploadCom:[],//Déclaration upload du commentaire a vide array
        postid: '',//Déclaration postid pour argument fonctions methods
        uuid:'',//Déclaration postid pour argument fonctions methods
        contentUpdate:'', //déclaration contentupdate vide pour updater le post
        uploadUpdate:[], //déclaration upload vide pour updater le post

        isClicked: '', //definit si bouton commentaire a été clické en lui assignant l'index du post pour le rendre unique au click et ne pas dévoiler toutes les zones commentaire de toutes les cartes
        isClickedUpdate:'',// definit si bouton update a été clické
        
        isActive: false, // définit si la zone de publication commentaire est visible ou non d'office non
        isActiveUpdate: false,// définit si la zone d'UPDATE est visible ou non d'office non

        post:'',//Déclaration post vide
        nbre_dislikes:'',//Déclaration nombre de dislikes vide
        nbre_likes:'',//Déclaration nombre de likes

        dialogPost: {post:[]},//déclaration v-model unique par post pour dialog images

        // controle le nombre de caractères inscrits dans partie COMMENTAIRE ET UPDATE POST
        validCom: false,// déclare que le commentaire de base est non valide car pas assez de caractères (désactive le bouton)
        rulesCom: [
            v => ( v && v.length >=10 || 'Votre commentaire doit faire au moins 10 caractères') 
            ],  // FIN - controle le nombre de caractères inscrits dans partie Votre nouveau commentaire
        
        validUpdate: false,// déclare que l'update est non valide car pas assez de caractères au départ (désactive le bouton)
        rulesUpdate: [
            v => ( v && v.length >=10 || 'Votre update doit faire au moins 10 caractères')
            ],  // FIN - controle le nombre de caractères inscrits dans partie Votre nouveau post updaté
        // FIN - controle le nombre de caractères inscrits dans partie COMMENTAIRE ET UPDATE POST

    }),//FIN - data

    
    //debut gestion axios + vuex
    computed: {
        ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
        ...mapState('likesDislikes', ['postLikesDislikes']),
    },//FIN - Computed

    async mounted(){
        await this.$store.dispatch('getProfile/getProfile') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
        await this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
    },// FIN mounted

    methods:{
        //setactiveComment pour assigner valeur actif ou non sur la card cliquée pour lexpansion comment
        setActiveComment(index) {
            this.isClicked = index
            
            if(this.isActive==false){
                this.isClicked = index
                this.isActive = !this.isActive
            }else{
                this.isClicked = ''
                this.isActive = !this.isActive
            }
        },//FIN SETACTIVE COMMENT

        //setactiveComment pour assigner valeur actif ou non sur la card cliquée pour lexpansion comment
        setActiveUpdate(index) {
            this.isClickedUpdate = index
            
            if(this.isActiveUpdate==false){
                this.isClickedUpdate = index
                this.isActiveUpdate = !this.isActiveUpdate
            }else{
                this.isClickedUpdate = ''
                this.isActiveUpdate = !this.isActiveUpdate
            }
        },//FIN SETACTIVEUPDATE

        async publierCommentaire(postId, email){
            await this.$store.dispatch('getPosts/createComments', {contentCom: this.contentCom, postid: postId, email: email, uploadCom: this.uploadCom}) //('nom module dans index.js/nom action liée'), payload
            await this.$store.dispatch('getProfile/getProfile')
            await this.$store.dispatch('getPosts/getAllPostsAct')
            //remise a zéro une fois le commentaire envoyé
            this.isClicked='' // on remet le statut du click a zero
            this.isActive = !this.isActive // on set la zone commentaire comme active = false
            this.uploadCom=[] // reset le formulaire un fois envoyé le post
            this.contentCom=''// reset le formulaire un fois envoyé le post
        },//FIN - publierCommentaire
        
        async updaterPost(postId){
            await this.$store.dispatch('getPosts/updatePosts', {contentUpdate: this.contentUpdate, postid: postId, uploadUpdate: this.uploadUpdate})
            await this.$store.dispatch('getProfile/getProfile')
            await this.$store.dispatch('getPosts/getAllPostsAct')
            //remise a zéro des variables updaterPost une fois updaté
            this.isClickedUpdate=''
            this.isActiveUpdate = !this.isActiveUpdate
            this.contentUpdate = ''
            this.uploadUpdate=[]
        },//FIN- updaterPost
        
        async deletePosts(postId){
            await this.$store.dispatch('getPosts/deletePosts', { postid: postId})
            await this.$store.dispatch('getProfile/getProfile')
            this.$store.dispatch('getPosts/getAllPostsAct')
        },//FIN deletePosts


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
        },//FIN - POSTLIKE

        async postDislike(postId){
            let post_dislike = await this.postLikesDislikes.filter(dislikes => dislikes.uuid ==this.profile.uuid && dislikes.post_id == postId)
            // console.log(post_dislike)
                if(!post_dislike[0]){
                    // console.log('test dislike 1 premier')
                    await this.$store.dispatch('likesDislikes/postLikesDislikes', {postId: postId, likes: -1})
                    await this.$store.dispatch('likesDislikes/getAllPostLikesDislikes')
                    await this.$store.dispatch('getPosts/getAllPostsAct')
                    await this.$store.dispatch('getProfile/getProfile') 
                }else if(post_dislike[0].dislikes == 1 && post_dislike[0].likes == 0){
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
                
        }//FIN POSTDISLIKES




    },//FIN Methods

}//FIN EXPORT DEFAULT
</script>

<style>

</style>
