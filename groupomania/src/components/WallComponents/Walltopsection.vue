<!-- page Profil Groupomania -->

<!-- HTML -->
<template>
<div class="container">
    <div class="row">
    <div class="col-3 card">
        <Profilaside/>       
    </div>
    <div class="col justify-content-center ms-4">
      <Newpostform/>
      <Lastposts/>
    </div>
    </div>
</div>

</template>
<!-- HTML -->

<!-- JAVASCRIPT -->
<script>
import Profilaside from '@/components/Profilaside.vue'
import Newpostform from '@/components/WallComponents/Newpostform.vue'
import Lastposts from '@/components/WallComponents/Lastposts.vue'


export default {
  name: 'Profil',
  components:{
      Profilaside,
      Newpostform,
      Lastposts,
      

  }
}

</script>
<!-- JAVASCRIPT -->

<!-- CSS -->
<style>

</style>
<!-- CSS -->
