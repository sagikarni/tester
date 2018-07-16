<template>
    <div>
        <!--<rotate-screen-alert :orientation="hasCorrectOrientation && isBeginningSlide && isMobileDevice"></rotate-screen-alert>-->
        <section>
            <v-flex>
            <slide-show-menu-pane ref="topPane"></slide-show-menu-pane>
            </v-flex>

            <categorization
                    :mediaType="mediaType"
                    :activityType="activityType"
                    :categoryTypes="categoryTypes"
                    :slides="slides">
            </categorization>

        </section>
    </div>
</template>

<script lang="ts">
    import {Component, Watch} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import SlideShowMenuPane from '@/modules/common/components/slideShowMenuPane.vue';
    import Categorization from '@/modules/activities/components/otherActivities/categorization.vue';

    import RotateScreenAlert from '@/modules/common/components/rotateScreenAlert.vue';
    import OrientationUtil from '@/modules/common/utils/orientationUtil';
    import {ActivityType, PremiumCollectionLayout} from '@/modules/activities/store/types';
    import TimelineMax from 'gsap';
    import {State} from 'vuex-class';

    @Component({
        components: {
            SlideShowMenuPane,
            RotateScreenAlert,
            Categorization,
        },
    })
    export default class CategorizationActivity extends BaseComponent {
        @State(state => state.deviceOrientation) public deviceOrientation?: number;
        @State(state => state.activities.activity && state.activities.activity.details) public activityDetailsState?: any;
        @State(state => state.activities.activity && state.activities.activity.content) public activityDetailsContent?: any;

        public orientationUtil?: any;
        public orientationStatus: boolean = false;
        public activityId: string = '1';
        public showRotateNotification: boolean = false;
        public isBeginningSlide: boolean = true;
        public hasCorrectOrientation: boolean = false;
        public pageLoad: boolean = false;
        public isMobileDevice: boolean;


        constructor() {
            super();
            this.orientationUtil = new OrientationUtil();
            this.isMobileDevice = this.orientationUtil && this.orientationUtil.isMobile;
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
                    this.pageLoad = false;
                }
            }
        }

        get slides(): any[] {
            const slides = [];

            if (this.activityDetailsContent && this.activityDetailsContent.Media && this.activityDetailsContent.Media.length > 0) {
                for (let i = 0; i < this.activityDetailsContent.Media.length; i++) {
                    slides.push({id: i, media: this.activityDetailsContent.Media[i]});
                }
            }
            return slides;
        }

        get categoryTypes(): any[] {
            const category = [];

            if (this.activityDetailsContent && this.activityDetailsContent.categories && this.activityDetailsContent.categories.length > 0) {
                for (let i = 0; i < this.activityDetailsContent.categories.length; i++) {
                    category.push({id: i, category: this.activityDetailsContent.categories[i]});
                }
            }
            return category;
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

        public isFirstSlide(isBeginning: boolean): void {
            if (isBeginning && this.hasCorrectOrientation) {
                this.showRotateNotification = false;
                this.orientationStatus = true;
            }
            this.isBeginningSlide = isBeginning;
        }

        public created() {
            if (this.$route.params.activityId) {
                (TimelineMax as any).to(".application--wrap", 0, {backgroundColor: "#000000"});
                this.activityId = this.$route.params.activityId;
                if (!this.activityDetailsState) {
                    this.$router.push(`/activity-details/${this.activityId}`);
                }
                if (this.activityDetailsState && this.activityDetailsState.orientation && this.activityOrientation !== this.activityDetailsState.orientation) {
                    this.hasCorrectOrientation = true;
                    this.orientationStatus = true;
                    this.pageLoad = true;
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
