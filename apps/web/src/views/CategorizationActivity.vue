<template>
    <div>
        <activity-disabled-notification :orientation="isSizeXS"></activity-disabled-notification>
        <rotate-screen-alert :orientation="!isSizeXS && hasCorrectOrientation && isMobileDevice"></rotate-screen-alert>
        <section  v-show="!isSizeXS && !hasCorrectOrientation">
            <!--<v-flex>-->
            <!--<slide-show-menu-pane class="mtop-5" ref="topPane"></slide-show-menu-pane>-->
            <!--</v-flex>-->
            <v-flex>
                <close-pane></close-pane>
            </v-flex>

            <categorization
                    v-if="firstPageLoad"
                    ref="category"
                    :rigthOrentation="firstPageLoad"
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
    import ActivityDisabledNotification from '@/modules/common/components/activityDisabledNotification.vue';

    import OrientationUtil from '@/modules/common/utils/orientationUtil';
    import {ActivityType, PremiumCollectionLayout} from '@/modules/activities/store/types';
    import TimelineMax from 'gsap';
    import {State} from 'vuex-class';
    import ClosePane from '@/modules/common/components/closePane.vue';
    const timelineMax = TimelineMax as any;

    @Component({
        components: {
            SlideShowMenuPane,
            RotateScreenAlert,
            Categorization,
            ActivityDisabledNotification,
            ClosePane,
        },
    })
    export default class CategorizationActivity extends BaseComponent {
        @State(state => state.deviceOrientation) public deviceOrientation?: number;
        @State(state => state.activities.activity && state.activities.activity.details) public activityDetailsState?: any;
        @State(state => state.activities.activity && state.activities.activity.content) public activityDetailsContent?: any;

        public orientationUtil?: any;
        public activityId: string = '1';
        public hasCorrectOrientation: boolean = false;
        public isMobileDevice: boolean;
        public isSizeXS: boolean = false;
        public firstPageLoad: boolean = false;

        constructor() {
            super();
            this.orientationUtil = new OrientationUtil();
            this.isMobileDevice = this.orientationUtil && this.orientationUtil.isMobile;
        }

        @Watch('activityOrientation')
        public onPropertyChanged(value: any, oldValue: any) {
            if (value === this.activityDetailsState.orientation && this.isMobileDevice) {
                this.hasCorrectOrientation = false;
                setTimeout(() => {
                    this.firstPageLoad = true;
                }, 500);
            } else {
                this.hasCorrectOrientation = true;
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

        public checkSizeXS() {
            if (this.$vuetify.breakpoint.xsOnly || (this.$vuetify.breakpoint.height < 600 && this.hasCorrectOrientation === true)) {
                this.isSizeXS = true;
            }
        }

        public mounted() {
            if ((this.$route.params as any).activityId) {
                timelineMax.to(".application--wrap", 0, {backgroundColor: "#000000"});
                this.activityId = (this.$route.params as any).activityId;
                if (!this.activityDetailsState) {
                    this.$router.push(`/activity-details/${this.activityId}`);
                }
                if (this.activityDetailsState && this.activityDetailsState.orientation && this.activityOrientation !== this.activityDetailsState.orientation && this.isMobileDevice) {
                    this.hasCorrectOrientation = true;
                } else {
                    this.firstPageLoad = true;
                }
                this.checkSizeXS();
            }
        }
    }
</script>

<style scoped lang="scss">
    .mtop-5{
        margin-top: 5px!important;
    }
</style>
