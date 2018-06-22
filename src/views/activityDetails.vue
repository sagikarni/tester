<template>
    <div>
        <error-pane ref="errorPane"></error-pane>
        <section class="ex-activity-details-component" v-show="drawContent" v-if="!showErrorPane" >
            <v-layout row wrap class="mb-3">
                <v-flex xs3>
                    <back-button></back-button>
                </v-flex>
                <v-flex xs9 class="text-xs-right" style="align-self: center">
                    <social-share></social-share>
                    <div class="menu" @click="makePin(isPinned)"><pin-unpin-button :isPinned="isPinned" :loading="loading" :disabled="loading"></pin-unpin-button></div>
                </v-flex>
            </v-layout>
            <activity-main-details :activityMainDetailsInfo="activityMainDetailsInfo"></activity-main-details>
            <div class="ex-session-info mt-3 pt-3">
                <v-btn large color="primary" class="lets_start" @click="startActivityClick">{{ $locale.activities.sessionsInfo.startText }}</v-btn>
                <session-length @sessionInfoIdChanged="changedSessionInfoId" :sessionLengthInfo="sessionsInfo" :sessionSelectedItem="sessionSelectedItem"></session-length>
            </div>
            <h3 :class="[$isRTL ? 'ex-rtl' : '', 'mt-1']">{{ $locale.activities.galleryText }}</h3>
            <image-gallery :imageGalleryInfo="imageGalleryInfo" :filterId="sessionBtnId" :sessionBtnDescription="sessionBtnDescription"></image-gallery>
        </section>
    </div>
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
    import PinUnpinButton from '@/modules/common/components/pinUnpinButton.vue';
    import ErrorPane from '@/modules/common/components/errorPane.vue';
    import { SessionsInfo, ActivityMainDetailsInfo, MediaType, Orientation} from "@/modules/activities/store/types";
    import { ImageInfo, GeneralError } from "@/modules/store/typeClasses";
    import TimelineMax from 'gsap';

    const namespace: string = 'activities';


    @Component({
        components: {
            ActivityMainDetails,
            ImageGallery,
            SocialShare,
            SessionLength,
            BackButton,
            PinUnpinButton,
            ErrorPane,
        },
    })
    export default class ActivityDetails extends BaseComponent {
        public drawContent: boolean = false;
        public activityId: string = '1'; // TODO need to remove default value = '1'
        public isPinned: boolean = false;
        public showErrorPane: boolean = false;
        public loading?: boolean = false;
        public sessionSelectedItem?: string = 'Long';

        @State(state => state.reloadActivityDetails) public reloadActivityDetails?: boolean;
        @State(state => state.errorPane) public errorPane?: any;
        @State(state => state.activities.activity) public activityState?: any;
        @State(state => (state.activities.activity && state.activities.activity.details && state.activities.activity.details.selectedSessionInfoId)) public selectedSessionInfoId?: number;
        @Action('updateActivity', {namespace}) public updateActivity?: any;
        @Action('getActivity', {namespace}) public getActivity?: any;
        @Action('pinActivity', {namespace}) public pinActivity?: any;
        @Action('updateSessionInfoType', {namespace}) public updateSessionInfoType: any;
        @Action('errorPaneAction') public errorPaneAction?: any;
        @Action('changeReloadActivityDetails') public changeReloadActivityDetails?: any;
        @Action('executeActivity', {namespace}) public executeActivity?: any;


        @Watch('activityMainDetailsInfo')
        public onPropertyChanged(value: ActivityMainDetailsInfo, oldValue: ActivityMainDetailsInfo) {
            if (value.dataExist) {
               this.show();
            }
        }
        @Watch('errorPane')
        public onPropertyChanged2(value: GeneralError, oldValue: GeneralError) {
            const el: any = this.$refs.errorPane;
            el.showError(value);
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

        get sessionBtnDescription(): string | undefined {
            if (this.selectedSessionInfoId !== undefined && this.sessionsInfo) {
                return this.sessionsInfo[this.selectedSessionInfoId - 1]['description']  ;
            }
        }

        public changedSessionInfoId(selectedSessionInfo: any) {
            this.updateSessionInfoType({selectedSessionInfo});
        }

        public created() {
            if (this.$route.params.activityId) {
                this.activityId = this.$route.params.activityId;
                if (this.reloadActivityDetails === false && this.activityState) {
                    const activityState = JSON.parse(JSON.stringify(this.activityState));

                    if (activityState && activityState.details) {
                        this.updateActivity({activity: undefined});
                        this.updateActivity({activity: activityState});
                        this.sessionSelectedItem = activityState.details.selectedSessionInfoDesc;
                        this.show();
                        this.changeReloadActivityDetails({status: true}); // Need to reload form api the activities
                    }
                } else {
                    this.getActivity({activity: this.activityId}).then((res: any) => {
                        if (res.status === 500) {
                            this.showErrorPane = true;
                            this.errorPaneAction({message: undefined});
                        } else if (res.status === 404) {
                            this.showErrorPane = true;
                            this.errorPaneAction({message: this.$locale.activities.activityNotFound});
                        } else {
                            this.showErrorPane = false; // Important for hide error pane and show the activity section
                        }
                        this.isPinned = res.data && res.data.details && res.data.details.isPinned;
                    }).catch((err: any) => {
                        this.showErrorPane = true;
                        this.errorPaneAction({message: this.$locale.general.somethingWentWrong});
                    });
                }
            } else {
                this.showErrorPane = true;
                this.errorPaneAction({message: this.$locale.activities.noActivityChosen});
            }
        }
        public show(): void {
            this.drawContent = true;
            setTimeout(() => {
                (TimelineMax as any).to('.ex-activity-details-component', 3, {opacity : 1 });
            } , 30);
        }

        public makePin(isPinned: boolean) {
                this['loading'] = !this['loading'];
                this.pinActivity({activity: this.activityId, pin: !isPinned}).then((res: any) => {
                    if (res.data && res.data.status === true) {
                        if (this.activityState && this.activityState.details) {
                            this['loading'] = false;
                            if (this.activityState.details.isPinned === true) { // Pinned
                                this.$toast.success(this.$locale.activities.pinSuccessText, '', this.$notificationSystem.options.success);
                            } else { // Unpinned
                                this.$toast.success(this.$locale.activities.unPinSuccessText, '', this.$notificationSystem.options.success);
                            }
                            this.isPinned = this.activityState.details.isPinned;
                        }
                    } else {
                        this.$toast.error(this.$locale.activities.pinErrorText, '', this.$notificationSystem.options.error);
                    }
                }).catch((err: any) => {
                    this.$toast.error(err.toString(), '', this.$notificationSystem.options.error);
                });
        }

        public startActivityClick() {
           this.executeActivity().then((res: any) => {
               this.$router.push(res.url + this.activityId);
           });
        }
    }
</script>
