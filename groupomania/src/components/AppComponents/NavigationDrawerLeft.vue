<template>
  <v-div> <!-- navigation drawer pour mettre le menu sur la gauche de l'écran -->
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent fixed expand-on-hover v-if="this.$route.path !== '/'&& this.$route.path !== '/inscription'">
    <!-- mini-variant pour créér l'effet reduction menu + expand-on-hover pour l'agrandir en hover + v-if pour l'afficher quand on est dans l'app -->
      <v-list-item class="px-1 py-1"><!-- avatar drawer-->
        <v-avatar>
          <v-img src="https://i.pravatar.cc/64" alt="avatar user"/>
        </v-avatar>
        <v-list-item-title class="ms-1">email@groupomania.com</v-list-item-title>
      </v-list-item><!-- FIN - avatar drawer-->

      <v-list> <!-- Liste MENU drawer gauche-->

        <v-list-item color="error" link :to="{path:'/wall'}"><!-- icone Home -->
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
            <v-list-item-title>Mon actualité</v-list-item-title>
          </v-list-item><!-- icone Home -->

          <v-list-item color="error" link :to="{path:'/activite'}"><!-- icone Email -->
            <v-list-item-icon>
              <v-icon>mdi-email</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Mes Posts</v-list-item-title>
          </v-list-item><!-- icone Email -->

          <v-list-item color="error" link :to="{path:'/profil'}"><!-- icone Rouage -->
            <v-list-item-icon>
              <v-icon>mdi-account-cog</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Mon profil</v-list-item-title>
          </v-list-item><!-- icone Rouage -->

          <!-- menu spécial chargé de communication / modération-->
          <v-list-item color="primary" link :to="{path:'/utilisateurs'}"><!-- icone tous les utlisateurs -->
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Tous les utilisateurs</v-list-item-title>
          </v-list-item><!-- icone tous les utlisateurs -->

          <v-list-item color="primary" link :to="{path:'/utilisateurs-desinscrits'}"><!-- icone tous les utlisateurs désinscrits -->
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-remove</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Utilisateurs désinscrits</v-list-item-title>
          </v-list-item><!-- icone tous les utlisateurs désinscrits -->

          <v-list-item color="primary" link :to="{path:'/moderation'}"><!-- icone tous les utlisateurs désinscrits -->
            <v-list-item-icon>
              <v-icon>mdi-message-bulleted-off</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Modération</v-list-item-title>
          </v-list-item><!-- icone tous les utlisateurs désinscrits -->

          <v-list-item link :to="{path:'/'}"><!-- icone Déconnexion -->
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
              <v-list-item-title>Déconnexion</v-list-item-title>
          </v-list-item><!-- icone Déconnexion -->

      </v-list><!-- FIN - Liste MENU drawer gauche-->

    </v-navigation-drawer>
  </v-div>
</template>