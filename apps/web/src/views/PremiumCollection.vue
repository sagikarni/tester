<template>
    <div>
        <rotate-screen-alert :orientation="hasCorrectOrientation && isBeginningSlide"></rotate-screen-alert>
        <section v-show="!orientationStatus">
            <v-flex>
                <close-pane></close-pane>
            </v-flex>
            <side-navigations ref="slideNavigations" :mediaType="mediaType" @isFirstSlide="isFirstSlide"
                              :activityType="activityType" :slides="slides"
                              :mediaCount="mediaCountInfo" :activityName="activityNameInfo"
                              :activityContent="activityContent"></side-navigations>
        </section>
        <v-snackbar v-model="showRotateNotification">
             $locale.general.rotateScreenWarning 
        </v-snackbar>
    </div>
</template>

<script lang="ts">
    import {Component, Watch, Vue, Prop} from 'vue-property-decorator';
    // import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import SlideShowMenuPane from '@/modules/common/components/slideShowMenuPane.vue';
    import SideNavigations from '@/modules/common/components/sideNavigations.vue';
    import RotateScreenAlert from '@/modules/common/components/rotateScreenAlert.vue';
    import OrientationUtil from '@/modules/common/utils/orientationUtil';
    import ClosePane from '@/modules/common/components/closePane.vue';
    import {ActivityType, PremiumCollectionLayout} from '@/modules/activities/store/types';
    import TimelineMax from 'gsap';
    // import {State} from 'vuex-class';

    const timelineMax = TimelineMax as any;

    @Component({
        components: {
            SlideShowMenuPane,
            SideNavigations,
            RotateScreenAlert,
            ClosePane,
        },
    })
    export default class PremiumCollection extends Vue {
    //    @State(state => state.deviceOrientation) public deviceOrientation?: number;
       @Prop() activityDetailsState: any;
       @Prop() activityDetailsContent: any;

        // @State(state => state.activities.activity && state.activities.activity.details) public activityDetailsState?: any;
        // @State(state => state.activities.activity && state.activities.activity.content) public activityDetailsContent?: any;

        public orientationUtil?: any;
        public orientationStatus: boolean = false;
        public activityId: string = '1';
        public showRotateNotification: boolean = false;
        public isBeginningSlide: boolean = true;
        public hasCorrectOrientation: boolean = false;
        public pageLoad: boolean = false;

        constructor() {
            super();
            this.orientationUtil = new OrientationUtil();

        }

        @Watch('activityOrientation')
        public onPropertyChanged(value: any, oldValue: any) {
            if (value !== this.activityDetailsState.orientation) {
                this.hasCorrectOrientation = true;
                if (!this.isBeginningSlide) {
                    this.showRotateNotification = true;
                } else {
                    this.showRotateNotification = false;
                    this.orientationStatus = true;
                }
            } else {
                this.hasCorrectOrientation = false;
                this.orientationStatus = false;
                this.showRotateNotification = false;
                if (this.pageLoad) {
                    setTimeout(() => {
                        (this.$refs.slideNavigations as any).hideSidePanes(1);
                    }, 3000);
                    this.pageLoad = false;
                }
            }
        }

        get slides(): any[] {
            const slides = [];

            if (this.activityDetailsContent && this.activityDetailsContent.slides && this.activityDetailsContent.slides.length > 0) {
                for (let i = 0; i < this.activityDetailsContent.slides.length; i++) {
                    slides.push({
                        id: i,
                        layout: this.activityDetailsContent.layout,
                        media: this.activityDetailsContent.slides[i],
                    });
                }
            }

            return slides;
        }

        get activityType() {
            return this.activityDetailsState && this.activityDetailsState.activityType;
        }

        get activityOrientation(): number {
            return this.orientationUtil.orientation;
        }

        get mediaType() {
            return this.activityDetailsState && this.activityDetailsState.mediaType;
        }

        get mediaCountInfo(): number {
            return this.activityDetailsState && this.activityDetailsState.mediaCount;
        }

        get activityNameInfo(): string {
            return this.activityDetailsState && this.activityDetailsState.title;
        }

        get activityContent(): any {
            return this.activityDetailsContent;
        }

        public isFirstSlide(isBeginning: boolean): void {
            if (isBeginning && this.hasCorrectOrientation) {
                this.showRotateNotification = false;
                this.orientationStatus = true;
            }
            this.isBeginningSlide = isBeginning;
        }

        public created() {
            if (this.$route.params.activityId) {
                timelineMax.to(".application--wrap", 0, {backgroundColor: "#000000"});
                this.activityId = this.$route.params.activityId;
                if (!this.activityDetailsState) {
                    this.$router.push(`/activity-details/${this.activityId}`);
                }
                if (this.activityDetailsState && this.activityDetailsState.orientation && this.activityOrientation !== this.activityDetailsState.orientation) {
                    this.hasCorrectOrientation = true;
                    this.orientationStatus = true;
                    this.pageLoad = true;
                } else {
                    setTimeout(() => {
                        if ((this.$refs.slideNavigations as any)) {
                            (this.$refs.slideNavigations as any).hideSidePanes(1);
                        }
                    }, 3000);
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>