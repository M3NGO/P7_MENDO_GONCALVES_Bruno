<template>
    <v-bottom-navigation app grow color="error" v-if="this.$route.path !== '/'&& this.$route.path !== '/inscription'" aria-label="Mon actualité">
        <v-btn @click="top" link :to="{path:'/wall'}" ><!-- icone Home -->
            <span class="text-caption">Mon actualité</span>
            <v-icon>mdi-home</v-icon>
        </v-btn><!-- icone Home -->

        <v-btn @click="top" link :to="{path:'/activite'}" aria-label="Mon activité"><!-- icone email -->
            <span class="text-caption">Mon activité</span>
            <v-icon>mdi-email</v-icon>
        </v-btn><!-- icone email -->

        <!-- menu spécial chargé de communication / modération-->
        <v-btn @click="top" link :to="{path:'/utilisateurs'}" aria-label="Utilisateurs"><!-- icone tous les utlisateurs -->
            <span class="text-caption">Utilisateurs</span>
            <v-icon>mdi-account-multiple</v-icon>
        </v-btn><!-- icone tous les utlisateurs -->

    </v-bottom-navigation>

</template>

<script>
export default {
    name: 'NavigationMobile',

    methods:{
        top(){ // to top au click sur les boutons menu du bas mobile
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }
    }//FIN - methods
}// FIN EXPORT default
</script>
