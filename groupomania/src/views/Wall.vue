<template>
  <div>
    <Newpostform/>
    <Posts/>
  </div>
</template>

<script>
// @ is an alias to /src

import Posts from '@/components/WallComponents/Messages.vue'
import Newpostform from '@/components/WallComponents/Newpostform.vue'




export default {
  name: 'Wall',
  components: {
    Newpostform,
    Posts,

  }
}
</script>
