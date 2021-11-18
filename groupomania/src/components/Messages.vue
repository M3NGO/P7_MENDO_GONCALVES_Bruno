<template>
    <v-card width="800" class="mb-10"><!-- carte contenant le Post + commentaires -->
        <v-img src="@/assets/Logo_Groupomania.png" max-height="400"><!-- section image back du profil qui englobe l'avatar -->
            <v-row align="end" class="fill-height">          
                <v-col align-self="end" class="pa-0 ms-5" cols="12">
                    <v-avatar class="profile" color="grey" size="164" rounded-pill border>
                    <v-img small src="https://i.pravatar.cc/64"></v-img>
                    </v-avatar>
                </v-col>
            </v-row>
        </v-img> <!-- FIN section image back du profil qui englobe l'avatar -->
        <v-divider></v-divider>

        <!-- Section message du user -->
        <v-card-text>Ici le message du user Lambda!</v-card-text>
        <v-card-subtitle align="end">Publié le: 15/01/2021</v-card-subtitle><!-- insert date à laquelle le user aura créé le commentaire -->
        <!-- FIN - Section message du user -->
        <v-divider></v-divider>

        <v-card-actions class="d-flex justify-end"><!-- section boutons card messages -->

            <v-divider vertical></v-divider><!-- rendre visible que quand le role user est 2 -->
                <v-btn plain text max-width="150" @click="chose"><!-- rendre visible que quand le role user est 2 -->
                    <v-icon>mdi-alert-circle</v-icon>Modération<!-- rendre visible que quand le role user est 2 -->
                </v-btn><!-- rendre visible que quand le role user est 2 -->
            <v-divider vertical></v-divider><!-- rendre visible que quand le role user est 2 -->

            <v-btn plain text max-width="150" @click="delete_comment"><!-- delete commentaire -->
                <v-icon>mdi-close</v-icon>Effacer
            </v-btn><!-- FIN - delete commentaire -->

            <v-divider vertical></v-divider><!-- rendre visible que quand le user est celui qui a créé le commentaire -->
                <v-btn plain text max-width="150" @click="updatePost=true"><!-- rendre visible que quand le user est celui qui a créé le commentaire -->
                    <v-icon>mdi-cog</v-icon>Update<!-- rendre visible que quand le user est celui qui a créé le commentaire -->
                </v-btn><!-- rendre visible que quand le user est celui qui a créé le commentaire -->
            <v-divider vertical></v-divider><!-- rendre visible que quand le user est celui qui a créé le commentaire -->



            <v-card-actions><!-- bouton commenter pour commenter le message-->
                <v-btn plain text max-width="150" @click="reveal=true">
                    <v-icon>mdi-comment-text</v-icon>Commenter
                </v-btn>
            </v-card-actions><!-- FIN - bouton commenter pour commenter le message-->

            <v-divider vertical></v-divider>
            <!-- bouton Like avec badge rouge compte les nombre de likes -->
            <v-badge overlap bordered offset-x="30" offset-y="15" color="error" content="10">
                <v-btn plain max-width="150">
                    <v-icon>mdi-thumb-up</v-icon>J'aime
                </v-btn>
            </v-badge>
            <!-- FIN - bouton Like avec badge rouge compte les nombre de likes -->
            <v-divider vertical></v-divider>
            <!-- bouton dislike avec badge rouge compte les nombre de dislikes -->
            <v-badge overlap bordered offset-x="30" offset-y="15" color="error" content="8">
                <v-btn plain max-width="150">
                    <v-icon>mdi-thumb-down</v-icon>J'aime pas
                </v-btn>
            </v-badge>
            <!-- FIN - bouton disike avec badge rouge compte les nombre de dislikes -->
        </v-card-actions><!-- FIN - section boutons card messages -->
    <!-- Bloc création commentaire -->
        <v-divider></v-divider>
        <v-expand-transition><!-- transition fait apparaitre section écrire commentaire sous la section boutons card-->
            <v-card-title v-if="reveal" class="transition-fast-in-fast-out v-card-text--reveal">
                <v-row class="d-flex align-center">
                    <v-col cols="10" class="me-5"><!-- section création Post (message + upload multimedia) -->
                        <v-text-field label="Votre commentaire ici" :rules="rules" hide-details="auto"></v-text-field> 
                        <v-file-input label="Upload Photo/Vidéo"></v-file-input>
                    </v-col><!-- FIN - section création Post (message + upload multimedia) -->
                </v-row>
                <v-btn color="error" height="40" class="me-4" small @click="reveal = false">
                    <v-icon>mdi-send</v-icon>
                    Publier
                </v-btn>
            </v-card-title>
        </v-expand-transition><!-- FIN - transition fait apparaitre section écrire commentaire sous la section boutons card-->

        <v-expand-transition><!-- transition fait apparaitre section update Post sous la section boutons card-->
            <v-card-title v-if="updatePost" class="transition-fast-in-fast-out">
                <v-row class="d-flex align-center">
                    <v-col cols="10" class="me-5"><!-- section création Post (message + upload multimedia) -->
                        <v-text-field label="Votre nouveau Message" :rules="rules" hide-details="auto"></v-text-field> 
                        <v-file-input label="Upload Photo/Vidéo"></v-file-input>
                    </v-col><!-- FIN - section création Post (message + upload multimedia) -->
                </v-row>
                <v-btn color="error" height="40" class="me-4" small @click="updatePost = false">
                    <v-icon>mdi-send</v-icon>
                    Updater
                </v-btn>
            </v-card-title>
        </v-expand-transition><!-- FIN - transition fait apparaitre section update Post sous la section boutons card-->
    <v-divider></v-divider>
        <!-- FIN - Bloc création commentaire -->
    <!-- Section timeline avec commentaires -->
    <Commentaires/>
    <!-- FIN - Section timeline avec commentaires -->
    </v-card>

</template>

<script>
import Commentaires from '@/components/Commentaires.vue'


export default {
  name: 'Message',
  components:{
      Commentaires,
      
  },
  data: () => ({
 
  reveal: false, // reveal false pour faire disparaitre section écrire commentaire au dessus de timeline commentaires
  updatePost: false, //pour faire disparaitre section update post au click sur bouton updater
  // controle le nombre de caractères inscrits dans partie Votre nouveau message UPDATEPOST
  rules: [
    value => (value && value.length >= 10 ) || 'Votre post doit faire au moins 10 caractères',
    ],  // FIN - controle le nombre de caractères inscrits dans partie Votre nouveau message UPDATEPOST
  }),
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
