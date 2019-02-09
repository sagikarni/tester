<template>
  <div class="dashboard-container" style="position:relative">
    <el-table :data="items" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="_id" label="Id" width="180"></el-table-column>
      <el-table-column prop="name" label="Name" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { UserModule } from '@/store/modules/user';
import request from '../../utils/request';
import { ActivitiesModule } from '@/store/modules/activities';
import { flatten } from 'lodash';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({
  filters: {
    limitArray: (arr, form) => {
      let f = arr;

      if (form.domain) {
        f = f.filter((a) => a.type.domain.name === form.domain);
      }
      if (form.type) {
        f = f.filter((a) => a.type.name === form.type);
      }
      if (form.mediaType) {
        f = f.filter((a) => a.mediaType === form.mediaType);
      }
      if (form.category) {
        f = f.filter((a) => a.category.name === form.category);
      }
      if (form.subcategory) {
        f = f.filter((a) => a.subCategory.name === form.subcategory);
      }
      if (form.level && form.level.length > 0) {
        f = f.filter((a) => form.level.includes(a.level));
      }
      if (form.audience) {
        f = f.filter((a) => a.audience === form.audience);
      }
      if (form.status) {
        f = f.filter((a) => a.status === form.status);
      }
      if (form.printable != null) {
        f = f.filter((a) => a.printable === form.printable);
      }
      if (form.free != null) {
        f = f.filter((a) => a.free === form.free);
      }
      if (form.editorial != null) {
        f = f.filter((a) => a.editorial === form.editorial);
      }
      if (form.text) {
        f = f.filter((obj) =>
          Object.keys(obj).some(
            (key) =>
              typeof obj[key] === 'string' &&
              obj[key]
                .toString()
                .toLowerCase()
                .includes(form.text.toString().toLowerCase())
          )
        );
      }
      return f;
    },
  },
})
export default class Recommendations extends Vue {
  get categories() {
    return ActivitiesModule.categories;
  }

  get subcategories() {
    return ActivitiesModule.subcategories;
  }

  get domainNames() {
    return Object.keys(ActivitiesModule.domains);
  }

  get types() {
    return ActivitiesModule.types;
  }

  get items() {
    return ActivitiesModule.activities;
  }

  async beforeRouteEnter(to, from, next) {
    await Promise.all([
      ActivitiesModule.LoadActivities(),
      ActivitiesModule.LoadCategories(),
      ActivitiesModule.LoadDomains(),
    ]);

    next();
  }

  constructor() {
    super();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
