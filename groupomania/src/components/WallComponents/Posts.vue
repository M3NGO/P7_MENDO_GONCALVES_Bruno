<template>

<div class="border row p-4 justify-content-start"> <!-- Div Contenu Profil -->

    <h1>ICI on vera les Post + commentaires de tout le monde, permettra le suivi des posts et commentaires</h1>
  
    <Messages/>
    <div class="row justify-content-end">
    <Commentaires/>
    </div>
    <Messages/>
    <Messages/>


</div>

</template>

<script>
import Messages from '@/components/Messages'
import Commentaires from '@/components/Commentaires'

export default {
  name: 'Posts',
  components:{
    Messages,
    Commentaires,
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
