<template>
  <div>
    <el-button type="primary" @click="onSubmit">Save</el-button>
    <el-button @click="onCancel">Cancel</el-button>

    <Model :add="false" :articulation="articulation" style="margin:20px 0;"/>
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
  'beforeRouteUpdate', // for vue-router 2.2+F
]);

@Component({
  components: {
    Model,
  },
})
export default class Detail extends Vue {
  public articulation = null;

  public form = {
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [''],
    resource: '',
    desc: '',
  };

  public onCancel() {
    this.$router.push(`/dashboard/articulations`);
  }

  public async beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate');
    this.articulation = ActivitiesModule.articulations.find(
      (r) => r._id === to.params.articulation
    );
    // if (this.activity.model.slides.length > 0) {
    //   this.activity.model.slides.forEach((s) => {
    //     s.path = `/storage/${this.activity.type.domain.name}/${
    //       this.activity.type.name
    //     }/${this.activity._id}/thumbnails/__FILE__`;
    //   });
    // }

    // const res = await request({
    //   url: `/api/v1/activities/${to.params.activity}`,
    //   method: 'get',
    //   baseURL: '',
    // });

    // this.activity = (res as any).activity;

    next();
  }

  public async beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter..');

    const articulation = ActivitiesModule.articulations.find(
      (r) => r._id === to.params.articulation
    );

    if (!articulation) {
      debugger;
    }
    // const res = await request({
    //   url: `/api/v1/activities/${to.params.activity}`,
    //   method: 'get',
    //   baseURL: '',
    // });

    next((vm) => {
      // debugger;
      vm.articulation = articulation;

      // vm.activity.options = [];
      // if (vm.activity.free) vm.activity.options.push('Free');
      // if (vm.activity.printable) vm.activity.options.push('Printable');
      // if (vm.activity.editorial) vm.activity.options.push('Editorial');
      // if (vm.activity.isolate) vm.activity.options.push('Isolate');

      // debugger;
      //       const d = lodash.filter(vm.activity.model.slides, { media: [ ]});
      // debugger;

      // vm.activity.media = [];
      // if (vm.activity.model.slides.length > 0) {
      //   vm.activity.model.slides.forEach((s) => {
      //     s.path = `/storage/${vm.activity.type.domain.name}/${
      //       vm.activity.type.name
      //     }/${vm.activity._id}/thumbnails/__FILE__`;
      //   });
      // }
    });

    // this.activity.options = [];
    // if (this.activity.free) this.activity.options.push('Free');
    // if (this.activity.printable) this.activity.options.push('Printable');
    // if (this.activity.editorial) this.activity.options.push('Editorial');
    // if (this.activity.isolate) this.activity.options.push('Isolate');
  }

  public async onSubmit() {
    console.log('submit!', this.articulation);

    const res: any = await request({
      url: `/api/v1/articulations`,
      method: 'post',
      baseURL: '',
      data: { articulation: this.articulation },
    });

    Message({
      message: 'saved',
      type: 'success',
      duration: 5 * 1000,
    });

    ActivitiesModule.UpdateArticulation(res.articulation);

    console.log('done');
  }
}
</script>
