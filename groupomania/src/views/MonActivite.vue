<template>
    <v-container>
        <v-card-title>Mon activité</v-card-title><!-- titre de page -->
            <!-- Présentation du contenu de la page sous forme d'onglets-->
            <v-tabs color="error" >
                <v-tabs-slider color="error"></v-tabs-slider>
                <v-tab>Mes Posts</v-tab><!-- titre onglet -->
                    <v-tab-item><!-- contenu onglet -->
                    <MessagesMonActivite/>
                    </v-tab-item>
                <v-tab>Mes Commentaires</v-tab><!-- titre onglet -->
                    <v-tab-item><!-- contenu onglet -->
                    <CommentairesMonActivite/>
                    </v-tab-item>
            </v-tabs>
            <!-- FIN - Présentation du contenu de la page sous forme d'onglets-->
    </v-container>
</template>

<script>
import MessagesMonActivite from '@/components/MonActiviteComponents/MessagesMonActivite.vue'
import CommentairesMonActivite from '@/components/MonActiviteComponents/CommentairesMonActivite.vue'

export default {
  name:'MonActivite',
  components:{
    MessagesMonActivite,
    CommentairesMonActivite,
  },//FIN components
        
}//FIN EXPORT DEFAULT
</script>
