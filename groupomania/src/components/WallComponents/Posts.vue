<template>
  <v-container fluid > <!-- Div Contenu Profil -->
   
        <Messages/>
  
        <v-div v-for="post in allPosts" :key="post.id" >
          <h1>{{post.upload_url}}</h1>
          <!-- <p>{{post}}</p> -->
          <p>{{post.id}}</p>
          <p>{{post.content}}</p>
          
                  <v-div v-for="comment in post.comment" :key="comment.id">
          <p>{{comment.content}}</p>
          <p>{{comment.updatedAt}}</p>
        </v-div>
        </v-div>


        
  </v-container>
</template>

<script>
import Messages from '@/components/Messages'
import { mapState } from 'vuex'

export default {
  name: 'Posts',
  components:{
    Messages,
    
    
  },
  computed: {
    ...mapState('getPosts', ['allPosts']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
    
  },
  mounted(){
    this.$store.dispatch('getPosts/getAllPostsAct') //('nom du module dans index.js/nom actions duans le fichier dans dossier module)
  },


 
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
