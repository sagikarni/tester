<template>
    <section class="ex-activity-details-component" v-show="drawContent" >
        <v-layout row wrap class="mb-3">
            <v-flex xs3>
                <back-button></back-button>
            </v-flex>
            <v-flex xs9 class="text-xs-right" style="align-self: center">
                <social-share></social-share>
                <div class="menu" @click="makePin"><pin-button ></pin-button></div>
            </v-flex>
        </v-layout>
        <activity-main-details :activityMainDetailsInfo="activityMainDetailsInfo"></activity-main-details>
        <div class="ex-session-info mt-3 pt-3">
            <session-length @sessionInfoIdChanged="changedSessionInfoId" :sessionLengthInfo="sessionsInfo"></session-length>
        </div>
        <h3 class="mt-5">{{ $locale.activities.galleryText }}</h3>
        <image-gallery :imageGalleryInfo="imageGalleryInfo" :filterId="sessionBtnId"></image-gallery>
    </section>
</template>

<script lang="ts">
    import { Component, Watch } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {State, Action} from 'vuex-class';
    import ActivityMainDetails from '@/modules/activities/components/activitydetails/activityMainDetails.vue';
    import ImageGallery from '@/modules/common/components/imageGallery.vue';
    import SessionLength from '@/modules/activities/components/activitydetails/sessionLength.vue';
    import SocialShare from '@/modules/common/components/socialShare.vue';
    import BackButton from '@/modules/common/components/backButton.vue';
    import PinButton from '@/modules/common/components/pinButton.vue';
    import { SessionsInfo, ActivityMainDetailsInfo, MediaType, Orientation} from "@/modules/activities/store/types";
    import { ImageInfo } from "@/modules/store/typeClasses";
    import TimelineMax from 'gsap';

    const namespace: string = 'activities';


    @Component({
        components: {
            ActivityMainDetails,
            ImageGallery,
            SocialShare,
            SessionLength,
            BackButton,
            PinButton,
        },
    })
    export default class ActivityDetails extends BaseComponent {
        public drawContent: boolean = false;
        public activityId: string = '1'; // TODO need to remove default value = '1'

        @State(state => state.activities.activity) public activityState?: any;
        @State(state => (state.activities.activity && state.activities.activity.details && state.activities.activity.details.selectedSessionInfoId)) public selectedSessionInfoId?: number;
        @Action('getActivity' , {namespace}) public getActivity?: any;
        @Action('pinActivity' , {namespace}) public pinActivity?: any;
        @Action('updateSessionInfoType' , {namespace}) public updateSessionInfoType: any;

        constructor() {
            super();
        }

        @Watch('activityMainDetailsInfo')
        public onPropertyChanged(value: ActivityMainDetailsInfo, oldValue: ActivityMainDetailsInfo) {
            if (value.dataExist) {
               this.show();
            }
        }

       get sessionsInfo(): SessionsInfo[] {
            return this.activityState && this.activityState.details && this.activityState.details.sessionsInfo;
       }

       get activityMainDetailsInfo(): ActivityMainDetailsInfo {
            const detailsInfo = new ActivityMainDetailsInfo();

            if (this.activityState && this.activityState.details) {
                detailsInfo.dataExist = true;
                detailsInfo.title = this.activityState.details.title;
                detailsInfo.description = this.activityState.details.description;
                detailsInfo.coverPhoto = this.activityState.details.coverPhoto;
                detailsInfo.mediaCount = this.activityState.details.mediaCount;
                detailsInfo.mediaType = this.activityState.details.mediaType;
                detailsInfo.orientation = this.activityState.details.orientation;

                if (detailsInfo.mediaType === MediaType.Photo) {
                    detailsInfo.mediaTypeText = this.$locale.activities.activityDetails.photoBasedText;
                    detailsInfo.mediaTypeIconClass = "far fa-image";
                } else if (detailsInfo.mediaType === MediaType.Video) {
                    detailsInfo.mediaTypeText = this.$locale.activities.activityDetails.videoBasedText;
                    detailsInfo.mediaTypeIconClass = "fas fa-play-circle";
                }

                if (detailsInfo.orientation === Orientation.Landscape) {
                    detailsInfo.orientationText = this.$locale.activities.activityDetails.landscapeText;
                    detailsInfo.orientationIconClass = "ex-landscape";
                } else if (detailsInfo.orientation === Orientation.Portrait) {
                    detailsInfo.orientationText = this.$locale.activities.activityDetails.portraitText;
                    detailsInfo.orientationIconClass = "ex-portrait";
                }
            }
            return detailsInfo;
       }

       get imageGalleryInfo(): ImageInfo {
            const imageGalleryInfo = new ImageInfo();

            if (this.activityState && this.activityState.details) {
                imageGalleryInfo.thumbnails = this.activityState.details.images;
            }
            return imageGalleryInfo;
       }

       get sessionBtnId(): number | undefined {
           return this.selectedSessionInfoId;
       }

        public changedSessionInfoId(selectedSessionInfoId: number) {
             this.updateSessionInfoType( {selectedSessionInfoId} );
       }
        public created() {
            if (this.$route.params.activityId) {
                this.activityId = this.$route.params.activityId;
            }
            this.getActivity({activity: this.activityId});
        }
        public show(): void {
            this.drawContent = true;
            setTimeout(() => {
                (TimelineMax as any).to('.ex-activity-details-component', 3, {opacity : 1 });
            } , 30);
        }

        public makePin() {
            this.pinActivity({activity: this.activityId}).then((res: any) => {
                if (res.data && res.data.status === true) {
                    this.$toast.success(this.$locale.activities.pinSuccessText, '', this.$notificationSystem.options.success);
                } else {
                    this.$toast.error(this.$locale.activities.pinErrorText, '', this.$notificationSystem.options.error);
                }
            }).catch((err: any) => {
                this.$toast.error(err.toString(), '', this.$notificationSystem.options.error);
            });
        }
    }
</script>
