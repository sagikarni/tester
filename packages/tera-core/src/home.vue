<template>
  <div id="home">
    <v-content>
      <v-container fluid pa-0>
        <hero/>

        <home-strips/>
        <why-us/>

      </v-container>

      

      <!-- 


      <recommendations />-->
    </v-content>

    <home-footer/>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Hero: () => import('./home/Hero.vue'),
    // Strip: () => import('./home/Strip'),
    HomeFooter: () => import('./home/Footer.vue'),
    HomeStrips: () => import('./home/Strips.vue'),
    WhyUs: () => import('./home/WhyUs.vue'),
    Recommendations: () => import('./home/Recommendations.vue'),
  },
})
export default class Home extends Vue {}
</script>
