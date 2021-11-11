<!-- page Profil Groupomania -->

<!-- HTML -->
<template>
<div class="container">
    <div class="row">
    <div class="col-3 card">
        <Profilaside/>       
    </div>
    <div class="col justify-content-center card ms-3">
        
        <Profilupdate/>
    </div>
    </div>
</div>

</template>
<!-- HTML -->

<!-- JAVASCRIPT -->
<script>
import Profilaside from '@/components/Profilaside.vue'
import Profilupdate from '@/components/ProfilComponents/Profilupdate.vue'


export default {
  name: 'Profil',
  components:{
      Profilaside,
      Profilupdate,
      

  }
}

</script>
<!-- JAVASCRIPT -->

<!-- CSS -->
<style>

</style>
<!-- CSS -->
