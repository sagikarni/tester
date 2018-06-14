<template>
    <div>
        <dialog-open-slide :dialog="dialog"></dialog-open-slide>
        <section v-show="!dialog">
            <v-flex>
                <slide-show-menu-pane ref="topPane"></slide-show-menu-pane>
            </v-flex>
            <side-navigations :activityType="activityType" :slides="slides"  @hideTopPane="hideTopPane" :mediaCount="mediaCountInfo" :activityName="activityNameInfo" :activityContent="activityContent"></side-navigations>
        </section>
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

        constructor() {
            super();
            this.orientationUtil = new OrientationUtil();
        }
        @Watch('activityOrientation')
        public onPropertyChanged(value: any, oldValue: any) {
            if (value !== this.activityDetailsState.orientation) {
                this.$toast.warning(this.$locale.activities.activityCollection.warningText, '', this.$notificationSystem.options.warning);
            } else {
                this.dialog = false;
            }
        }
        get slides(): any[] {
            const slides = [];
            for  (let i = 0; i < this.activityDetailsContent.slides.length; i++) {
                  slides.push({id: i , layout : this.activityDetailsContent.layout , media : this.activityDetailsContent.slides[i]});
            }
            return slides;
        }
        get activityType() {
            return ActivityType.PremiumCollction;
        }
        get activityOrientation(): number {
            return this.orientationUtil.orientation;
        }

        get mediaCountInfo(): number {
            return this.activityDetailsState && this.activityDetailsState.mediaCount;
        }

        get activityNameInfo(): string {
            return this.activityDetailsState && this.activityDetailsState.title;
        }

        get activityContent(): string {
            return this.activityDetailsContent;
        }

        public hideTopPane(): void {
            (this.$refs.topPane as any).hidPane();
        }
    }
</script>

<style scoped lang="scss">

</style>
