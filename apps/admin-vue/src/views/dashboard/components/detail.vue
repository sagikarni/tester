<template>
  <div>
    <Model :add="false" :activity="activity" />

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
        s.path = `/storage/${this.activity.type.domain.name}/${
          this.activity.type.name
        }/${this.activity._id}/thumbnails/__FILE__`;
      });
    }

    // const res = await request({
    //   url: `/api/v1/activities/${to.params.activity}`,
    //   method: 'get',
    //   baseURL: '',
    // });

    // this.activity = (res as any).activity;

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
    // const res = await request({
    //   url: `/api/v1/activities/${to.params.activity}`,
    //   method: 'get',
    //   baseURL: '',
    // });

    next((vm) => {
      // debugger;
      vm.activity = activity;

      // vm.activity.options = [];
      // if (vm.activity.free) vm.activity.options.push('Free');
      // if (vm.activity.printable) vm.activity.options.push('Printable');
      // if (vm.activity.editorial) vm.activity.options.push('Editorial');
      // if (vm.activity.isolate) vm.activity.options.push('Isolate');

      // debugger;
      //       const d = lodash.filter(vm.activity.model.slides, { media: [ ]});
      // debugger;

      // vm.activity.media = [];
      if (vm.activity.model.slides.length > 0) {
        vm.activity.model.slides.forEach((s) => {
          s.path = `/storage/${vm.activity.type.domain.name}/${
            vm.activity.type.name
          }/${vm.activity._id}/thumbnails/__FILE__`;
        });
      }
    });

    // this.activity.options = [];
    // if (this.activity.free) this.activity.options.push('Free');
    // if (this.activity.printable) this.activity.options.push('Printable');
    // if (this.activity.editorial) this.activity.options.push('Editorial');
    // if (this.activity.isolate) this.activity.options.push('Isolate');
  }

  form = {
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [''],
    resource: '',
    desc: '',
  };

  async onSubmit() {
    console.log('submit!', this.activity);

    const res: any = await request({
      url: `/api/v1/activities`,
      method: 'post',
      baseURL: '',
      data: { activity: this.activity },
    });

    Message({
      message: 'saved',
      type: 'success',
      duration: 5 * 1000,
    });

    ActivitiesModule.UpdateActivity(res.activity);

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
        const res = await request({
          url: `/api/v1/activities/${this.activity._id}`,
          method: 'delete',
          baseURL: '',
          data: { activity: this.activity },
        });

        this.$message({
          message: 'Delete completed',
          type: 'success',
          duration: 5 * 1000,
        });

        ActivitiesModule.RemoveActivity(this.activity._id);

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
