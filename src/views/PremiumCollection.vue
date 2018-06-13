<template>
    <div>
        <dialog-open-slide :dialog="dialog"></dialog-open-slide>
        <section v-show="!dialog">
            <v-flex>
                <slide-show-menu-pane></slide-show-menu-pane>
            </v-flex>
            <side-navigations :mediaCount="mediaCountInfo" :activityName="activityNameInfo" :activityContent="activityContent"></side-navigations>
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
        @Action('getActivity', {namespace}) public getActivity?: any;

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

        public created() {
            if (this.$route.params.activityId) {
                this.activityId = this.$route.params.activityId;
                this.getActivity({activity: this.activityId}).then((res: any) => {
                    if (res.status !== 200) {
                        this.$router.push(`/activity-details/${this.activityId}`);
                    }
                    if (this.activityDetailsState.orientation && this.activityOrientation !== this.activityDetailsState.orientation) {
                        this.dialog = true;
                    }
                }).catch((err: any) => {
                    this.$router.push(`/activity-details/${this.activityId}`);
                });
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
