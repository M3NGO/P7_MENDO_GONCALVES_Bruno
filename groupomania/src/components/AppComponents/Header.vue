<template>
  <v-div><!-- header -->
    <v-app-bar fixed clipped-left v-if="this.$route.path !== '/'&& this.$route.path !== '/inscription'" app color="white" flat dense>
      <v-spacer></v-spacer><!-- v-spacer avant le logo pour le positionner automatiquement à droite -->
      <v-div class=" pe-10"><!-- import Logo Groupomania -->
        <v-img alt="Groupomania Logo" class="shrink mr-2" contain src="@/assets/Logo_Groupomania_seul.png" width="120"/>
      </v-div>
    </v-app-bar>
  </v-div><!-- FIN - header -->
</template>

<script>
export default {

}
</script>


<style>

</style>