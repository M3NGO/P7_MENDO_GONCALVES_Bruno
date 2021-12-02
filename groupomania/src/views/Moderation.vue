<template>
    <v-main>
        <v-container v-if="profile.role == 2">
            <v-card-title>Moderation</v-card-title>
            <Posts/>
        </v-container>
    </v-main>
</template>

<script>
import Posts from '@/components/WallComponents/Posts.vue'
import { mapState} from 'vuex'

export default {
  name:'Moderation',
  components:{
      Posts,
  },
  computed: {
    ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
  },
    beforeMount(){
    // this.$store.dispatch('getUsers/getAllUsersAct') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    
    this.$store.dispatch('getProfile/getProfile') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
    
  }, 

}
</script>