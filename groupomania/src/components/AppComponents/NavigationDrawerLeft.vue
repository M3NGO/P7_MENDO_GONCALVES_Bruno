<template>
  <div> <!-- navigation drawer pour mettre le menu sur la gauche de l'écran -->
    <v-navigation-drawer app permanent expand-on-hover v-if="this.$route.path !== '/'&& this.$route.path !== '/inscription'">
    <!-- mini-variant pour créér l'effet reduction menu + expand-on-hover pour l'agrandir en hover + v-if pour l'afficher quand on est dans l'app -->
      <v-list-item class="px-1 py-1"><!-- avatar drawer-->
        <!-- Si user a une photo uploadée pour avatar alors on l'affiche -->
        <v-avatar class="profile" color="grey"  rounded-pill border v-if="profile.upload_url != null">
          <v-img small v-bind:src="'http://localhost:3000/' + profile.upload_url"></v-img>
        </v-avatar>
        <!-- FIN - Si user a une photo uploadée pour avatar alors on l'affiche -->
        <!-- Si user n'a pas de photo on affiche par défaut l'icone avatar-->
        <v-avatar class="profile" color="grey"  rounded-pill border v-if="profile.upload_url == null" >
          <v-icon center dark >mdi-account-circle</v-icon>
        </v-avatar>
        <!-- FIN - Si user n'a pas de photo on affiche par défaut l'icone avatar-->
        <v-list-item-title class="ms-1">{{profile.email}}</v-list-item-title>
      </v-list-item><!-- FIN - avatar drawer-->

      <v-list> <!-- Liste MENU drawer gauche-->

        <v-list-item color="error" link :to="{path:'/wall'}" @click="top"><!-- icone Home -->
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
            <v-list-item-title>Mon actualité</v-list-item-title>
          </v-list-item><!-- icone Home -->

          <v-list-item color="error" link :to="{path:'/activite'}" @click="top"><!-- icone Email -->
            <v-list-item-icon>
              <v-icon>mdi-email</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Mon activité</v-list-item-title>
          </v-list-item><!-- icone Email -->

          <v-list-item color="error" link :to="{path:'/profil'}" @click="top"><!-- icone Rouage -->
            <v-list-item-icon>
              <v-icon>mdi-account-cog</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Mon profil</v-list-item-title>
          </v-list-item><!-- icone Rouage -->

          <!-- menu spécial chargé de communication / modération-->
          <v-list-item color="primary" link :to="{path:'/utilisateurs'}" @click="top"><!-- icone tous les utlisateurs -->
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Tous les utilisateurs</v-list-item-title>
          </v-list-item><!-- icone tous les utlisateurs -->

          <v-list-item color="primary" link :to="{path:'/utilisateurs-desinscrits'}" @click="top" v-if="profile.role == 2"><!-- icone tous les utlisateurs désinscrits -->
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-remove</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Utilisateurs désinscrits</v-list-item-title>
          </v-list-item><!-- icone tous les utlisateurs désinscrits -->

          <v-list-item color="primary" link :to="{path:'/moderation'}" @click="top" v-if="profile.role == 2"><!-- icone tous les utlisateurs désinscrits -->
            <v-list-item-icon>
              <v-icon>mdi-message-bulleted-off</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Modération</v-list-item-title>
          </v-list-item><!-- icone tous les utlisateurs désinscrits -->

          <v-list-item  v-on:click="logout()"><!-- icone Déconnexion -->
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Déconnexion</v-list-item-title>
          </v-list-item><!-- icone Déconnexion -->

      </v-list><!-- FIN - Liste MENU drawer gauche-->

    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState} from 'vuex'

export default {
  name: 'NavigationDrawer',

  methods:{
    logout(){
      this.$store.dispatch('Auth/logout') //(appel fonction logout dans le store auth pour clean :localstorage et getout)
    },//FIN
    top(){ // to top au click sur les boutons menu
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    },
  },// FIN methods
  computed: {
    ...mapState('getProfile', ['profile']), //('nom du module dans index.js', ['nomstate dans fichier dossier module'])
  },// FIN computed

}// FIN - EXPORT DEFAUT
</script>
