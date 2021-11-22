<template>
    <v-main>
        <v-container>
            <v-card-title>Liste de tous les utilisateurs</v-card-title>

            <v-card class="mx-auto" max-width="400">
            <v-card-title>
            
                <v-list-item class="grow">
                    <v-btn icon class="rounded-xl" link :to="{path:'/profil'}"><!-- click sur icone avatar et go to profil user -->
                <v-list-item-avatar color="grey darken-3" >
                    <v-img class="elevation-6" src="https://i.pravatar.cc/64" alt="avatar user"></v-img>
                </v-list-item-avatar>
                    </v-btn>
                <v-list-item-title>email@groupomania.com
                    <v-list-item-subtitle>Prénom Nom</v-list-item-subtitle>
                    <v-list-item-subtitle>Poste</v-list-item-subtitle>
                </v-list-item-title>
                </v-list-item>
            </v-card-title>
        
            <v-card-actions>
                <v-list-item class="grow">
                <v-row align="center" justify="end">

                    <v-btn icon class="rounded-xl"><!-- Delete user ne doit apparaitre que dans utilisateurs désinscrits et pour moderateurs -->
                        <v-icon @click="deleteUser" color="error">mdi-close-circle</v-icon><!-- a présenter que quand user est désactivé et uniquement pour les moderateurs-->
                    </v-btn>

                    <span class="mr-1" color="primary">·</span>

                    <v-btn icon class="rounded-xl"><!-- Lock user doit apparaitre que dans Liste tous les utilisateurs et uniquement pour moderateurs -->
                        <v-icon class="mr-1" @click="blockUser" color="error">mdi-lock</v-icon><!-- bouton moderation user pour les moderateurs uniquement -->
                    </v-btn>
                    <span class="mr-1" color="primary">·</span>

                    <v-icon class="mr-1" color="primary">mdi-email</v-icon>
                    <span class="subheading mr-2">256</span> <!-- Nombre de Posts faits par le user-->
                    
                    <span class="mr-1" color="primary">·</span>
                    <v-icon class="mr-1" color="primary">mdi-comment-text</v-icon>
                    <span class="subheading">45</span><!-- Nombre de Commentaires faits par le user-->
                </v-row>
                </v-list-item>
            </v-card-actions>
            </v-card>





        </v-container>
    </v-main>
</template>

<script>
export default {
  name:'AllUsers',
  components:{
    
  },
        
}
</script>