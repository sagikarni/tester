<template>
  <el-form ref="form" :model="form" label-width="120px" v-if="activity">
    <el-form-item label="Activity Type">
      <el-select
        :disabled="!add"
        value-key="_id"
        v-model="activity.type"
        placeholder="Activity Type"
      >
        <el-option v-for="item in types" :key="item._id" :label="item.name" :value="item"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Storage" v-if="activity.type">
      <span>{{ storageUrl }}</span>
    </el-form-item>

    <el-form-item label="Cover" v-if="activity.type">
      <img
        width="150px"
        height="100px"
        :src="
          `/storage/${activity.type.domain.name}/${activity.type.name}/${
            activity._id
          }/cover-l.jpg`
        "
      >
    </el-form-item>

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
        <el-option label="Started" value="Started"></el-option>
        <el-option label="WaitingForReview" value="WaitingForReview"></el-option>
        <el-option label="TechnicalWriterPending" value="TechnicalWriterPending"></el-option>
        <el-option label="TechnicalWriterApproved" value="TechnicalWriterApproved"></el-option>
        <el-option label="Ready" value="Ready"></el-option>
        <el-option label="Published" value="Published"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Category">
      <el-col :span="11">
        <el-select
          style="width: 100%;"
          v-model="activity.category"
          placeholder="please select your zone"
          clearable
          value-key="_id"
        >
          <el-option
            :key="category._id"
            :label="category.name"
            :value="category"
            v-for="category in categories"
          ></el-option>
        </el-select>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-select
          style="width: 100%;"
          v-model="activity.subCategory"
          placeholder="please select your zone"
          clearable
          value-key="_id"
        >
          <el-option
            :key="subCategory._id"
            :label="subCategory.name"
            :value="subCategory"
            v-for="subCategory in filterX"
          ></el-option>
        </el-select>
      </el-col>
    </el-form-item>

    <el-form-item label="Orientation">
      <el-select v-model="activity.orientation" placeholder="please select your zone">
        <el-option label="Landscape" value="Landscape"></el-option>
        <el-option label="Portrait" value="Portrait"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Level">
      <el-select v-model="activity.level" placeholder="please select your zone" multiple>
        <el-option label="Basic" value="Basic"/>
        <el-option label="Intermediate" value="Intermediate"/>
        <el-option label="Advanced" value="Advanced"/>
      </el-select>
    </el-form-item>

    <el-form-item label="Properties">
      <el-checkbox v-model="activity.free">Free</el-checkbox>
      <el-checkbox v-model="activity.printable">Printable</el-checkbox>
      <el-checkbox v-model="activity.editorial">Editorial</el-checkbox>
      <el-checkbox v-model="activity.isolate">Isolate</el-checkbox>
    </el-form-item>

    <el-form-item label="Notes">
      <el-input type="textarea" v-model="activity.notes"></el-input>
    </el-form-item>

    <component v-if="activity.type" :is="activity.type.name" v-model="activity.metadata"></component>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';
// import request from '../../../utils/request';
import draggable from 'vuedraggable';
// import {VueTransmit} from 'vue-transmit';
import dropper from './dropper.vue';
// Component.registerHooks([
//   'beforeRouteEnter',
//   'beforeRouteLeave',
//   'beforeRouteUpdate', // for vue-router 2.2+
// ]);
import Plain from './Plain.vue';
import Facts from './Facts.vue';
import Questions from './Questions.vue';
import Categorization from './Categorization.vue';
import PhotoAssembly from './PhotoAssembly.vue';
import WhatsInThePicture from './WhatsInThePicture.vue';
import MemoryCards from './MemoryCards.vue';
import WhatIsWrong from './WhatIsWrong.vue';
import Zoom from './Zoom.vue';
import SpotTheDifference from './SpotTheDifference.vue';
import ISee from './ISee.vue';
import Meaning from './Meaning.vue';
import WHQuestions from './WHQuestions.vue';
import GoodStory from './GoodStory.vue';
import SoundOfLifePhoto from './SoundOfLifePhoto.vue';
// import conf from './c.json';

import { ActivitiesModule } from '../../../store/activities.module';
import { DomainsModule } from '../../../store/domains.module';
import { CategoriesModule } from '../../../store/categories.module';
import { StripsModule } from '../../../store/strips.module';
import { ArticulationsModule } from '../../../store/articulations.module';
import { AppModule } from '../../../store/app';

@Component({
  components: {
    draggable,
    // "vue-transmit": VueTransmit
    dropper,
    Plain,
    Facts,
    Questions,
    Categorization,
    PhotoAssembly,
    WhatsInThePicture,
    MemoryCards,
    WhatIsWrong,
    Zoom,
    SpotTheDifference,
    ISee,
    Meaning,
    WHQuestions,
    GoodStory,
    SoundOfLifePhoto,
    // WhatsInThePicture //() => import('./WhatsInThePicture.vue').then(d => d.default),
  },
  filters: {
    json(value) {
      return JSON.stringify(value, null, 2);
    },
  },
})
export default class Modely extends Vue {
  get categories() {
    return CategoriesModule.category.all();
  }

  get subcategories() {
    return CategoriesModule.subCategory.all();
  }

  get domains() {
    return DomainsModule.domain.all();
  }

  get types() {
    return DomainsModule.types
      .query()
      .with('domain')
      .all();
  }

  get storageUrl() {
    return `E:/sagi-tera-files/${this.activity.type.domain.name}/${
      this.activity.type.name
    }/${this.activity._id}`;
    return '';
  }

  get filterX() {
    if (!this.activity.category) { return null; }
    // const a = CategoriesModule.subCategory.query()
    // .where('category._id', this.activity.category._id).all(); //5c67e5a1c7cc90124ccfaf47
    // return a;

    const a = CategoriesModule.subCategory
      .query()
      .with('category')
      .all();

    const y = a.filter((aa: any) => aa.category._id === this.activity.category._id);
    //     .with('category', (query) => {
    //   query.where('_id', this.activity.category._id)
    // }).get();
    console.log({ y });
    return y;
    // return a.filter(b => b.category._id === this.);

    // find({ wh}) filter(
    //   (t) => t.category._id === this.activity.category
    // );

    // if (!this.activity.category) {
    //   return [];
    // }

    // return this.subcategories.filter(
    //   (xx) => xx.category === this.activity.category._id
    // );
  }

  @Prop() activity;

  @Prop() add;

  conf = {
    WhatsInThePicture: ['phrases'],
    SpotTheDifference: ['mediaIndex'],
    PhotoAssembly: ['picker'],
  };

  slides = [];
  myArray = [];
  d = 1;
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

  //   //     }); // needs to be called to confirm the navigation
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
  getType(type) {
    throw new Error('TODO getType');
    // return DomainModule.types.find((t) => t._id === type);
  }

  getCurrentType() {
    throw new Error('TODO get curren');
    // return DomainModule.types.find((t) => t._id === this.activity.type);
  }

  // mounted() {

  // }

  removeSlide(index) {
    this.activity.slides.splice(index, 1);
  }

  some() {
    // const files = this.$refs.myVueDropzone[0].getQueuedFiles();

    // console.log({ files });

    const img = new Image();
    // img.src = 'https://rowanwins.github.io/vue-dropzone/docs/dist/vue2-dropzone1.png?93d2bf4221b4c9873561d5644497b414';
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

  addSlide() {
    // this.slides.push({ id: this.d, name: `name ${this.d}` });
    this.activity.slides.push({
      media: [],
      model: {
        phrases: ['value1', 'value2'],
        mediaIndex: '3',
        size: '3',
        audio: [],
        categoryIndex: '',
      },
    });
    this.d++;
  }

  onSubmit() {
    console.log('submit!');
  }
}
</script>
