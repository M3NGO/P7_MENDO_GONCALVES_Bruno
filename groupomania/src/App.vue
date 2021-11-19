<template>
  <v-app>
    <Header/>
    <NavigationDrawerLeft v-if="this.$vuetify.breakpoint.smAndUp"/>
    <!-- <NavigationBottom v-if="this.$vuetify.breakpoint.smAndDown"/> -->
      <v-main>
        <v-container fluid>
        <router-view/>
        </v-container>
      </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Header from '@/components/AppComponents/Header.vue'
import NavigationDrawerLeft from '@/components/AppComponents/NavigationDrawerLeft.vue'
import Footer from '@/components/AppComponents/Footer.vue'

export default {
  name: 'App',
   components:{
     Header,
     Footer,
     NavigationDrawerLeft
  },


  data: () => ({
    //
  }),
};
</script>