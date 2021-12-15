<template>
  <div class="mb-10"><!-- header -->
    <v-app-bar fixed clipped-left v-if="this.$route.path !== '/'&& this.$route.path !== '/inscription'" app color="white" flat dense>
      <v-spacer></v-spacer><!-- v-spacer avant le logo pour le positionner automatiquement à droite -->
      <div class=" pe-10"><!-- import Logo Groupomania -->
        <v-img alt="Groupomania Logo" class="shrink mr-2" contain src="@/assets/Logo_Groupomania_seul.png" width="120"/>
      </div>
    </v-app-bar>
  </div><!-- FIN - header -->
</template>

<script>
export default {
name:'Header'

}
</script>


<style>

</style>