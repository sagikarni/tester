<template>
    <div>
        <dialog-open-slide :dialog="dialog"></dialog-open-slide>
        <section v-show="!dialog">
            <v-flex>
                <slide-show-menu-pane ref="topPane"></slide-show-menu-pane>
            </v-flex>
            <side-navigations :mediaType="mediaType"  @showTopPane="showTopPane" :activityType="activityType" :slides="slides"  @hideTopPane="hideTopPane" :mediaCount="mediaCountInfo" :activityName="activityNameInfo" :activityContent="activityContent"></side-navigations>
        </section>
              <v-snackbar   v-model="showRotateNotification">
                  {{ $locale.general.rotateScreenWarning }}
               </v-snackbar>
    </div>
</template>

<script lang="ts">
    import { Component, Watch } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import SlideShowMenuPane from '@/modules/common/components/slideShowMenuPane.vue';
    import SideNavigations from '@/modules/common/components/sideNavigations.vue';
    import DialogOpenSlide from '@/modules/common/components/dialogOpenSlide.vue';
    import OrientationUtil from '@/modules/common/utils/orientationUtil';
    import {ActivityType, PremiumCollectionLayout} from '@/modules/activities/store/types';
    import TimelineMax from 'gsap';
    import { State, Action } from 'vuex-class';

    const namespace: string = 'activities';

    @Component({
        components: {
            SlideShowMenuPane,
            SideNavigations,
            DialogOpenSlide,
         },
    })
    export default class PremiumCollection extends BaseComponent {
        @State(state => state.deviceOrientation) public deviceOrientation?: number;
        @State(state => state.activities.activity && state.activities.activity.details) public activityDetailsState?: any;
        @State(state => state.activities.activity && state.activities.activity.content) public activityDetailsContent?: any;

        public orientationUtil?: any;
        public dialog: boolean = false;
        public activityId: string = '1';
        public showRotateNotification: boolean = false;

        constructor() {
            super();
            this.orientationUtil = new OrientationUtil();
        }
        @Watch('activityOrientation')
        public onPropertyChanged(value: any, oldValue: any) {
            if (value !== this.activityDetailsState.orientation) {
                this.showRotateNotification = true;
           } else {
                this.dialog = false;
            }
        }

        get slides(): any[] {
            const slides = [];

            if (this.activityDetailsContent && this.activityDetailsContent.slides && this.activityDetailsContent.slides.length > 0) {
                for (let i = 0; i < this.activityDetailsContent.slides.length; i++) {
                    slides.push({ id: i, layout: this.activityDetailsContent.layout, media: this.activityDetailsContent.slides[i] });
                }
            }

            return slides;
        }
        get activityType() {
            return ActivityType.PremiumCollction;
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
        public created() {
            if (this.$route.params.activityId) {
                this.activityId = this.$route.params.activityId;
                if (!this.activityDetailsState) {
                    this.$router.push(`/activity-details/${this.activityId}`);
                }
                if (this.activityDetailsState && this.activityDetailsState.orientation && this.activityOrientation !== this.activityDetailsState.orientation) {
                    this.dialog = true;
                    (TimelineMax as any).to(".application--wrap", 0,  {backgroundColor: "#000000"});
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
