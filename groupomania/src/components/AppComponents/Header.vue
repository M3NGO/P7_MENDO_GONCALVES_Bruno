<template>
<header class="container">
  <div class="row justify-content-end">
  <div id="nav" class="col " v-if="this.$route.path !== '/' && this.$route.path !== '/inscription' && this.$route.path !== '/profil' && this.$route.path !== '/about'" > <!-- v-if pour rendre le rendu conditionnel, sur le chemin / le nav ne sera pas visible-->
    
    <!-- <router-link to="/about">About</router-link> | -->
    <router-link to="/profil"><i class="bi bi-person-circle"></i></router-link> <i class="bi bi-three-dots-vertical"></i>
    <router-link to="/"><i class="bi bi-x-lg"></i></router-link>
  </div>
  </div>
  <div class="row justify-content-end">
  <div id="nav" class="col " v-if="this.$route.path !== '/' && this.$route.path !== '/inscription' && this.$route.path !== '/wall'">
    <router-link to="/wall"><i class="bi bi-bricks"></i></router-link> <i class="bi bi-three-dots-vertical"></i>
    <router-link to="/"><i class="bi bi-x-lg"></i></router-link>
  </div>
 </div>
</header>
  <router-view/>
</template>

<style>
header {
  text-align: right;
}
i{
  font-size:1.5em;
}
</style>