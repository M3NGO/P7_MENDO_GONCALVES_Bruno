<template>
  <v-container fluid v-if="profile.role == 2">
    <v-card-title>Moderation</v-card-title><!-- titre de la page modération -->
      <!-- présentation des messages/Commentaires/users en moderation dans des onglets -->
      <v-tabs color="error" >
        <v-tabs-slider color="error"></v-tabs-slider>
          <v-tab>Posts</v-tab><!-- titre onglet-->
            <v-tab-item><!-- contenu onglet -->
              <MessagesModeration/>
            </v-tab-item>
          <v-tab>Commentaires</v-tab><!-- titre onglet-->
            <v-tab-item><!-- contenu onglet -->
              <CommentairesModeration/>
            </v-tab-item>
          <v-tab>Utilisateurs</v-tab><!-- titre onglet-->
            <v-tab-item><!-- contenu onglet -->
              <UsersModeration/>
            </v-tab-item>
      </v-tabs>
  </v-container>
</template>

<script>
import MessagesModeration from '@/components/ModerationComponents/Posts/MessagesModeration.vue'
import CommentairesModeration from '@/components/ModerationComponents/CommentairesModeration.vue'
import UsersModeration from '@/components/ModerationComponents/UsersModeration.vue'

import { mapState} from 'vuex'

export default {
  name:'Moderation',
  components:{
      MessagesModeration,
      CommentairesModeration,
      UsersModeration,
  },//FIN components importés dans la page moderation

  computed: {
    ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    ...mapState('moderation', ['getModerates']),
  },//FIN computed
    
  async mounted(){
    await this.$store.dispatch('getProfile/getProfile') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
  },//FIN mounted

}//FIN EXPORT DEFAULT
</script>