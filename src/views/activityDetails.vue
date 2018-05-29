<template>
    <section class="ex-activity-details-component" v-show="drawContent" >
        <social-share></social-share>
        <activity-main-details :activityMainDetailsInfo="activityMainDetailsInfo"></activity-main-details>
        <div class="ex-session-info mt-5 pt-3">
            <session-length @sessionInfoIdChanged="changedSessionInfoId" :sessionLengthInfo="sessionsInfo"></session-length>
        </div>
        <image-gallery :imageGalleryInfo="imageGalleryInfo" :sessionInfoId="sessionBtnId"></image-gallery>
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
    import {IActivitiesState, SessionsInfo, ActivityMainDetailsInfo, ImageGalleryInfo,  MediaType, Orientation} from "@/modules/activities/store/types";
    import TimelineMax from 'gsap';

    const namespace: string = 'activities';


    @Component({
        components: {
            ActivityMainDetails,
            ImageGallery,
            SocialShare,
            SessionLength,
        },
    })
    export default class ActivityDetails extends BaseComponent {
        public drawContent: boolean = false;

        @State(state => state.activities.activity) public activityState?: any;
        @State(state => state.activities.sessionInfoId) public sessionInfoId?: number;
        @Action('getActivity' , {namespace}) public getActivity?: any;
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

       get imageGalleryInfo(): ImageGalleryInfo {
            const imageGalleryInfo = new ImageGalleryInfo();

            if (this.activityState && this.activityState.details) {
                imageGalleryInfo.sessionInfoId = 3; // TODO need to confirm this is a default value = "short" toggle button
                imageGalleryInfo.thumbnails = this.activityState.details.thumbnails;
            }
            return imageGalleryInfo;
       }

       get sessionBtnId(): number | undefined {
            return this.sessionInfoId;
       }

        public changedSessionInfoId(value: any) {
             this.updateSessionInfoType( {sessionInfoId: value} );
       }
        public created() {
            this.getActivity({activity: "1"});
        }
        public show(): void {
            this.drawContent = true;
            setTimeout(() => {
                (TimelineMax as any).to('.ex-activity-details-component', 3, {opacity : 1 });
            } , 30);
        }
    }
</script>