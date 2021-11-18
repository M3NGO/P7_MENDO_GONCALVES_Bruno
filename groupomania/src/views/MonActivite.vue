<template>
<v-main>
    <v-container>
      
        <v-card-title class="mb-15">Mon activité</v-card-title>
    <Posts/>
      
    </v-container>
</v-main>
</template>

<script>
import Posts from '@/components/WallComponents/Posts.vue'

export default {
  name:'MonActivite',
  components:{
      Posts,
  },
        
}
</script>
