<template>
<header class="flex-row  justify-content-center">
  <div id="nav" class="flex-row " v-if="this.$route.path !== '/' && this.$route.path !== '/inscription' && this.$route.path !== '/profil' && this.$route.path !== '/about'" > <!-- v-if pour rendre le rendu conditionnel, sur le chemin / le nav ne sera pas visible-->
    
    <router-link to="/about">About</router-link> |
    <router-link to="/profil">Profil</router-link> |
    <router-link to="/">Déconnexion</router-link>
  </div>
  <div id="nav" class="flex-row " v-if="this.$route.path !== '/' && this.$route.path !== '/inscription' && this.$route.path !== '/wall'">
    <router-link to="/wall">Wall</router-link> |
    <router-link to="/">Déconnexion</router-link>
  </div>
</header>
  <router-view/>
</template>