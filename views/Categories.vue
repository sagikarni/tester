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
    <CategoriesView/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CategoriesView from './categories/index.vue';
import { ActivitiesModule } from '../store/modules/activities';
import { CategoryModule } from '../store/modules/category';
import { DomainModule } from '../store/modules/domains';
import { AppModule } from '../store/modules/app';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({
  components: { CategoriesView },
})
export default class Categories extends Vue {
  public async beforeRouteEnter(to, from, next) {
    await Promise.all([
      ActivitiesModule.loadActivities(),
      CategoryModule.loadCategory(),
      DomainModule.loadDomains(),
    ]);

    next();
  }

  toggleDrawer() {
    AppModule.toggleDrawer();
  }
}
</script>
