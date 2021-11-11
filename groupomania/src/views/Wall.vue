<template>
  <div class="container">
    <div class="row">
      <div class="col-3 card"> <!-- div aside -->
          <Profilaside/>
      </div><!-- div aside -->

      <div class="col ms-3"> <!-- div Main -->
        <div class="mb-3">
          <Newposts/>
        </div>
        <div class="border rounded">
          <Posts/>
        </div>
      </div><!-- div Main -->
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import Posts from '@/components/WallComponents/Posts.vue'
import Profilaside from '@/components/Profilaside.vue'
import Newposts from '@/components/WallComponents/Newposts.vue'




export default {
  name: 'Wall',
  components: {
    Posts,
    Profilaside,
    Newposts,

  }
}
</script>
