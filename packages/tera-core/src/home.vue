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

    <home-footer/>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { ActivitiesModule } from '@/store/modules/activities';
import { CategoryModule } from '@/store/modules/category';
import { DomainModule } from '@/store/modules/domains';
import { AppModule } from '@/store/modules/app';
import { StripsModule } from '@/store/modules/strips';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({
  components: {
    Hero: () => import('./home/Hero.vue'),
    // Strip: () => import('./home/Strip'),
    HomeFooter: () => import('./home/Footer.vue'),
    HomeStrips: () => import('./home/Strips.vue'),
    SpeechStrips: () => import('./home/SpeechStrips.vue'),
    WhyUs: () => import('./home/WhyUs.vue'),
    Recommendations: () => import('./home/Recommendations.vue'),
  },
})
export default class Home extends Vue {

 public async beforeRouteEnter(to, from, next) {
    await Promise.all([
      ActivitiesModule.loadActivities(),
      ActivitiesModule.LoadArticulations(),

      CategoryModule.loadCategory(),
      DomainModule.loadDomains(),
      StripsModule.loadStrips()
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
