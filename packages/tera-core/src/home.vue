<template>
  <div id="home">
    <v-content>
      <v-container fluid pa-0>
        <hero/>

        <home-strips/>

        <speech-strips/>

        <why-us/>

        <recommendations/>
      </v-container>
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { ActivitiesModule } from './store/activities.module';
import { CategoriesModule } from './store/categories.module';
import { DomainsModule } from './store/domains.module';
import { AppModule } from './store/app';
import { StripsModule } from './store/strips.module';
import { ArticulationsModule } from './store/articulations.module';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({
  components: {
    Hero: () => import('./home/Hero.vue'),
    // Strip: () => import('./home/Strip'),
    // HomeFooter: () => import('./home/Footer.vue'),
    HomeStrips: () => import('./home/Strips.vue'),
    SpeechStrips: () => import('./home/SpeechStrips.vue'),
    WhyUs: () => import('./home/WhyUs.vue'),
    Recommendations: () => import('./home/Recommendations.vue'),
  },
})
export default class Home extends Vue {
  public async beforeRouteEnter(to, from, next) {
    await Promise.all([
      ArticulationsModule.load(),
      ActivitiesModule.load(),
      CategoriesModule.load(),
      DomainsModule.load(),
      StripsModule.load(),
    ]);

    next();
  }
}
</script>

<style lang="scss" scoped>
#home {
  background: #f2f2f2;
}
</style>
