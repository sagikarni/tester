<template>
  <Shell/>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { ActivitiesModule } from './store/activities.module';
// import { DomainsModule } from './store/domains.module';
// import { CategoriesModule } from './store/categories.module';
// import { StripsModule } from './store/strips.module';
// import { ArticulationsModule } from './store/articulations.module';

import Shell from './views/Shell.vue';

@Component({
  components: {
    Shell,
  },
})
export default class App extends Vue {
  async mounted() {
    // await ActivitiesModule.load();
    // await DomainsModule.load();
    // await CategoriesModule.load();
    // await StripsModule.load();
    // await ArticulationsModule.load();
    // const a = StripsModule.strip
    //   .query()
    //   // .with('groups')
    //   .all();
    // const a = ActivitiesModule.activity.query()
    // .with(['type.domain', 'category', 'subCategory.category'])
    // .all();
    // const a = StripsModule.strip.query()
    //   // .with(['type.domain', 'category', 'subCategory.category'])
    //   .first();
    // const a = ActivitiesModule.activity
    //   .query()
    //   .with(['type.domain', 'category', 'subCategory.category'])
    //   .first();
    // await CategoriesModule.add({ category: { name: 'ba' } });
    // const c = CategoriesModule.category.query<any>().last();
    // console.log({ c });
    // await CategoriesModule.addSubcategory({
    //   subCategory: { name: 'suba', category: c._id },
    // });
    // const sub = CategoriesModule.subCategory.query<any>().last();
    // console.log({ sub });
    // if (sub.name === 'suba') {
    //   await CategoriesModule.removeSubcategory({ subCategory: sub });
    // }
    // if (c.name === 'ba') {
    //   await CategoriesModule.remove({ category: c });
    // }
    // console.log({ a });
  }
}
</script>

<style lang="scss">
@import './style.scss';
</style>
