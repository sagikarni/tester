<template>
    <div>
        <rotate-screen-alert :orientation="hasCorrectOrientation && isBeginningSlide"></rotate-screen-alert>
        <section v-show="!orientationStatus">
            <v-flex>
                <slide-show-menu-pane ref="topPane"></slide-show-menu-pane>
            </v-flex>

            <v-layout row wrap class="puzzle-content">
                <v-flex xs3>
                    <puzzle-left-panel
                            @getPuzzleData="changePuzzleImage"
                            :images="slides"></puzzle-left-panel>
                </v-flex>
                <v-flex xs9>
                    <puzzle-view
                            ref="puzzleView"
                            :images="slides">
                    </puzzle-view>
                </v-flex>
            </v-layout>

        </section>
        <v-snackbar v-model="showRotateNotification">
            {{ $locale.general.rotateScreenWarning }}
        </v-snackbar>

    </div>
</template>

<script lang="ts">
    import { Component, Watch } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import SlideShowMenuPane from '@/modules/common/components/slideShowMenuPane.vue';
    import PuzzleView from '@/modules/activities/components/otherActivities/puzzleView.vue';
    import PuzzleLeftPanel from '@/modules/activities/components/otherActivities/puzzleLeftPanel.vue';


    import SideNavigations from '@/modules/common/components/sideNavigations.vue';
    import RotateScreenAlert from '@/modules/common/components/rotateScreenAlert.vue';
    import OrientationUtil from '@/modules/common/utils/orientationUtil';
    import {ActivityType, PremiumCollectionLayout} from '@/modules/activities/store/types';

    import TimelineMax from 'gsap';
    import { State } from 'vuex-class';


    @Component({
        components: {
            SlideShowMenuPane,
            SideNavigations,
            RotateScreenAlert,
            PuzzleView,
            PuzzleLeftPanel,
        },
    })
    export default class PuzzleActivity extends BaseComponent {
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
                    setTimeout(() => {
                        (this.$refs.topPane as any).hidePaneInternal(1);
                        (this.$refs.slideNavigations as any).hideSidePanes(1);
                    }, 3000);
                    this.pageLoad = false;
                }
            }
        }

        get slides(): any[] {
            const slides = [];

            if (this.activityDetailsContent && this.activityDetailsContent.Media && this.activityDetailsContent.Media.length > 0) {
                for (let i = 0; i < this.activityDetailsContent.Media.length; i++) {
                    const puzzleMadia = [];
                    for (let j = 0; j < this.activityDetailsContent.Media[i]['partsCount']; j++) {
                        puzzleMadia.push({ id: j + 1, puzzlePath:  this.activityDetailsContent.Media[i]['photo'].replace(/photo.jpg$/gi, "parts/") + (j + 1) + ".jpeg"});
                    }
                    slides.push({id: i, media: this.activityDetailsContent.Media[i], puzzleMadia});
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

        public hideTopPane(): void {
            (this.$refs.topPane as any).hidPane();
        }

        public showTopPane(): void {
            (this.$refs.topPane as any).showPane();
        }

        public isFirstSlide(isBeginning: boolean): void {
            if (isBeginning && this.hasCorrectOrientation) {
                this.showRotateNotification = false;
                this.orientationStatus = true;
            }
            this.isBeginningSlide = isBeginning;
        }

        public changePuzzleImage(puzzleData: any) {
            const puzzleId = puzzleData && puzzleData.id;
            (this.$refs.puzzleView as any).changePuzzleImage(puzzleId);
        }

        public created() {
            if (this.$route.params.activityId) {
                this.activityId = this.$route.params.activityId;
                (TimelineMax as any).to(".application--wrap", 0,  {backgroundColor: "#000000"});

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
    .puzzle-content {
        margin-top: 60px;
    }

</style>

