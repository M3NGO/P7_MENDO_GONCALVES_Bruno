<template>
        <v-container>
            <v-card-title>Mon activité</v-card-title>
                <v-tabs color="error" >
                <v-tabs-slider color="error"></v-tabs-slider>
                <v-tab>Mes Posts</v-tab>
                    <v-tab-item>
                    <MessagesMonActivite/>
                    </v-tab-item>
                <v-tab>Mes Commentaires</v-tab>
                    <v-tab-item>
                    <CommentairesMonActivite/>
                    </v-tab-item>
                </v-tabs>
        </v-container>
</template>

<script>
import MessagesMonActivite from '@/components/MonActiviteComponents/MessagesMonActivite.vue'
import CommentairesMonActivite from '@/components/MonActiviteComponents/CommentairesMonActivite.vue'

export default {
  name:'MonActivite',
  components:{
      MessagesMonActivite,
      CommentairesMonActivite,
  },
        
}
</script>
