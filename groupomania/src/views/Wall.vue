<template>
  <div class="d-flex justify-content-evenly">
    <div class="col-2 border border-3 rounded">
      <Profilaside/>
    </div>
    <div class="col-8 border border-3 rounded">
      <Posts/>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import Posts from '@/components/WallComponents/Posts.vue'
import Profilaside from '@/components/WallComponents/Profilaside.vue'



export default {
  name: 'Wall',
  components: {
    Posts,
    Profilaside,

  }
}
</script>
