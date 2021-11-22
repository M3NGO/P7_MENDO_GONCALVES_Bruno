<template>
  <v-app>
    <Header v-if="this.$vuetify.breakpoint.smAndUp"/>
    <NavigationDrawerLeft v-if="this.$vuetify.breakpoint.mdAndUp"/>
    
    <!-- <NavigationBottom v-if="this.$vuetify.breakpoint.smAndDown"/> -->

    <HeaderMobile v-if="this.$vuetify.breakpoint.smAndDown"/>
    
      <v-main>
       
        <router-view/>
       
      </v-main>
    <Footer/>
    <NavigationMobile v-if="this.$vuetify.breakpoint.smAndDown"/>
  </v-app>
</template>

<script>
import Header from '@/components/AppComponents/Header.vue'
import NavigationDrawerLeft from '@/components/AppComponents/NavigationDrawerLeft.vue'
import Footer from '@/components/AppComponents/Footer.vue'
import HeaderMobile from '@/components/AppComponents/HeaderMobile.vue'
import NavigationMobile from '@/components/AppComponents/NavigationMobile.vue'

export default {
  name: 'App',
   components:{
     Header,
     Footer,
     NavigationDrawerLeft,
     HeaderMobile,
     NavigationMobile,

  },


  data: () => ({
    //
  }),
};
</script>