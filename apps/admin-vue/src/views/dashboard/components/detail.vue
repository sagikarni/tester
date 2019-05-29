<template>
  <div>
    <Model :add="false" :activity="activity"/>

    <el-button type="primary" @click="onSubmit">Save</el-button>
    <el-button @click="onCancel">Cancel</el-button>

    <el-button @click="onDelete">Delete</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import request from '../../../utils/request';
import Model from './model.vue';
import { Message, MessageBox } from 'element-ui';
import lodash from 'lodash';
import { ActivitiesModule } from '../../../store/activities.module';
import { DomainsModule } from '../../../store/domains.module';
import { CategoriesModule } from '../../../store/categories.module';
import { StripsModule } from '../../../store/strips.module';
import { ArticulationsModule } from '../../../store/articulations.module';
import { AppModule } from '../../../store/app';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({
  components: {
    Model,
  },
})
export default class Detail extends Vue {
  activity = null;

  onCancel() {
    this.$router.push(`/dashboard/activities`);
  }

  async beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate');

    const activity = ActivitiesModule.activity
      .query()
      .whereId(to.params.activity)
      .with(['type.domain', 'category', 'subCategory.category'])
      .first();

    this.activity = activity;

    if (this.activity.metadata.slides.length > 0) {
      this.activity.metadata.slides.forEach((s) => {
        s.path = `/storage/${this.activity.type.domain.name}/${
          this.activity.type.name
        }/${this.activity._id}/thumbnails/__FILE__`;
      });
    }

    next();
  }

  async beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter..');

    const activity = ActivitiesModule.activity
      .query()
      .whereId(to.params.activity)
      .with(['type.domain', 'category', 'subCategory.category'])
      .first();

    if (!activity) {
      debugger;
    }

    next((vm) => {
      vm.activity = activity;

      if (vm.activity.metadata.slides.length > 0) {
        vm.activity.metadata.slides.forEach((s) => {
          s.path = `/storage/${vm.activity.type.domain.name}/${
            vm.activity.type.name
          }/${vm.activity._id}/thumbnails/__FILE__`;

          console.log({ p: s.path });
        });
      }
    });
  }

  async onSubmit() {
    console.log({ activity: this.activity });
    await ActivitiesModule.add({ activity: this.activity });
    Message({
      message: 'saved',
      type: 'success',
      duration: 5 * 1000,
    });
    // this.$router.push(`/dashboard/activities/${this.activity._id}`);
    console.log('done');
  }

  async onDelete() {
    this.$confirm(
      'This will permanently delete the activity. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )
      .then(async () => {
        await ActivitiesModule.remove({ activity: this.activity });
        this.$message({
          message: 'Delete completed',
          type: 'success',
          duration: 5 * 1000,
        });
        console.log('done');
        this.$router.push(`/dashboard/activities`);
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled',
        });
      });
  }
}
</script>
