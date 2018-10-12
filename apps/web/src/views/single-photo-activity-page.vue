<template>
    <div v-if="items">
        <v-carousel hide-delimiters>
            <v-carousel-item>Card Deck Name</v-carousel-item>
            <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
            <v-carousel-item>Click to Exit</v-carousel-item>
        </v-carousel>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

// import BaseComponent from '@/modules/common/components/baseComponent.vue';
// import { State, Action } from 'vuex-class';
// import ActivityMainDetails from '@/modules/activities/components/activitydetails/activityMainDetails.vue';
// import ImageGallery from '@/components/imageGallery.vue';
// import SessionLength from '@/modules/activities/components/activitydetails/sessionLength.vue';
// import SocialShare from '@/modules/common/components/socialShare.vue';
// import BackButton from '@/modules/common/components/backButton.vue';
// import PinUnpinButton from '@/modules/common/components/pinUnpinButton.vue';
// import ErrorPane from '@/modules/common/components/errorPane.vue';
// import {
//   // SessionsInfo,
//   ActivityMainDetailsInfo,
//   MediaType,
//   Orientation,
//   ImageType
// } from '@/modules/activities/store/types';
// import { ImageInfo, GeneralError } from '@/modules/store/typeClasses';
// import TimelineMax from 'gsap';
// import NoSleep from 'nosleep.js';

// const namespace: string = 'activities';

@Component({})
export default class SinglePhotoActivityPage extends Vue {
  public items: any;

  constructor() {
    super();

    this.items = [
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
      }
    ];
  }
}
</script>
<style>
</style>