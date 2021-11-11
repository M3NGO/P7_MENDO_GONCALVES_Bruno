<template>
<footer class="flex-row  justify-content-center">
  <div id="nav" class="flex-row " v-if="this.$route.path !== '/' && this.$route.path !== '/inscription'" > <!-- v-if pour rendre le rendu conditionnel, sur le chemin / le nav ne sera pas visible-->
    <p>Copyright Groupomania</p>
  </div>
</footer>

</template>

<style>
footer{
  text-align: center;
}
</style>