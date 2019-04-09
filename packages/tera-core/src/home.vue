<template>
  <div id="home">
    <v-content>
      <hero/>

      
      <!-- <strip for="homepage"> -->
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
  },
})
export default class Home extends Vue {}
</script>
