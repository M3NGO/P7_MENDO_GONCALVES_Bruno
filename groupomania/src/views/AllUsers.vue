<template>
<v-container>
    <v-card-title>Liste de tous les utilisateurs</v-card-title><!-- titre de page-->
        <!-- card des users inscrits et actifs -->
        <v-card class="mx-auto mb-5" max-width="400" v-for="user in allActiveUsers" :key="user.id">
            <v-card-title>
                <v-list-item class="grow">
                    <v-btn icon class="rounded-xl">
                        <v-avatar color="grey" class="me-5" v-if="user.upload_url != null">
                            <v-img small v-bind:src="'http://localhost:3000/' + user.upload_url" ></v-img>
                        </v-avatar>
                        <!-- si pas photos d'avatar alors icone a la place-->
                        <v-avatar color="grey" class="me-5" v-if="user.upload_url == null">
                            <v-icon center color="white" >mdi-account-circle</v-icon>
                        </v-avatar>
                    </v-btn>
                    <v-list-item-title class="text-wrap">{{user.email}} 
                        <v-list-item-subtitle class="text-wrap">{{user.firstname}} {{user.lastname}}</v-list-item-subtitle>
                        <v-list-item-subtitle class="text-wrap"> {{user.poste}}</v-list-item-subtitle>
                    </v-list-item-title>
                </v-list-item>
            </v-card-title>
        
            <v-card-actions>
                <v-list-item class="grow">
                    <v-row align="center" justify="end">
                        <!-- bouton lock user (mise en moderation) -->
                        <v-btn icon class="rounded-xl" v-if="profile.role == 2"><!-- Lock user doit apparaitre que dans Liste tous les utilisateurs et uniquement pour moderateurs -->
                            <v-icon class="mr-1" v-on:click="blockUser(user.uuid, profile.uuid, user.email)" color="error">mdi-lock</v-icon><!-- bouton moderation user pour les moderateurs uniquement -->
                        </v-btn>
                        <span class="mr-1" color="primary" v-if="profile.role == 2">·</span>
                        <!-- FIN - bouton lock user (mise en moderation) -->

                        <v-icon class="mr-1" color="primary">mdi-email</v-icon>
                        <span class="subheading mr-2">{{user.nbre_posts}}</span> <!-- Nombre de Posts faits par le user-->
                        
                        <span class="mr-1" color="primary">·</span>
                        <v-icon class="mr-1" color="primary">mdi-comment-text</v-icon>
                        <span class="subheading">{{user.nbre_comments}}</span><!-- Nombre de Commentaires faits sur les posts du user-->
                    </v-row>
                </v-list-item>
            </v-card-actions>
        </v-card>
        <!-- FIN - card des users inscrits et actifs -->
</v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name:'AllUsers',
    
    methods:{
        async blockUser(user, moderator, email){
            let confirmation = confirm("Êtes-vous sûr(e) de vouloir bloquer l'utilisateur : \n\n"+email)
            if(confirmation){
                await this.$store.dispatch('moderation/blockUser', {uuid:user, moderator:moderator, email:email})
                await this.$store.dispatch('getUsers/getAllUsersAct') 
            }else{
                window.location.reload
            }
        },//FIN blockUser
    
    },//FIN Methods

    computed: {
    ...mapState('getUsers', ['allActiveUsers']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    },//FIN computed

    async mounted(){
        await this.$store.dispatch('getUsers/getAllUsersAct') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
        await this.$store.dispatch('getProfile/getProfile') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    },//FIN mounted
          
}//FIN EXPORT DEFAULT
</script>