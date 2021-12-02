<template>
  <v-container fluid > <!-- Div Contenu Profil -->
   
        <Messages/>

  </v-container>
</template>

<script>
import Messages from '@/components/Messages'

export default {
  name: 'Posts',
  components:{
    Messages,
    
  },
 
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
