<template>
  <div>
    <v-toolbar color="blue darken-3" dark app>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <span class="hidden-sm-and-down">Via Admin</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search by Name, Description, Image ID or Activity ID"
        class="hidden-sm-and-down"
        v-model="searchKey"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-toolbar>
    <DashboardView :searchKey="searchKey"/>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="$router.push('/dashboard/activities/add')"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardView from './dashboard/index.vue';
import { ActivitiesModule } from '../store/modules/activities';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({
  components: { DashboardView },
})
export default class Activities extends Vue {
  searchKey = '';

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
  ];

  async beforeRouteEnter(to, from, next) {
    await Promise.all([
      ActivitiesModule.LoadActivities(),
      ActivitiesModule.LoadCategories(),
      ActivitiesModule.LoadDomains(),
    ]);

    next();
  }
}
</script>
