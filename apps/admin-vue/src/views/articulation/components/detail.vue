<template>
  <div style="flex:1;">
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
    this.articulation = ArticulationsModule.articulation
      .query()
      .whereId(to.params.articulation)
      .first();

    next();
  }

  public async beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter..');

    const articulation = ArticulationsModule.articulation
      .query()
      .whereId(to.params.articulation)
      .first();

    if (!articulation) {
      debugger;
    }

    next((vm) => {
      // debugger;
      vm.articulation = articulation;
    });
  }

  public async onSubmit() {
    console.log('submit!', this.articulation);

    await ArticulationsModule.add({ articulation: this.articulation });

    Message({
      message: 'saved',
      type: 'success',
      duration: 5 * 1000,
    });

    console.log('done');
  }
}
</script>
