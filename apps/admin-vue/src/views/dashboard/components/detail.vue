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
import { ActivitiesModule } from '../../../store/modules/activities';
import lodash from 'lodash';
import { DomainModule } from '../../../store/modules/domains';

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

    this.activity = ActivitiesModule.activities.find(
      (r) => r._id === to.params.activity
    );

    if (this.activity.model.slides.length > 0) {
      this.activity.model.slides.forEach((s) => {
        const type = DomainModule.types.find(
          (t) => t._id === this.activity.type
        );

        s.path = `/storage/${type.domain.name}/${type.name}/${
          this.activity._id
        }/thumbnails/__FILE__`;
      });
    }

    next();
  }

  async beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter..');

    const activity = ActivitiesModule.activities.find(
      (r) => r._id === to.params.activity
    );

    if (!activity) {
      debugger;
    }

    next((vm) => {
      vm.activity = activity;
      // debugger;

      // var oldValue = vm.activity.type;

      // Object.defineProperty(vm.activity, 'type', {
      //   get: function() {
      //     return DomainModule.types.find(b => b._id === oldValue);
      //     }
      // });

      // on('activity.type', (o) => DomainModule.types.find(b => b._id === oldValue);

      // console.log({ a: vm.activity.type });
      // debugger;

      if (vm.activity.model.slides.length > 0) {
        vm.activity.model.slides.forEach((s) => {
          const type = DomainModule.types.find(
            (t) => t._id === vm.activity.type
          );

          s.path = `/storage/${type.domain.name}/${type.name}/${
            vm.activity._id
          }/thumbnails/__FILE__`;
        });
      }
    });
  }

  async onSubmit() {
    // console.log('submit!', this.activity);

    // const res: any = await request({
    //   url: `/api/v1/activities`,
    //   method: 'post',
    //   baseURL: '',
    //   data: { activity: this.activity },
    // });

    // Message({
    //   message: 'saved',
    //   type: 'success',
    //   duration: 5 * 1000,
    // });

    // ActivitiesModule.UpdateActivity(res.activity);

    // console.log('done');

    console.log({ activity: this.activity });

    await ActivitiesModule.AddActivity(this.activity);

    Message({
      message: 'saved',
      type: 'success',
      duration: 5 * 1000,
    });

    this.$router.push(`/dashboard/activities/${this.activity._id}`);

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
        await ActivitiesModule.RemoveActivity(this.activity._id);

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
