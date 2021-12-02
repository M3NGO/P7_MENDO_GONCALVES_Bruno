<template>
  <v-timeline align-top dense class="me-3"><!-- timeline des commentaires -->
    <v-timeline-item><!-- créé l'item commentaire et place sur timeline -->
      <template  v-slot:icon><!-- icone sur la timeline a gauche du commentaire ajouter l'avatar de la personne qui commente-->
        <v-avatar>
          <img src="https://i.pravatar.cc/64">
        </v-avatar>
      </template><!-- FIN - icone sur la timeline a gauche du commentaire ajouter l'avatar de la personne qui commente-->

      <v-card class="d-flex flex-column elevation-2"><!-- créé carte commentaire accolée a la timeline -->
      <v-img v-if="commentaire.upload_url !== null" :aspect-ratio="16/9" src="@/assets/Logo_Groupomania.png" max-height="300"></v-img><!-- section image back du profil qui englobe l'avatar -->
        <v-card-title class="body-2">{{commentaire.email}}</v-card-title><!-- insert l'email user qui commente en tant que titre commentaire-->
        <v-card-text class="caption text-justify">{{ commentaire.content }}</v-card-text>
        <v-card-subtitle align="end" class="caption font-italic">Publié {{ commentaire.updatedAt}}</v-card-subtitle><!-- insert date à laquelle le user aura créé le commentaire -->
        
        <v-card-actions class="d-flex justify-end flex-wrap" ><!-- section boutons card messages -->
            <v-tooltip bottom v-if="profile.role == 2"><!-- rendre visible que quand le role user est 2 -->
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" plain text x-small 
                    ><v-icon size="15">mdi-alert-circle</v-icon>
                    </v-btn>
                </template>
                    <span>Modération</span>
            </v-tooltip><!-- rendre visible que quand le role user est 2 -->



            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" plain text x-small 
                    ><v-icon size="15">mdi-close</v-icon>
                    </v-btn>
                </template>
                    <span>Effacer</span>
            </v-tooltip>

            

            <v-tooltip bottom><!-- rendre visible que quand le user est celui qui a créé le commentaire -->
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" plain text x-small @click="updateComment=true"
                    ><v-icon size="15">mdi-cog</v-icon>
                    </v-btn>
                </template>
                    <span>Mise à jour</span>
            </v-tooltip>
    
           
            <!-- bouton Like avec badge rouge compte les nombre de likes -->

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-badge overlap offset-x="15" offset-y="10" color="error" content="10">
                        <v-btn v-bind="attrs" v-on="on" plain text x-small
                        ><v-icon size="15">mdi-thumb-up</v-icon>
                        </v-btn>
                    </v-badge>
                </template>
                    <span>J'aime</span>
            </v-tooltip>

            

            <!-- FIN - bouton Like avec badge rouge compte les nombre de likes -->
            
            <!-- bouton dislike avec badge rouge compte les nombre de dislikes -->


            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-badge overlap offset-x="15" offset-y="10" color="error" content="8">
                        <v-btn v-bind="attrs" v-on="on" plain text x-small 
                        ><v-icon size="15">mdi-thumb-down</v-icon>
                        </v-btn>
                    </v-badge>
                </template>
                    <span>J'aime</span>
            </v-tooltip>
            <!-- FIN - bouton disike avec badge rouge compte les nombre de dislikes -->
        </v-card-actions><!-- FIN - section boutons card messages -->
        
        <v-expand-transition><!-- transition fait apparaitre section update commentaire sous la section boutons card-->
            <v-card-title v-if="updateComment" class="transition-fast-in-fast-out">
                <v-row class="d-flex align-center">
                    <v-col cols="10" class="me-5"><!-- section création Post (message + upload multimedia) -->
                        <v-text-field class=" body-2" label="Votre nouveau commentaire ici" :rules="rules" hide-details="auto" ></v-text-field> 
                        <v-file-input class=" body-2" label="Upload Photo/Vidéo"></v-file-input>
                    </v-col><!-- FIN - section création Post (message + upload multimedia) -->
                </v-row>
                <v-btn color="error" height="40" class="me-4" text x-small @click="updateComment = false">
                    <v-icon>mdi-send</v-icon>
                    Updater
                </v-btn>
            </v-card-title>
        </v-expand-transition><!-- FIN - transition fait apparaitre section update commentaire sous la section boutons card-->

      </v-card><!-- FIN - carte commentaire accolée a la timeline -->
    </v-timeline-item><!-- FIN - créé l'item commentaire et place sur timeline -->
  </v-timeline><!-- FIN - timeline des commentaires -->
</template>
 
  


<script>
export default {
  name: 'Commentaires',
  props: {
   commentaire: {
        type: Object,
        default: null
   },
   profile:{
        type: Object,
        default: null
   }
  },



  data: () => ({
  updateComment: false, //pour faire disparaitre section update commentaire au click sur bouton updater
  // controle le nombre de caractères inscrits dans partie Votre nouveau commentaire
  rules: [
    value => (value && value.length >= 10 ) || 'Votre commentaire doit faire au moins 10 caractères',
    ],  // FIN - controle le nombre de caractères inscrits dans partie Votre nouveau commentaire
  }),
}
</script>

<style>
/* .image{
    height: 10em;
    width: 10em;
} */
/* .v-timeline-item__divider{
   justify-content: left
} */




</style>
