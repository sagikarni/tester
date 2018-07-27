<template>
    <div>
        <activity-disabled-notification :orientation="isSizeXS"></activity-disabled-notification>
        <rotate-screen-alert :orientation="!isSizeXS && hasCorrectOrientation && isMobileDevice"></rotate-screen-alert>
        <section  v-show="!isSizeXS && !hasCorrectOrientation">
            <memory
                v-if="firstPageLoad"
                :images="slides"
                :memoryLayout="memoryLayout"
                :columnCount="columnCount"
                :rowsCount="rowsCount"
                :aspectRatio="aspectRatio">
            </memory>
        </section>
    </div>
</template>

<script lang="ts">
    import {Component, Watch} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import SlideShowMenuPane from '@/modules/common/components/slideShowMenuPane.vue';
    import Memory from '@/modules/activities/components/otherActivities/memory.vue';
    import RotateScreenAlert from '@/modules/common/components/rotateScreenAlert.vue';
    import ActivityDisabledNotification from '@/modules/common/components/activityDisabledNotification.vue';
    import OrientationUtil from '@/modules/common/utils/orientationUtil';
    import {ActivityType, PremiumCollectionLayout} from '@/modules/activities/store/types';
    import TimelineMax from 'gsap';
    import {State} from 'vuex-class';

    @Component({
        components: {
            SlideShowMenuPane,
            RotateScreenAlert,
            Memory,
            ActivityDisabledNotification,
        },
    })
    export default class MemoryView extends BaseComponent {
        @State(state => state.deviceOrientation) public deviceOrientation?: number;
        @State(state => state.activities.activity && state.activities.activity.details) public activityDetailsState?: any;
        @State(state => state.activities.activity && state.activities.activity.content) public activityDetailsContent?: any;

        public orientationUtil?: any;
        public activityId: string = '1';
        public hasCorrectOrientation: boolean = false;
        public isMobileDevice: boolean;
        public isSizeXS: boolean = false;
        public firstPageLoad: boolean = true;

        constructor() {
            super();
            this.orientationUtil = new OrientationUtil();
            this.isMobileDevice = this.orientationUtil && this.orientationUtil.isMobile;
        }

        get slides(): any[] {
            return this.activityDetailsContent && this.activityDetailsContent.photos;
        }

        get columnCount(): number {
            return this.activityDetailsContent && this.activityDetailsContent.photos && this.activityDetailsContent.columnCount;
        }

        get rowsCount(): number {
            return this.activityDetailsContent && this.activityDetailsContent.photos && this.activityDetailsContent.rowsCount;
        }

        get aspectRatio(): number {
            return this.activityDetailsContent && this.activityDetailsContent.photos && this.activityDetailsContent.aspectRatio;
        }

        get memoryLayout() {
            return this.activityDetailsContent && this.activityDetailsContent.photos && this.activityDetailsContent.memoryLayout;
        }
        get activityOrientation(): number {
            return this.orientationUtil.orientation;
        }

        @Watch('activityOrientation')
        public onPropertyChanged(value: any, oldValue: any) {
            if (value === this.activityDetailsState.orientation && this.isMobileDevice) {
                this.hasCorrectOrientation = false;
                this.firstPageLoad = true;
            } else {
                this.hasCorrectOrientation = true;
            }
        }

        public checkSizeXS() {
            if (this.$vuetify.breakpoint.xsOnly || (this.$vuetify.breakpoint.height < 600 && this.hasCorrectOrientation === true)) {

                this.isSizeXS = true;
            }
        }

        public created() {
            if ((this.$route.params as any).activityId) {
                (TimelineMax as any).to(".application--wrap", 0, {backgroundColor: "#000000"});
                this.activityId = (this.$route.params as any).activityId;
                if (!this.activityDetailsState) {
                    this.$router.push(`/activity-details/${this.activityId}`);
                }
                if (this.activityDetailsState && this.activityDetailsState.orientation && this.activityOrientation !== this.activityDetailsState.orientation && this.isMobileDevice) {
                    this.hasCorrectOrientation = true;
                    this.firstPageLoad = false;
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
