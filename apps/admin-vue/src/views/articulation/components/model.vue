<template>
  <el-form :model="form" label-width="120px" v-if="articulation">
    <el-form-item label="Storage">
      <span>{{ storageUrl }}</span>
    </el-form-item>

    <el-form-item label="Title">
      <el-input v-model="articulation.title"></el-input>
    </el-form-item>

    <el-form-item label="Description">
      <el-input type="textarea" v-model="articulation.description"></el-input>
    </el-form-item>

    <el-form-item label="Notes">
      <el-input type="textarea" v-model="articulation.notes"></el-input>
    </el-form-item>
    <el-tabs value="syllable">
      <el-tab-pane label="Syllable" name="syllable">
        <ag-grid-vue
          style="width: 700px;height: 500px"
          class="ag-theme-balham"
          :columnDefs="syllableColumnDefs"
          :rowData="articulation.model.syllable"
          :context="context"
          :frameworkComponents="frameworkComponents"
          rowHeight="30"
        ></ag-grid-vue>
      </el-tab-pane>
      <el-tab-pane label="By Blend" name="blend" :disabled="!articulation.model.blend.length">
        <ag-grid-vue
          style="width:700px;height:500px"
          class="ag-theme-balham"
          :columnDefs="blendColumnDefs"
          :rowData="articulation.model.blend"
          :context="context"
          :frameworkComponents="frameworkComponents"
          rowHeight="30"
        ></ag-grid-vue>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';
// import request from '../../../utils/request';
import draggable from 'vuedraggable';
// import {VueTransmit} from 'vue-transmit';
import dropper from './dropper.vue';
import { AgGridVue } from 'ag-grid-vue';

// Component.registerHooks([
//   'beforeRouteEnter',
//   'beforeRouteLeave',
//   'beforeRouteUpdate', // for vue-router 2.2+
// ]);
// import Plain from './Plain.vue';
// import Facts from './Facts.vue';
// import Questions from './Questions.vue';
// import Categorization from './Categorization.vue';
// import PhotoAssembly from './PhotoAssembly.vue';
// import WhatsInThePicture from './WhatsInThePicture.vue';
// import MemoryCards from './MemoryCards.vue';
// import WhatIsWrong from './WhatIsWrong.vue';
// import Zoom from './Zoom.vue';
// import SpotTheDifference from './SpotTheDifference.vue';
// import ISee from './ISee.vue';
// import Meaning from './Meaning.vue';
// import WHQuestions from './WHQuestions.vue';
// import GoodStory from './GoodStory.vue';
// import SoundOfLifePhoto from './SoundOfLifePhoto.vue';
import { ActivitiesModule } from '../../../store/modules/activities';

import DeleteCell from './delete-cell.vue';

@Component({
  components: {
    DeleteCell,
    AgGridVue,
    draggable,
    // "vue-transmit": VueTransmit
    dropper,
    // Plain,
    // Facts,
    // Questions,
    // Categorization,
    // PhotoAssembly,
    // WhatsInThePicture,
    // MemoryCards,
    // WhatIsWrong,
    // Zoom,
    // SpotTheDifference,
    // ISee,
    // Meaning,
    // WHQuestions,
    // GoodStory,
    // SoundOfLifePhoto,
    // WhatsInThePicture //() => import('./WhatsInThePicture.vue').then(d => d.default),
  },
  filters: {
    json(value) {
      return JSON.stringify(value, null, 2);
    },
  },
})
export default class Modely extends Vue {
  get storageUrl() {
    return `E:/sagi-tera-files/`; // ${this.articulation.type.domain.name}/${this.articulation.type.name}/${this.articulation._id}`;
  }
  public context;
  public frameworkComponents;

  public syllableColumnDefs = [
    {
      cellRenderer: 'deleteCell',
    },
    { headerName: 'Text', field: 'text' },
    { headerName: 'Type', field: 'type' },
    { headerName: 'Emphasis', field: 'emphasis' },
    { headerName: 'Location', field: 'location' },
    { headerName: 'Syllable', field: 'syllable' },
    { headerName: 'Image', field: 'image' },
    { headerName: 'Isolate', field: 'isolate' },
    { headerName: 'Recording', field: 'recording' },
  ];

  public blendColumnDefs = [
    { headerName: 'Text', field: 'text' },
    { headerName: 'Type', field: 'type' },
    { headerName: 'Emphasis', field: 'emphasis' },
    { headerName: 'Blend', field: 'blend' },
    { headerName: 'Image', field: 'image' },
    { headerName: 'Isolate', field: 'isolate' },
    { headerName: 'Recording', field: 'recording' },
  ];

  @Prop() public articulation;

  @Prop() public add;

  public conf = {
    WhatsInThePicture: ['phrases'],
    SpotTheDifference: ['mediaIndex'],
    PhotoAssembly: ['picker'],
  };

  public slides = [];
  public myArray = [];
  public d = 1;

  // get filterX() {
  //   if (!this.activity.category) return [];

  //   return this.subcategories.filter(
  //     (xx) => xx.category === this.activity.category._id
  //   );
  // }

  // addSlide() {
  //   //this.slides.push({ id: this.d, name: `name ${this.d}` });
  //   this.activity.slides.push({
  //     media: [],
  //     model: {
  //       phrases: ['value1', 'value2'],
  //       mediaIndex: '3',
  //       size: '3',
  //       audio: [],
  //       categoryIndex: '',
  //     },
  //   });
  //   this.d++;
  // }
  // activity2 = null;

  // @Watch('activity')
  // onChildChanged(val: any, oldVal: any) {
  //   console.log('here', val);
  //   this.activity2 = val;
  //  }

  //   categories;

  //   async beforeRouteUpdate(to, from, next) {
  //     console.log('beforeRouteUpdate');

  //     const res = await request({
  //       url: `/api/v1/activities/${to.params.activity}`,
  //       method: 'get',
  //       baseURL: '',
  //     });

  //     this.activity = (res as any).activity;

  //       this.activity.options = [];
  //       if (this.activity.free) this.activity.options.push('Free');
  //       if (this.activity.printable) this.activity.options.push('Printable');
  //       if (this.activity.editorial) this.activity.options.push('Editorial');
  //       if (this.activity.isolate) this.activity.options.push('Isolate');
  //     next();
  //   }

  //   async beforeRouteEnter(to, from, next) {
  //     console.log('beforeRouteEnter..');

  //     const res = await request({
  //       url: `/api/v1/activities/${to.params.activity}`,
  //       method: 'get',
  //       baseURL: '',
  //     });

  //     const res2 = await request({
  //       url: `/api/v1/categories`,
  //       method: 'get',
  //       baseURL: '',
  //     });

  //     next((vm) => {
  //       // debugger;
  //       vm.activity = (res as any).activity;

  //       vm.activity.options = [];
  //       if (vm.activity.free) vm.activity.options.push('Free');
  //       if (vm.activity.printable) vm.activity.options.push('Printable');
  //       if (vm.activity.editorial) vm.activity.options.push('Editorial');
  //       if (vm.activity.isolate) vm.activity.options.push('Isolate');

  //       vm.categories = (res2 as any).categories;

  // console.log('x', vm.categories);
  //       console.log(vm.activity);

  //     });

  //     // this.activity.options = [];
  //     // if (this.activity.free) this.activity.options.push('Free');
  //     // if (this.activity.printable) this.activity.options.push('Printable');
  //     // if (this.activity.editorial) this.activity.options.push('Editorial');
  //     // if (this.activity.isolate) this.activity.options.push('Isolate');
  //   }
  //   // beforeRouteEnter(to, from, next) {
  //   //   console.log('fff');
  //   //   console.log('xxx', to.params.activity);
  //   //   request({
  //   //     url: `/api/v1/activities/${to.params.activity}`,
  //   //     method: 'get',
  //   //     baseURL: '',
  //   //   }).then((r: any) => {

  //   //     next(vm => {
  //   //     vm.activity = r.activity;
  //   //     vm.activity.options = [];
  //   //     if (vm.activity.free) vm.activity.options.push('Free');
  //   //     if (vm.activity.printable) vm.activity.options.push('Printable');
  //   //     if (vm.activity.editorial) vm.activity.options.push('Editorial');
  //   //     if (vm.activity.isolate) vm.activity.options.push('Isolate');

  //   //     })// needs to be called to confirm the navigation
  //   //   });
  //   // }

  //   //   mounted() {

  //   // request({
  //   //     url: `/api/v1/activities/${this.$route.params.activity}`,
  //   //     method: 'get',
  //   //     baseURL: ''

  //   //   }).then((r: any) => {
  //   //   console.log({ r});
  //   //     this.activity = r.activity;
  //   //     this.activity.options = [];
  //   //     if (this.activity.free) this.activity.options.push('Free');
  //   //     if (this.activity.printable) this.activity.options.push('Printable');
  //   //     if (this.activity.editorial) this.activity.options.push('Editorial');
  //   //     if (this.activity.isolate) this.activity.options.push('Isolate');

  //   //     // console.log({ x: this.items[0] });
  //   //   });
  //   // }

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

  public beforeMount() {
    this.context = { componentParent: this };
    this.frameworkComponents = {
      deleteCell: DeleteCell,
    };
  }

  public methodFromParent(cell) {
    alert('Parent Component Method from ' + cell + '!');
  }

  public onRowDoubleClicked(event) {
    console.log('fuck');
  }

  // mounted() {

  // }

  // removeSlide(index) {
  //   this.articulation.slides.splice(index, 1);
  // }

  public some() {
    // const files = this.$refs.myVueDropzone[0].getQueuedFiles();

    // console.log({ files });

    const img = new Image();
    // img.src="
    // https://rowanwins.github.io/vue-dropzone/docs/dist/vue2-dropzone1.png?93d2bf4221b4c9873561d5644497b414';
    // const mockFile = {
    //   id: 'bla',
    //   uploaded: true,
    //   path: '',
    //   size: 0,
    // };
    const file = { size: 123, name: 'Icon', type: 'image/png' };
    const url =
      'https://rowanwins.github.io/vue-dropzone/docs/dist/vue2-dropzone1.png?93d2bf4221b4c9873561d5644497b414';

    // var f = new File([""], "filename.png", { type: 'image/png' });

    const fileUrl = img.src;
    this.$refs.myVueDropzone[0].manuallyAddFile(file, url, null, null, {
      dontSubtractMaxFiles: false,
      addToFiles: true,
    });
  }

  public onSubmit() {
    console.log('submit!');
  }
}
</script
>;
