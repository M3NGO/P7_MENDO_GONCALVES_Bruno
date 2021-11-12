<template>
<div class="border row p-4 justify-content-center"> <!-- Div Contenu Profil -->
<div class="">
    <h1>ICI on vera les Post + commentaires de tout le monde, permettra le suivi des posts et commentaires</h1>
    <Messages/>
    <Messages/>
    <Messages/>

</div>
</div>

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
