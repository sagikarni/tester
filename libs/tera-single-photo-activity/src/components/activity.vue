<template>
  <div>
    <!-- <error-pane ref="errorPane"></error-pane> -->
    <!-- <section class="ex-activity-details-component">
      <v-layout row wrap class="mb-3">
        <v-flex xs3>
          <!-- <back-button></back-button> --
        </v-flex>
        <v-flex xs9 class="text-xs-right" style="align-self: center">
          <!-- <social-share></social-share> -->
    <!-- <div class="menu" @click="makePin(isPinned)">
            <pin-unpin-button :isPinned="isPinned" :loading="loading" :disabled="loading"></pin-unpin-button>
          </div> --
        </v-flex>
      </v-layout>
      <!-- <activity-main-details :activityMainDetailsInfo="activityMainDetailsInfo"></activity-main-details>
      <div class="ex-session-info mt-3 pt-3">
       
        <session-length @sessionInfoIdChanged="changedSessionInfoId" :sessionLengthInfo="sessionsInfo" :sessionSelectedItem="sessionSelectedItem"></session-length>
      </div>--
      
      <h3>locale.activities.galleryText</h3>
<!--
      <image-gallery :imageGalleryInfo="imageGalleryInfo" :filterId="sessionBtnId" :sessionBtnDescription="sessionBtnDescription">

      </image-gallery> --
    </section>
    <!-- <div v-for='(photo, index) in allImagesForCaching' :key="index">
      <img style="display:none" :src="getImagePath(photo.imgSrc, getMediaTypes.Content)" />
        </div> -->
    <v-btn large color="primary" class="lets_start" to="1/start">
      $locale.activities.sessionsInfo.startText
    </v-btn>

    <h3>locale.activities.galleryText</h3>

    <v-radio-group v-model="sessionLong" row>
      <v-radio label="this.$locale.activities.sessionsInfo.shortText Session 6 $locale.general.slidesText" value="1"></v-radio>
      <v-radio label="this.$locale.activities.sessionsInfo.mediumText Session 12 $locale.general.slidesText" value="2"></v-radio>
      <v-radio label="this.$locale.activities.sessionsInfo.longText Session 18 $locale.general.slidesText" value="3"></v-radio>
    </v-radio-group>

    <div v-if="currentActivity">
        {{ currentActivity }}

      <v-subheader>What's inside:</v-subheader>
      <v-container fluid grid-list-sm>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 v-for="(thumbnail, index) in currentActivity.details.images" :key="index">

            <v-card id="card1" flat tile :disabled="thumbnail.filterInfo.indexOf(+sessionLong) === -1">

              <v-img :src="`${currentActivity.details.baseFolder}/thumbnails/${thumbnail.imgSrc}`" :lazy-src="`${currentActivity.details.baseFolder}/preload/${thumbnail.imgSrc}`" aspect-ratio="1.5">
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>
              <p class="img_content">
                $locale.activities.notIncluded.text sessionDescription $locale.activities.notIncluded.session</p>

            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

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
export default class ActivityPage extends Vue {
  public sessionLong = 1;

  @Activities.Action(GET_ACTIVITY)
  getActivity: any;

  @Activities.Getter('currentActivity')
  currentActivity: any;

  @Watch('$route', { immediate: true, deep: true })
  on$routeChanged(val: any, oldVal: any) {
    this.loadActivity(+val.params.activityId);
  }

  loadActivity(activity: number) {
    this.getActivity({ activity });
  }

  // public startCaching: boolean = false;
  public drawContent: boolean = false;
  // public activityId: string = '1'; // TODO need to remove default value = '1'
  // public isPinned: boolean = false;
  // public showErrorPane: boolean = false;
  // public loading?: boolean = false;
  // public sessionSelectedItem?: string = 'Long';
  // public sessionSelectedItemId?: number = 3;
  // public noDeviceSleep: any;
  // public sessionsInfoArray: any = [
  //   {
  //     id: 1,
  //     description: `this.$locale.activities.sessionsInfo.shortText`,
  //     slidesCount: 6
  //   },
  //   {
  //     id: 2,
  //     description: `this.$locale.activities.sessionsInfo.mediumText`,
  //     slidesCount: 12
  //   },
  //   {
  //     id: 3,
  //     description: `this.$locale.activities.sessionsInfo.longText`,
  //     slidesCount: 18
  //   }
  // ];

  // @State(state => state.reloadActivityDetails)
  // public reloadActivityDetails?: boolean;
  // @State(state => state.activities.activity.details.hasDifferentSessionLength)
  // public hasDifferentSessionLength?: boolean;
  // @State(state => state.errorPane)
  // public errorPane?: any;
  // @State(state => state.activities.activity)
  // public activityState?: any;
  // @State(
  //   state =>
  //     state.activities.activity &&
  //     state.activities.activity.details &&
  //     state.activities.activity.details.selectedSessionInfoId
  // )
  // public selectedSessionInfoId?: number;
  // @Action('updateActivity', { namespace })
  // public updateActivity?: any;
  // @Action('getActivity', { namespace })
  // public getActivity?: any;
  // @Action('pinActivity', { namespace })
  // public pinActivity?: any;
  // @Action('updateSessionInfoType', { namespace })
  // public updateSessionInfoType: any;
  // @Action('errorPaneAction') public errorPaneAction?: any;
  // @Action('changeReloadActivityDetails')
  // public changeReloadActivityDetails?: any;
  // @Action('executeActivity', { namespace })
  // public executeActivity?: any;

  // @Watch('activityMainDetailsInfo')
  // public onPropertyChanged(
  //   value: ActivityMainDetailsInfo,
  //   oldValue: ActivityMainDetailsInfo
  // ) {
  //   if (value.dataExist) {
  //     this.show();
  //   }
  // }

  // @Watch('errorPane')
  // public onPropertyChanged2(value: GeneralError, oldValue: GeneralError) {
  //   const el: any = this.$refs.errorPane;
  //   console.log('errror here?');
  //   // el.showError(value);
  // }

  // get sessionsInfo(): any[] {
  //   let sessionsInfo: any[] = [];
  //   if (
  //     this.activityState &&
  //     this.activityState.details &&
  //     this.activityState.details.hasDifferentSessionLength
  //   ) {
  //     sessionsInfo = this.sessionsInfoArray;
  //   }
  //   return sessionsInfo;
  // }

  // get getMediaTypes(): any {
  //   return ImageType;
  // }

  // get activityMainDetailsInfo(): ActivityMainDetailsInfo {
  //   const detailsInfo = new ActivityMainDetailsInfo();

  //   if (this.activityState && this.activityState.details) {
  //     detailsInfo.dataExist = true;
  //     detailsInfo.title = this.activityState.details.title;
  //     detailsInfo.description = this.activityState.details.description;
  //     detailsInfo.coverPhoto = this.activityState.details.coverPhoto;
  //     detailsInfo.mediaCount = this.activityState.details.mediaCount;
  //     detailsInfo.mediaType = this.activityState.details.mediaType;
  //     detailsInfo.orientation = this.activityState.details.orientation;
  //     if (detailsInfo.mediaType === MediaType.Photo) {
  //       detailsInfo.mediaTypeText = this.$locale.activities.activityDetails.photoBasedText;
  //       detailsInfo.mediaTypeIconClass = 'far fa-image';
  //     } else if (detailsInfo.mediaType === MediaType.Video) {
  //       detailsInfo.mediaTypeText = this.$locale.activities.activityDetails.videoBasedText;
  //       detailsInfo.mediaTypeIconClass = 'fas fa-play-circle';
  //     }
  //     if (detailsInfo.orientation === Orientation.Landscape) {
  //       detailsInfo.orientationText = this.$locale.activities.activityDetails.landscapeText;
  //       detailsInfo.orientationIconClass = 'ex-landscape';
  //     } else if (detailsInfo.orientation === Orientation.Portrait) {
  //       detailsInfo.orientationText = this.$locale.activities.activityDetails.portraitText;
  //       detailsInfo.orientationIconClass = 'ex-portrait';
  //     }
  //   }
  //   return detailsInfo;
  // }

  // get imageGalleryInfo(): ImageInfo {
  //   const imageGalleryInfo = new ImageInfo();
  //   if (this.activityState && this.activityState.details) {
  //     imageGalleryInfo.thumbnails = this.activityState.details.images;
  //   }
  //   return imageGalleryInfo;
  // }

  // get sessionBtnId(): number | undefined {
  //   if (this.selectedSessionInfoId && this.sessionsInfo) {
  //     return this.selectedSessionInfoId;
  //   } else {
  //     return this.sessionSelectedItemId;
  //   }
  // }

  // get sessionBtnDescription(): string | undefined {
  //   if (this.selectedSessionInfoId && this.sessionsInfo) {
  //     debugger;
  //     return this.sessionsInfo[this.selectedSessionInfoId - 1]['description'];
  //   } else {
  //     return this.sessionSelectedItem;
  //   }
  // }

  // public changedSessionInfoId(selectedSessionInfo: any) {
  //   this.updateSessionInfoType({ selectedSessionInfo });
  //   this.sessionSelectedItemId = selectedSessionInfo.id;
  //   this.sessionSelectedItem = selectedSessionInfo.description;
  // }

  // get allImages(): any[] {
  //   return (
  //     this.activityState &&
  //     this.activityState.details &&
  //     this.activityState.details.images
  //   );
  // }

  // get allImagesForCaching(): any[] {
  //   return (
  //     this.startCaching &&
  //     this.activityState &&
  //     this.activityState.details &&
  //     this.activityState.details.images
  //   );
  // }

  // public created() {
  //   if (this.$route.params.activityId) {
  //     this.activityId = this.$route.params.activityId;
  //     if (this.reloadActivityDetails === false && this.activityState) {
  //       const activityState = JSON.parse(JSON.stringify(this.activityState));

  //       if (activityState && activityState.details) {
  //         this.updateActivity({ activity: undefined });
  //         this.updateActivity({ activity: activityState });
  //         this.sessionSelectedItem =
  //           activityState.details.selectedSessionInfoDesc;
  //         this.show();

  //         this.changeReloadActivityDetails({ status: true }); // Need to reload form api the activities
  //       }
  //     } else {
  //       this.getActivity({ activity: this.activityId })
  //         .then((res: any) => {
  //           if (res.status === 500) {
  //             this.showErrorPane = true;
  //             this.errorPaneAction({ message: undefined });
  //           } else if (res.status === 404) {
  //             this.showErrorPane = true;
  //             this.errorPaneAction({
  //               message: this.$locale.activities.activityNotFound
  //             });
  //           } else {
  //             this.showErrorPane = false; // Important for hide error pane and show the activity section
  //           }
  //           setTimeout(() => {
  //             this.startCaching = true; // delay the fetch of the content images to avoid race condition with the thumbnails
  //           }, 1000);
  //           this.isPinned =
  //             res.data && res.data.details && res.data.details.isPinned;
  //         })
  //         .catch((err: any) => {
  //           this.showErrorPane = true;
  //           this.errorPaneAction({
  //             message: this.$locale.general.somethingWentWrong
  //           });
  //         });
  //     }
  //   } else {
  //     this.showErrorPane = true;
  //     this.errorPaneAction({
  //       message: this.$locale.activities.noActivityChosen
  //     });
  //   }
  // }

  // public show(): void {
  //   this.drawContent = true;
  //   setTimeout(() => {
  //     (TimelineMax as any).to('.ex-activity-details-component', 3, {
  //       opacity: 1
  //     });
  //   }, 30);
  // }

  // public makePin(isPinned: boolean) {
  //   this['loading'] = !this['loading'];
  //   this.pinActivity({ activity: this.activityId, pin: !isPinned })
  //     .then((res: any) => {
  //       if (res.data && res.data.status === true) {
  //         if (this.activityState && this.activityState.details) {
  //           this['loading'] = false;
  //           if (this.activityState.details.isPinned === true) {
  //             // Pinned
  //             this.$toast.success(
  //               this.$locale.activities.pinSuccessText,
  //               '',
  //               this.$notificationSystem.options.success
  //             );
  //           } else {
  //             // Unpinned
  //             this.$toast.success(
  //               this.$locale.activities.unPinSuccessText,
  //               '',
  //               this.$notificationSystem.options.success
  //             );
  //           }
  //           this.isPinned = this.activityState.details.isPinned;
  //         }
  //       } else {
  //         this.$toast.error(
  //           this.$locale.activities.pinErrorText,
  //           '',
  //           this.$notificationSystem.options.error
  //         );
  //       }
  //     })
  //     .catch((err: any) => {
  //       this.$toast.error(
  //         err.toString(),
  //         '',
  //         this.$notificationSystem.options.error
  //       );
  //     });
  // }

  // public startActivityClick() {
  //   this.noDeviceSleep = new NoSleep();
  //   this.noDeviceSleep.enable();
  //   this.executeActivity().then((res: any) => {
  //     this.$router.push(res.url + this.activityId);
  //   });
  // }
}
</script>
<style>
.menu {
  display: inline-block;
}

.img_content {
  position: absolute;
  width: 100%;
  left: 0;
  text-align: center;
  padding: 0 10px;
  height: 100%;
  top: 0;
  display: none;
}

#card1[disabled] .img_content {
  background: rgba(0, 0, 0, 0.7);
  display: block;
  color: #fff;
}
</style>