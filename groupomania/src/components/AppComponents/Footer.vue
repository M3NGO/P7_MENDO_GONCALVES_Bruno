<template>
  <v-footer clipped-left app padless color="white" flat v-if="this.$route.path !== '/' && this.$route.path !== '/inscription'">
    <v-spacer></v-spacer>
    <ScrollTopBtn/> <!-- import du bouton scrolltotop au niveau du footer-->
    <div class="me-15 mt-5">
      <p class="caption">© Groupomania</p>
    </div>
  
  </v-footer>
</template>

<script>
import ScrollTopBtn from '@/components/AppComponents/ScrollTopBtn.vue'

export default {
  name: 'Footer',
  components: {
    ScrollTopBtn,
  }//FIN COMPONENT

}//FIN EXPORT DEFAULT
</script>



<style>

</style>