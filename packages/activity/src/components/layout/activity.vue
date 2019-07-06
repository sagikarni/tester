<template>
    <activity-details :activity="activity"></activity-details>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import dasherize from 'dasherize';
import { startCase } from 'lodash';
import { ActivitiesModule } from 'tera-core/src/store/activities.module';
import { CategoriesModule } from 'tera-core/src/store/categories.module';
import { DomainsModule } from 'tera-core/src/store/domains.module';
import { AppModule } from 'tera-core/src/store/app';
import { StripsModule } from 'tera-core/src/store/strips.module';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({
  components: {
    ActivityDetails: () => import('./activity-details.vue'),
  },
})
export default class Activity extends Vue {
  activity = null;

  constructor() {
    super();
  }

  mounted() {
    const { domain, category, id } = this.$route.params;
    console.log({ id });
    this.activity = ActivitiesModule.activity
      .query()
      .whereId(id)
      .with(['type.domain', 'category', 'subCategory.category'])
      .first();
  }

  public async beforeRouteEnter(to, from, next) {
    await Promise.all([
      ActivitiesModule.load(),
      CategoriesModule.load(),
      DomainsModule.load(),
      StripsModule.load(),
    ]);
    next();
  }
}
</script>
