<template>
  <div>
    <div>start!</div>
    <div v-if="currentActivity">
      <!-- <activity ></activity> -->

          <component :is="component" v-if="component" 
          :activityDetailsState="currentActivity.details" :activityDetailsContent="currentActivity.content"
          />

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { Activities, GET_ACTIVITY } from '@libs/tera-activities';

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

// import PremiumCollection from '@/views/PremiumCollection.vue';

@Component({
  components: {
    //   ActivityMainDetails,
    // ImageGallery
    //   SocialShare,
    //   SessionLength,
    //   BackButton,
    //   PinUnpinButton,
    //   ErrorPane
  }
})
export default class ActivityStart extends Vue {
  @Activities.Action(GET_ACTIVITY)
  getActivity: any;

  @Activities.Getter('currentActivity')
  currentActivity: any;

  public component: any;

  constructor() {
    super();

    // start the activity
    this.getActivity({ activity: 1 });

    this.component = () => import('@/views/PremiumCollection.vue');

    // on complete: router.go('/')
  }
}
</script>
<style>
</style>