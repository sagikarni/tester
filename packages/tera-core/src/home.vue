<template>
  <div id="home">
    <v-content>
      <v-container fluid pa-0>
        <hero/>

        <!-- <strip for="homepage"> -->

      </v-container>
    </v-content>

    <home-footer/>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Hero: () => import('./home/Hero'),
    // Strip: () => import('./home/Strip'),
    HomeFooter: () => import('./home/Footer'),
  },
})
export default class Home extends Vue {}
</script>
