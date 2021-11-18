<template>
    <v-main>
        <v-container>
            <v-card-title class="mb-15">Moderation</v-card-title>
            <Posts/>
        </v-container>
    </v-main>
</template>

<script>
import Posts from '@/components/WallComponents/Posts.vue'

export default {
  name:'Moderation',
  components:{
      Posts,
  },
        
}
</script>