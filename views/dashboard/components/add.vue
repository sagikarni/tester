<template>
  <div>
    <Model :add="true" :activity="activity" />

    <el-button type="primary" @click="onSubmit">Create</el-button>
    <el-button @click="onCancel">Cancel</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import request from '../../../utils/request';
import Model from './model.vue';
import { Message, MessageBox } from 'element-ui';
import { ActivitiesModule } from '../../../store/modules/activities';

const ObjectId = (
  m = Math,
  d = Date,
  h = 16,
  s = (ss) => m.floor(ss).toString(h)
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
    metadata: {
      slideCategories: [],
      slides: [],
    },
  };

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

  onCancel() {
    this.$router.push(`/dashboard/activities`);
  }

  async onSubmit() {
    console.log({activity: this.activity });


    await ActivitiesModule.AddActivity(this.activity);

    Message({
      message: 'saved',
      type: 'success',
      duration: 5 * 1000,
    });

    this.$router.push(`/dashboard/activities/${this.activity._id}`);

    console.log('done');
  }
}
</script>
