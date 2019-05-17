<template>
  <div>
    <v-toolbar color="blue darken-3" dark app>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>

        <span class="hidden-sm-and-down">Via Admin</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-toolbar>
    <RecommendationsView/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ActivitiesModule } from '../store/modules/activities';
import { ActivityCollectionModule } from '../store/modules/activities-collection';
import { CategoryModule } from '../store/modules/category';
import { DomainModule } from '../store/modules/domains';
import { AppModule } from '../store/modules/app';
import RecommendationsView from './recommendations/index.vue';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({
  components: { RecommendationsView },
})
export default class Recommendations extends Vue {
  public async beforeRouteEnter(to, from, next) {
    await Promise.all([
      ActivitiesModule.loadActivities(),
      CategoryModule.loadCategory(),
      DomainModule.loadDomains(),
      ActivityCollectionModule.loadActivitiesCollection(),
    ]);
    next();
  }

  toggleDrawer() {
    AppModule.toggleDrawer();
  }
}
</script>
