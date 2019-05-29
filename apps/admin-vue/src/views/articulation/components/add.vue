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
import { ActivitiesModule } from '../../../store/activities.module';
import { DomainsModule } from '../../../store/domains.module';
import { CategoriesModule } from '../../../store/categories.module';
import { StripsModule } from '../../../store/strips.module';
import { ArticulationsModule } from '../../../store/articulations.module';
import { AppModule } from '../../../store/app';

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
  public activity = {
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

  public region = '';

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
    this.$router.push(`/dashboard/activities`);
  }

  public async onSubmit() {
    console.log('submit!', this.activity);

    // const res: any = await request({
    //   url: `/api/v1/activities`,
    //   method: 'post',
    //   baseURL: '',
    //   data: { activity: this.activity },
    // });

    Message({
      message: 'saved',
      type: 'success',
      duration: 5 * 1000,
    });

throw 'TODO onSubn=mit!';

    // await ActivitiesModule.AddActivity(res.activity);

    // this.$router.push(`/dashboard/activities/${res.activity._id}`);
    
    console.log('done');
  }
}
</script>
