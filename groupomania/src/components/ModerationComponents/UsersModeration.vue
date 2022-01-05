<template>
    <v-container fluid>
        <v-card class="mx-auto mb-5" max-width="400" v-for="user in allUsersModeration" :key="user.id">
            <v-card-title>
            
                <v-list-item class="grow">
                    <v-btn icon class="rounded-xl">
                        <v-avatar color="grey" class="me-5" v-if="user.upload_url != null">
                            <v-img small v-bind:src="'http://localhost:3000/' + user.upload_url" ></v-img>
                        </v-avatar>
                    
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
                        <!-- bouton delete user delete définitivement user et son contenu -->
                        <v-btn icon class="rounded-xl" >
                            <v-icon v-on:click="deleteUser(user.uuid, user.email)" color="error">mdi-close-circle</v-icon>
                        </v-btn>
                        <!--FIN - bouton delete user delete définitivement user et son contenu -->
                        <span class="mr-1" color="primary">·</span>

                        <!-- Bouton pour unlocker user qui est en modération -->
                        <v-btn icon class="rounded-xl">
                            <v-icon class="mr-1" v-on:click="unblockUser(user.uuid, profile.uuid, user.email)" color="green">mdi-lock-check</v-icon>
                        </v-btn>
                        <!-- FIN - Bouton pour unlocker user qui est en modération -->
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
    </v-container>
</template>

<script>
import{ mapState} from 'vuex'

export default {
    name:'AllModeratedUsers',

    computed: {
        ...mapState('moderation', ['allUsersModeration']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    },//FIN computed
    async mounted(){
        await this.$store.dispatch('moderation/getModeratedUsers') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    },//FIN mounted
      
    methods:{
        deleteUser(user, email){
            let confirmation = confirm("Êtes-vous sûr(e) de vouloir supprimer définitivement l'utilisateur : "+email+ " ? tout son contenu sera irrécupérable")
                if(confirmation){
                    this.$store.dispatch('moderation/deleteUser',{user:user})
                }else{
                    window.location.reload
                }
        },//FIN DELETEUSER

        unblockUser(user, moderator, email){
            let confirmation = confirm("Êtes-vous sûr(e) de vouloir débloquer l'utilisateur : "+email)
                if(confirmation){
                    this.$store.dispatch('moderation/unblockUser', {uuid:user, moderator:moderator, email:email})
                }else{
                    window.location.reload
                }
        },//FIN UNLOCKUSER
    }//FIN METHODS
}//FIN EXPORT DEFAULT
</script>