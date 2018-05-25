<template>
    <section class="ex-activity-details-component">
        <social-share></social-share>
        <activity-main-details :activityMainDetailsInfo="activityMainDetailsInfo"></activity-main-details>
        <div class="ex-session-info mt-5 pt-3">
            <session-length :sessionLengthInfo="sessionsInfo"></session-length>
        </div>
        <image-gallery></image-gallery>
    </section>
</template>

<script lang="ts">
    import { Component } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {State, Action} from 'vuex-class';
    import ActivityMainDetails from '@/modules/activities/components/activitydetails/activityMainDetails.vue';
    import ImageGallery from '@/modules/common/components/imageGallery.vue';
    import SessionLength from '@/modules/activities/components/sessionLength.vue';
    import SocialShare from '@/modules/common/components/socialShare.vue';
    import {IActivitiesState, SessionsInfo, ActivityMainDetailsInfo, MediaType, Orientation} from "@/modules/activities/store/types";

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
        @State(state => state.activities.activity) public activityState?: any;
        @Action('getActivity' , {namespace}) public getActivity: any;

        constructor() {
            super();
        }

       get sessionsInfo(): SessionsInfo[] {
            return this.activityState && this.activityState.details  &&  this.activityState.details.sessionsInfo;
       }

       get activityMainDetailsInfo(): ActivityMainDetailsInfo {
            const detailsInfo = {
               dataExist: false,
               title: "",
               description: "",
               coverPhoto: "",
               mediaCount: 0,
               mediaType: 0,
               mediaTypeText: "",
               mediaTypeIconClass: "",
               orientation: 0,
               orientationText: "",
               orientationIconClass: "",
            };
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
                    detailsInfo.mediaTypeIconClass = "ex-photo";
                } else if (detailsInfo.mediaType === MediaType.Video) {
                    detailsInfo.mediaTypeText = this.$locale.activities.activityDetails.videoBasedText;
                    detailsInfo.mediaTypeIconClass = "ex-play-video";
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

        public created() {
            this.getActivity({activity: "1"});
        }
    }
</script>