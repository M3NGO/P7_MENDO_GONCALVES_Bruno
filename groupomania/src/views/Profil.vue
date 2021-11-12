<!-- page Profil Groupomania -->

<!-- HTML -->
<template>
<div class="container">
    <div class="row">
    <Profiltopsection/>
    <div class="mt-4 border">
        <div class="">
            <Profilmessages/>
        </div>
        <div class="mt-3">
            <Profillikesdislikes/>
        </div>
    </div>
    </div>
</div>

</template>
<!-- HTML -->

<!-- JAVASCRIPT -->
<script>
import Profiltopsection from '@/components/ProfilComponents/Profiltopsection.vue'
import Profilmessages from '@/components/ProfilComponents/Profilmessages.vue'
import Profillikesdislikes from '@/components/ProfilComponents/Profillikesdislikes.vue'



export default {
  name: 'Profil',
  components:{
      Profiltopsection,
      Profilmessages,
      Profillikesdislikes,
 
      

  }
}

</script>
<!-- JAVASCRIPT -->

<!-- CSS -->
<style>
/* .card{
    width:75%
} */

</style>
<!-- CSS -->
