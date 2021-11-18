<template>

<v-container > <!-- Div Contenu Profil -->
<v-row  class="d-flex justify-center ms-15">
    

    <Messages/>
    <Messages/>
    <Messages/>

</v-row>
</v-container>

</template>

<script>
import Messages from '@/components/Messages'


export default {
  name: 'Posts',
  components:{
    Messages,
    
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
