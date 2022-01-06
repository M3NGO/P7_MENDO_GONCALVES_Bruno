<template>
 <body>
    <v-app>
      <Header v-if="this.$vuetify.breakpoint.smAndUp"/>
      <NavigationDrawerLeft v-if="this.$vuetify.breakpoint.mdAndUp"/><!-- Menu a gauche visible pour les écrans suppérieurs a 960px -->
      <HeaderMobile v-if="this.$vuetify.breakpoint.smAndDown"/><!-- menu a gauche caché déclanché au click avatar pour écrans inférieurs à 960px -->
    
        <v-main>
          <router-view/><!-- importe le routeur qui dispatche les views du projet dans une balise main-->
        </v-main>
  
      <Footer/>
      <NavigationMobile v-if="this.$vuetify.breakpoint.smAndDown"/><!--  menu mobile en bas d'écran pour les écrans inférieurs à 960px-->
    </v-app>
  </body>
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
  },//FIN components

  mounted() { // au refresh de nimporte quelle page de l'app on scroll vers le haut automatiquement smoothly
    window.onload = window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    },//FIN mounted
}//FIN EXPORT DEFAULT
</script>