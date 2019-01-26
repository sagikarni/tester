<template>
  <div>
    <Model :activity="activity" :categories="categories" :subcategories="subcategories" :domains="domains"/>

    <el-button type="primary" @click="onSubmit">Save</el-button>
    <el-button>Cancel</el-button>
  </div>

  <!-- <el-form ref="form" :model="form" label-width="120px" v-if="activity">
    <el-form-item label="Activity Name">
      <el-input v-model="activity.name"></el-input>
    </el-form-item>

    <el-form-item label="Description">
      <el-input type="textarea" v-model="activity.description"></el-input>
    </el-form-item>

    <el-form-item label="Media Type">
      <el-select v-model="activity.mediaType" placeholder="please select your zone">
        <el-option label="Photo" value="Photo"></el-option>
        <el-option label="Video" value="Video"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Audience">
      <el-select v-model="activity.audience" placeholder="please select your zone">
        <el-option label="All" value="All"></el-option>
        <el-option label="Kids" value="Kids"></el-option>
        <el-option label="Elderly" value="Elderly"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Status">
      <el-select v-model="activity.status" placeholder="please select your zone">
        <el-option label="NotStarted" value="NotStarted"></el-option>
        <el-option label="JustStarted" value="JustStarted"></el-option>
        <el-option label="AlmostDone" value="AlmostDone"></el-option>
        <el-option label="WaitingPronunciation" value="WaitingPronunciation"></el-option>
        <el-option label="Reviewed" value="Reviewed"></el-option>
        <el-option label="Ready" value="Ready"></el-option>
        <el-option label="Published" value="Published"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Category">
      <el-col :span="11">
        <el-select
          style="width: 100%;"
          v-model="activity.category.name"
          placeholder="please select your zone"
        >
          <el-option :key="category.name" :label="category.name" :value="category._id" v-for="category in categories"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-select
          style="width: 100%;"
          v-model="activity.subCategory.name"
          placeholder="please select your zone"
        >
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
      </el-col>
    </el-form-item>

    <el-form-item label="Orientation">
      <el-select v-model="activity.orientation" placeholder="please select your zone">
        <el-option label="horizontal" value="horizontal"></el-option>
        <el-option label="vertical" value="vertical"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Activity options">
      <el-checkbox-group v-model="activity.options">
        <el-checkbox label="Free" name="type"></el-checkbox>
        <el-checkbox label="Printable" name="type"></el-checkbox>
        <el-checkbox label="Editorial" name="type"></el-checkbox>
        <el-checkbox label="Isolate" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="Notes">
      <el-input type="textarea" v-model="activity.notes"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>-->
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
  categories = [];
domains = [];

  get subcategories() {
    console.log('xxxx', this.categories);
    if (!this.categories) return [];
    if (this.categories.length === 0) return [];

    let r = [];

    this.categories.forEach((a) => {
      r = [...r, ...a.subcategory];
    });
    console.log({ r });
    return r;
  }

  async beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate');

    const res = await request({
      url: `/api/v1/activities/${to.params.activity}`,
      method: 'get',
      baseURL: '',
    });

    this.activity = (res as any).activity;

    // this.activity.options = [];
    // if (this.activity.free) this.activity.options.push('Free');
    // if (this.activity.printable) this.activity.options.push('Printable');
    // if (this.activity.editorial) this.activity.options.push('Editorial');
    // if (this.activity.isolate) this.activity.options.push('Isolate');
    next();
  }

  async beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter..');

    const res = await request({
      url: `/api/v1/activities/${to.params.activity}`,
      method: 'get',
      baseURL: '',
    });

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
      // debugger;
      vm.activity = (res as any).activity;

      vm.activity.options = [];
      if (vm.activity.free) vm.activity.options.push('Free');
      if (vm.activity.printable) vm.activity.options.push('Printable');
      if (vm.activity.editorial) vm.activity.options.push('Editorial');
      if (vm.activity.isolate) vm.activity.options.push('Isolate');

      vm.categories = (res2 as any).categories;
      vm.domains = (res3 as any).domains;
      console.log('x', vm.categories);
      console.log(vm.activity);
    });

    // this.activity.options = [];
    // if (this.activity.free) this.activity.options.push('Free');
    // if (this.activity.printable) this.activity.options.push('Printable');
    // if (this.activity.editorial) this.activity.options.push('Editorial');
    // if (this.activity.isolate) this.activity.options.push('Isolate');
  }
  // beforeRouteEnter(to, from, next) {
  //   console.log('fff');
  //   console.log('xxx', to.params.activity);
  //   request({
  //     url: `/api/v1/activities/${to.params.activity}`,
  //     method: 'get',
  //     baseURL: '',
  //   }).then((r: any) => {

  //     next(vm => {
  //     vm.activity = r.activity;
  //     vm.activity.options = [];
  //     if (vm.activity.free) vm.activity.options.push('Free');
  //     if (vm.activity.printable) vm.activity.options.push('Printable');
  //     if (vm.activity.editorial) vm.activity.options.push('Editorial');
  //     if (vm.activity.isolate) vm.activity.options.push('Isolate');

  //     }); // needs to be called to confirm the navigation
  //   });
  // }

  //   mounted() {

  // request({
  //     url: `/api/v1/activities/${this.$route.params.activity}`,
  //     method: 'get',
  //     baseURL: ''

  //   }).then((r: any) => {
  //   console.log({ r});
  //     this.activity = r.activity;
  //     this.activity.options = [];
  //     if (this.activity.free) this.activity.options.push('Free');
  //     if (this.activity.printable) this.activity.options.push('Printable');
  //     if (this.activity.editorial) this.activity.options.push('Editorial');
  //     if (this.activity.isolate) this.activity.options.push('Isolate');

  //     // console.log({ x: this.items[0] });
  //   });
  // }

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

    console.log('done');
  }
}
</script>