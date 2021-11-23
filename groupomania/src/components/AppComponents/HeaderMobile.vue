<template>
  <v-div><!-- header -->
    <v-app-bar fixed clipped-left v-if="this.$route.path !== '/'&& this.$route.path !== '/inscription'" app color="white" flat dense>
        <v-div class="mt-3">
            <v-btn icon color="error" bordered @click.stop="drawer = !drawer">
            <v-avatar size="40">
                <v-img src="https://i.pravatar.cc/64" alt="avatar user"/>
            </v-avatar>
            </v-btn>
        </v-div>
        <v-spacer></v-spacer><!-- v-spacer avant le logo pour le positionner automatiquement à droite -->
        <v-div class=" pe-5"><!-- import Logo Groupomania -->
            <v-img alt="Groupomania Logo" class="shrink mr-2" contain src="@/assets/Logo_Groupomania_seul.png" width="120"/>
        </v-div>
    </v-app-bar>
    <v-div> <!-- navigation drawer pour mettre le menu sur la gauche de l'écran -->
    <v-navigation-drawer v-model="drawer" fixed app width="220" temporary v-if="this.$route.path !== '/'&& this.$route.path !== '/inscription'">
    <!-- mini-variant pour créér l'effet reduction menu + expand-on-hover pour l'agrandir en hover + v-if pour l'afficher quand on est dans l'app -->
      <v-list-item class="px-1 py-1"><!-- avatar drawer-->
        <v-avatar>
          <v-img src="https://i.pravatar.cc/64" alt="avatar user"/>
        </v-avatar>
        <v-list-item-title class="ms-1 body-2">email@groupomania.com</v-list-item-title>
      </v-list-item><!-- FIN - avatar drawer-->

      <v-list> <!-- Liste MENU drawer gauche-->

          <v-list-item color="error" link :to="{path:'/profil'}" @click="top"><!-- icone Rouage -->
            <v-list-item-icon>
              <v-icon>mdi-account-cog</v-icon>
            </v-list-item-icon>
              <v-list-item-title class="caption">Mon profil</v-list-item-title>
          </v-list-item><!-- icone Rouage -->

          <!-- menu spécial chargé de communication / modération-->

          <v-list-item color="primary" link :to="{path:'/utilisateurs-desinscrits'}" @click="top"><!-- icone tous les utlisateurs désinscrits -->
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-remove</v-icon>
            </v-list-item-icon>
              <v-list-item-title class="caption">Utilisateurs désinscrits</v-list-item-title>
          </v-list-item><!-- icone tous les utlisateurs désinscrits -->

          <v-list-item color="primary" link :to="{path:'/moderation'}" @click="top"><!-- icone tous les utlisateurs désinscrits -->
            <v-list-item-icon>
              <v-icon>mdi-message-bulleted-off</v-icon>
            </v-list-item-icon>
              <v-list-item-title class="caption" >Modération</v-list-item-title>
          </v-list-item><!-- icone tous les utlisateurs désinscrits -->

          <v-list-item link :to="{path:'/'}" @click="top"><!-- icone Déconnexion -->
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
              <v-list-item-title class="caption" >Déconnexion</v-list-item-title>
          </v-list-item><!-- icone Déconnexion -->

      </v-list><!-- FIN - Liste MENU drawer gauche-->

    </v-navigation-drawer>
  </v-div>
  </v-div><!-- FIN - header -->

  
</template>

<script>
export default {
data: () => ({
  
      drawer: null,
    
      top(){ // to top au click sur les boutons menu
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }
})


}
</script>


<style>

</style>