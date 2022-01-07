<template>
  <div><!-- header -->
    <v-app-bar fixed height="80" clipped-left v-if="this.$route.path !== '/'&& this.$route.path !== '/inscription'" app color="white" flat dense>
        <div class="mt-3">
          <v-btn icon color="20" bordered @click.stop="drawer = !drawer" aria-label="avatar Menu">
            <v-avatar class="profile" color="grey"  rounded-pill border v-if="profile.upload_url != null">
              <v-img small v-bind:src="'http://localhost:3000/' + profile.upload_url"></v-img>
            </v-avatar>
            <v-avatar class="profile" color="grey"  rounded-pill border v-if="profile.upload_url == null" >
              <v-icon center color="white" >mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </div>
        <v-spacer></v-spacer><!-- v-spacer avant le logo pour le positionner automatiquement à droite -->
        <div class=" pe-5"><!-- import Logo Groupomania -->
            <v-img alt="Groupomania Logo" class="shrink mr-2" contain src="@/assets/Logo_Groupomania_seul.png" width="120"/>
        </div>
    </v-app-bar>
    <div> <!-- navigation drawer pour mettre le menu sur la gauche de l'écran -->
    <v-navigation-drawer v-model="drawer" fixed app width="220" temporary v-if="this.$route.path !== '/'&& this.$route.path !== '/inscription'">
    <!-- mini-variant pour créér l'effet reduction menu + expand-on-hover pour l'agrandir en hover + v-if pour l'afficher quand on est dans l'app -->
      <v-list-item class="px-1 py-1"><!-- avatar drawer-->
        <v-avatar class="profile" color="grey"  rounded-pill border v-if="profile.upload_url != null">
          <v-img small v-bind:src="'http://localhost:3000/' + profile.upload_url"></v-img>
        </v-avatar>
        
        <v-avatar class="profile" color="grey"  rounded-pill border v-if="profile.upload_url == null" >
          <v-icon center dark >mdi-account-circle</v-icon>
        </v-avatar>
        <v-list-item-title class="ms-1 body-2">{{profile.email}}</v-list-item-title>
      </v-list-item><!-- FIN - avatar drawer-->

      <v-list> <!-- Liste MENU drawer gauche-->

          <v-list-item color="error" link :to="{path:'/profil'}" @click="top"><!-- icone Rouage -->
            <v-list-item-icon>
              <v-icon>mdi-account-cog</v-icon>
            </v-list-item-icon>
              <v-list-item-title class="caption">Mon profil</v-list-item-title>
          </v-list-item><!-- icone Rouage -->

          <!-- menu spécial chargé de communication / modération-->

          <v-list-item color="primary" link :to="{path:'/utilisateurs-desinscrits'}" @click="top" v-if="profile.role == 2"><!-- icone tous les utlisateurs désinscrits -->
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-remove</v-icon>
            </v-list-item-icon>
              <v-list-item-title class="caption">Utilisateurs désinscrits</v-list-item-title>
          </v-list-item><!-- icone tous les utlisateurs désinscrits -->

          <v-list-item color="primary" link :to="{path:'/moderation'}" @click="top" v-if="profile.role == 2"><!-- icone tous les utlisateurs désinscrits -->
            <v-list-item-icon>
              <v-icon>mdi-message-bulleted-off</v-icon>
            </v-list-item-icon>
              <v-list-item-title class="caption" >Modération</v-list-item-title>
          </v-list-item><!-- icone tous les utlisateurs désinscrits -->

          <v-list-item v-on:click="logout()" @click="top"><!-- icone Déconnexion  -->
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
              <v-list-item-title class="caption" >Déconnexion</v-list-item-title>
          </v-list-item><!-- icone Déconnexion -->

      </v-list><!-- FIN - Liste MENU drawer gauche-->

    </v-navigation-drawer>
  </div>
  </div><!-- FIN - header -->

  
</template>

<script>
import { mapState } from 'vuex'
export default {
name: 'HeaderMobile',
data: () => ({
  drawer: null,
}),//fin data
methods:{
  logout(){
    this.$store.dispatch('Auth/logout') //(appel fonction logout dans le store auth pour clean :localstorage et getout)
  },
  top(){ // to top au click sur les boutons menu
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }
},//fin Methods
computed: {
  ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
},//fin computed
}//fin EXPORT DEFAULT
</script>


<style>

</style>