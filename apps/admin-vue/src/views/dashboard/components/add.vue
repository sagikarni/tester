<template>
  <div>
    <Model :activity="activity" :categories="categories" :subcategories="subcategories" :domains="domains"/>
    
    <el-button type="primary" @click="onSubmit">Create</el-button>
    <el-button>Cancel</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import request from '../../../utils/request';
import Model from './model.vue';

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
export default class Add extends Vue {
  activity = {
    category: {},
    // category: '5c4abb2c73f44944f87de496'
  };
  region = '';

  domains = [];

  categories = [];

  get subcategories() {
    console.log('xxxx', this.categories);
    if (!this.categories) return [];
    if (this.categories.length === 0) return [];

    let r = [];

    this.categories.forEach((a) => {
      r = [...r, ...a.subcategory];
    });

    return r;
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
      url: `/api/v1/activities/add`,
      method: 'post',
      baseURL: '',
      data: { activity: this.activity },
    });

console.log(`---> ${res.up[0]._id}`);
    this.$router.push(`/dashboard/${res.up[0]._id}`);
    // res.up[0]._id;

    console.log('done');
  }

  async beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter..');

    const res2 = await request({
      url: `/api/v1/categories`,
      method: 'get',
      baseURL: '',
    });
    
    const res3 = await request({
      url: `/api/v1/domains`,
      method: 'get',
      baseURL: '',
    });

    next((vm) => {
      // debugger;this.items = r.activities;

      vm.categories = (res2 as any).categories;
      vm.domains = (res3 as any).domains;


      //  options3: [{
      //     label: 'Popular cities',
      //     options: [{
      //       value: 'Shanghai',
      //       label: 'Shanghai'
      //     }, {
      //       value: 'Beijing',
      //       label: 'Beijing'
      //     }]
      //   }, {
      //     label: 'City name',
      //     options: [{
      //       value: 'Chengdu',
      //       label: 'Chengdu'
      //     }, {
      //       value: 'Shenzhen',
      //       label: 'Shenzhen'
      //     }, {
      //       value: 'Guangzhou',
      //       label: 'Guangzhou'
      //     }, {
      //       value: 'Dalian',
      //       label: 'Dalian'
      //     }]
      //   }],


    });
  }
}
</script>