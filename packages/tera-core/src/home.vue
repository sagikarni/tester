<template>
  <div id="home">
    <v-content>
      <v-container fluid pa-0>
        <hero/>
      </v-container>
    </v-content>

    <home-footer/>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Hero: () => import('./home/Hero.vue'),
    HomeFooter: () => import('./home/Footer.vue'),
  },
})
export default class Home extends Vue {}
</script>
