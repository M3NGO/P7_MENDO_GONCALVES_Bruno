<template>
  <v-main>
      <Newpostform/>
      <Posts/>
  </v-main>
</template>

<script>
// @ is an alias to /src

import Posts from '@/components/WallComponents/Posts.vue'
import Newpostform from '@/components/WallComponents/Newpostform.vue'




export default {
  name: 'Wall',
  components: {
    Newpostform,
    Posts,

  }
}
</script>
