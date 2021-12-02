<template>

<v-btn class="mb-16 elevation-10" dense small fab right bottom color="error" fixed @click="toTop" v-show="appear > 200"
><v-icon>mdi-chevron-up</v-icon></v-btn>
    
</template>

<script>

export default {

name:'ScrollTopBtn',
  data() {
return {appear:0, scrollBas:0}
  },
  mounted() {
      window.addEventListener('scroll', this.scroller);
    },
  
    methods:{

      scroller() {
        if (this.scrollBas) return;
        this.scrollBas = setTimeout(() => {
          this.appear = window.scrollY;
          clearTimeout(this.scrollBas);
          this.scrollBas = 0;
        }, 100);
      },
        
      toTop(){
             window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  
           }
           
        }

}
</script>

