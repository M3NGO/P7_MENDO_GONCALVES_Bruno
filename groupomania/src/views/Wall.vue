<template>
  <div class="container">
    <div class="row">
      <Walltopsection/>
    </div>
    <div class="mt-4 ">
        <div class="">
            <Posts/>
        </div>
    </div>
    </div>
  

</template>

<script>
// @ is an alias to /src
import Walltopsection from '@/components/WallComponents/Walltopsection.vue'
import Posts from '@/components/WallComponents/Posts.vue'




export default {
  name: 'Wall',
  components: {
    Walltopsection,
    Posts

  }
}
</script>
