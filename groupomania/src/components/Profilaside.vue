<template>
  <div class="p-4">
    <Profilavatar/>
    <Profilcontent/>
  </div>
</template>

<script>
import Profilavatar from '@/components/ProfilasideComponents/Profilavatar.vue'
import Profilcontent from '@/components/ProfilasideComponents/Profilcontent.vue'
export default {
  name: 'Profilaside',
  components:{
    Profilavatar,
    Profilcontent,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
