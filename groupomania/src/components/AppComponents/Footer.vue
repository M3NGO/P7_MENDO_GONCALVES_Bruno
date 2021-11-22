<template>
  <v-footer clipped-left app padless color="white" flat v-if="this.$route.path !== '/' && this.$route.path !== '/inscription'">
    <v-spacer></v-spacer>
    <v-div class="pe-10">
      <p class="caption">© Groupomania</p>
    </v-div>
  </v-footer>
</template>

<style>

</style>