<template>
    <div>
        <rotate-screen-alert :orientation="hasCorrectOrientation && isBeginningSlide"></rotate-screen-alert>
        <section v-show="!orientationStatus">
            <!--<v-flex>-->
            <!--&lt;!&ndash;<slide-show-menu-pane ref="topPane"></slide-show-menu-pane>&ndash;&gt;-->
            <!--</v-flex>-->

            <categorization-activity
                    :mediaType="mediaType"
                    :activityType="activityType"
                    :slides="slides">
            </categorization-activity>


            <!--<div id="dropArea">Drop Area</div>-->
            <!--<div id="dropArea1">Drop Area</div>-->


        </section>
    </div>
</template>

<script lang="ts">
    import {Component, Watch} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import SlideShowMenuPane from '@/modules/common/components/slideShowMenuPane.vue';
    import SideNavigations from '@/modules/common/components/sideNavigations.vue';
    import CategorizationActivity from '@/modules/common/components/categorizationActivity.vue';

    import RotateScreenAlert from '@/modules/common/components/rotateScreenAlert.vue';
    import OrientationUtil from '@/modules/common/utils/orientationUtil';
    import {ActivityType, PremiumCollectionLayout} from '@/modules/activities/store/types';
    import TimelineMax from 'gsap';
    import {State} from 'vuex-class';
    // import Draggable from 'gsap/Draggable.js';


    @Component({
        components: {
            SlideShowMenuPane,
            SideNavigations,
            RotateScreenAlert,
            CategorizationActivity,
        },
    })
    export default class PremiumCollection extends BaseComponent {
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

                // this.$nextTick(() => {
                //     const droppables: any = this.$el.querySelectorAll(".swiper-slide");
                //     const dropArea: any = this.$el.querySelector("#dropArea");
                //     const dropArea1: any = this.$el.querySelector("#dropArea1");
                //     const overlapThreshold: string = "99%";
                //
                //     const a = Draggable.create(droppables, {
                //         bounds: window,
                //         onDrag: function(e: any) {
                //             if (this.hitTest(dropArea, overlapThreshold)) {
                //                 (TimelineMax as any).set(this.target, {className: "+=highlight"});
                //             } else if(this.hitTest(dropArea1, overlapThreshold)){
                //                 (TimelineMax as any).set(this.target, {className: "+=highlight"});
                //             } else {
                //                 (TimelineMax as any).set(this.target, {className: "-=highlight"});
                //             }
                //         },
                //         onDragEnd: function(e: any) {
                //             if (!this.target.classList.contains('highlight')) {
                //                 (TimelineMax as any).to(this.target, 0.2, {
                //                     x: 0, y: 0,
                //                 });
                //             }
                //         },
                //     });
                // })
            }
        }
    }
</script>

<style scoped lang="scss">

    #dropArea {
        width: 400px;
        height: 600px;
        background: #ccc;
        position: absolute;
        left: 600px;
        top: 800px;
        color: black;
        padding: 20px;
    }

    #dropArea1 {
        width: 400px;
        height: 600px;
        background: #ccc;
        position: absolute;
        top: 800px;
        left: 100px;
        color: black;
        padding: 20px;
    }
</style>
