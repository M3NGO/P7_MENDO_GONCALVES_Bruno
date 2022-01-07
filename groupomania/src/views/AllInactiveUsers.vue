<template>
<v-container v-if="profile.role == 2">
    <v-card-title>Utilisateurs désinscrits</v-card-title><!-- titre de la page-->
    <!-- card user désinscrit -->
    <v-card class="mx-auto mb-5" max-width="400" v-for="user in allInactiveUsers" :key="user.id">
        <v-card-title>
            <v-list-item class="grow">
                <v-btn icon class="rounded-xl">
                    <v-avatar color="grey" class="me-5" v-if="user.upload_url != null">
                        <v-img small v-bind:src="'http://localhost:3000/' + user.upload_url" ></v-img>
                    </v-avatar>
                    <!-- si pas d'avatar uploadé par user alors icone avatar-->
                    <v-avatar color="grey" class="me-5" v-if="user.upload_url == null">
                        <v-icon center color="white" >mdi-account-circle</v-icon>
                    </v-avatar>
                </v-btn>
                <v-list-item-title class="text-wrap">{{user.email}}
                    <v-list-item-subtitle class="text-wrap">{{user.firstname}} {{user.lastname}}</v-list-item-subtitle>
                    <v-list-item-subtitle class="text-wrap">{{user.poste}}</v-list-item-subtitle>
                </v-list-item-title>
            </v-list-item>
        </v-card-title>
        
        <v-card-actions>
            <v-list-item class="grow">
                <v-row align="center" justify="end">
                    <v-btn icon class="rounded-xl" >
                        <v-icon v-on:click="deleteUser(user.uuid, user.email)" color="error">mdi-close-circle</v-icon>
                    </v-btn>

                    <span class="mr-1" color="primary">·</span>

                    <v-icon class="mr-1" color="primary">mdi-email</v-icon>
                    <span class="subheading mr-2">{{user.nbre_posts}}</span> <!-- Nombre de Posts faits par le user-->
                    
                    <span class="mr-1" color="primary">·</span>
                    <v-icon class="mr-1" color="primary">mdi-comment-text</v-icon>
                    <span class="subheading">{{user.nbre_comments}}</span><!-- Nombre de Commentaires faits sur les posts du user-->
                </v-row>
            </v-list-item>
        </v-card-actions>
    </v-card>
    <!-- FIN - card user désinscrit -->
</v-container>
</template>

<script>
import{ mapState} from 'vuex'

export default {
    name:'AllInactiveUsers',

    computed: {
        ...mapState('getUsers', ['allInactiveUsers']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
        ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    },//FIN computed

    async mounted(){
        await this.$store.dispatch('getUsers/getAllInactiveUsers') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
        await this.$store.dispatch('getProfile/getProfile') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    },//FIN mounted
      
    methods:{
        async deleteUser(user, email){
            let confirmation = confirm("Êtes-vous sûr(e) de vouloir supprimer définitivement l'utilisateur : "+email+ "?\n\nTout le contenu (posts / commentaires / images / vidéos) de cet utilisateur sera définitivement irrécupérable")
            if(confirmation){
                await this.$store.dispatch('moderation/deleteUser',{user:user})
                await this.$store.dispatch('getUsers/getAllInactiveUsers')
            }else{
                window.location.reload
            }
        },//FIN deleteUser

        async unblockUser(user, moderator, email){
            let confirmation = confirm("Êtes-vous sûr(e) de vouloir débloquer l'utilisateur : \n\n"+email)
                if(confirmation){
                    await this.$store.dispatch('moderation/unblockUser', {uuid:user, moderator:moderator, email:email})
                    await this.$store.dispatch('getUsers/getAllInactiveUsersAct')
                }else{
                    window.location.reload
                }
        },//FIN unblockUser
    }//FIN methods
      
}//FIN EXPORT DEFAULT
</script>