<template>
  <div>
    <Model
      :add="false"
      :activity="activity"
      :categories="categories"
      :subcategories="subcategories"
      :domains="domains"
    />

    <el-button type="primary" @click="onSubmit">Save</el-button>
    <el-button>Cancel</el-button>

    <el-button @click="onDelete">Delete</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import request from '../../../utils/request';
import Model from './model.vue';
import { Message, MessageBox } from 'element-ui';
import { ActivitiesModule } from '@/store/modules/activities';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({
  // beforeRouteEnter(to, from, next) {
  //   console.log('beforeRouteEnter');
  //   next();
  // }
  components: {
    Model,
  },
})
export default class Detail extends Vue {
  activity = null;

  get categories() {
    return ActivitiesModule.categories;
  }

  get subcategories() {
    return ActivitiesModule.subcategories;
  }

  get domains() {
    return ActivitiesModule.domains;
  }

  async beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate');

    const res = await request({
      url: `/api/v1/activities/${to.params.activity}`,
      method: 'get',
      baseURL: '',
    });

    this.activity = (res as any).activity;

    next();
  }

  async beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter..');

    const res = await request({
      url: `/api/v1/activities/${to.params.activity}`,
      method: 'get',
      baseURL: '',
    });

    next((vm) => {
      // debugger;
      vm.activity = (res as any).activity;

      vm.activity.options = [];
      if (vm.activity.free) vm.activity.options.push('Free');
      if (vm.activity.printable) vm.activity.options.push('Printable');
      if (vm.activity.editorial) vm.activity.options.push('Editorial');
      if (vm.activity.isolate) vm.activity.options.push('Isolate');

      console.log('x', vm.categories);
      console.log(vm.activity);
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

    const res = await request({
      url: `/api/v1/activities/${this.activity._id}`,
      method: 'post',
      baseURL: '',
      data: { activity: this.activity },
    });

    Message({
      message: 'saved',
      type: 'success',
      duration: 5 * 1000,
    });

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

        console.log('done');

        this.$router.push(`/dashboard`);
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