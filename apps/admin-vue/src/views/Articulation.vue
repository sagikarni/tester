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
    <ArticulationView/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ArticulationView from './articulation/index.vue';

import { ActivitiesModule } from '../store/activities.module';
import { DomainsModule } from '../store/domains.module';
import { CategoriesModule } from '../store/categories.module';
import { StripsModule } from '../store/strips.module';
import { ArticulationsModule } from '../store/articulations.module';
import { AppModule } from '../store/app';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({
  components: { ArticulationView },
})
export default class Articulation extends Vue {
  public async beforeRouteEnter(to, from, next) {
    await Promise.all([ArticulationsModule.load()]);

    next();
  }

  toggleDrawer() {
    AppModule.toggleDrawer();
  }
}
</script>
