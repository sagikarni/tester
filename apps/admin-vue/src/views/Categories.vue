<template>
  <div>
    <v-toolbar color="blue darken-3" dark app>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
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

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({
  components: { CategoriesView },
})
export default class Categories extends Vue {
  private source = '';

  private dialog = false;
  private drawer = null;
  private items = [
    { icon: 'contacts', text: 'Activities', url: '/dashboard/activities' },
    {
      icon: 'history',
      text: 'Recommendations',
      url: '/dashboard/recommendations',
    },
    { icon: 'content_copy', text: 'Categories', url: '/dashboard/categories' },
    {
      icon: 'content_copy',
      text: 'Articulation',
      url: '/dashboard/articulations',
    },
  ];

  public async beforeRouteEnter(to, from, next) {
    await Promise.all([
      ActivitiesModule.LoadActivities(),
      ActivitiesModule.LoadCategories(),
      ActivitiesModule.LoadDomains(),
    ]);

    next();
  }
}
</script>
