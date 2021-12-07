<template>
    <v-main>
        <v-container fluid v-if="profile.role == 2">
            <v-card-title>Moderation</v-card-title>
  
            <v-tabs color="error" >
              <v-tabs-slider color="error"></v-tabs-slider>
              <v-tab>Posts</v-tab>
                <v-tab-item>
                  <MessagesModeration/>
                </v-tab-item>
              <v-tab>Commentaires</v-tab>
                <v-tab-item>
                  <CommentairesModeration/>
                </v-tab-item>
                <v-tab>Utilisateurs</v-tab>
                <v-tab-item>
                  <UsersModeration/>
                </v-tab-item>
            </v-tabs>
      
        </v-container>
    </v-main>
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
  },
  computed: {
    ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    ...mapState('moderation', ['getModerates']),
  },
    beforeMount(){
    // this.$store.dispatch('getUsers/getAllUsersAct') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    
    this.$store.dispatch('getProfile/getProfile') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
  
  }, 


}
</script>