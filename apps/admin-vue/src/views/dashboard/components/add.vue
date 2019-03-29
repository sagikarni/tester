<template>
  <div>
    <Model :add="true" :activity="activity"/>

    <el-button type="primary" @click="onSubmit">Create</el-button>
    <el-button @click="onCancel">Cancel</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import request from '../../../utils/request';
import Model from './model.vue';
import { Message, MessageBox } from 'element-ui';
import { ActivitiesModule } from '@/store/modules/activities';

const ObjectId = (
  m = Math,
  d = Date,
  h = 16,
  s = (s) => m.floor(s).toString(h)
) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

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
    _id: ObjectId(),
    mediaType: 'Photo',
    audience: 'All',
    level: ['Basic'],
    status: 'Started',
    orientation: 'Landscape',
    // category: {},
    model: {
      slideCategories: [],
      slides: [],
    },
  };

  onCancel() {
    this.$router.push(`/dashboard/activities`);
  }

  region = '';

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

    await ActivitiesModule.AddActivity(res.activity);

    this.$router.push(`/dashboard/activities/${res.activity._id}`);
    // res.up[0]._id;

    console.log('done');
  }
}
</script>