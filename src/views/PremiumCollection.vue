<template>
    <div>
        <dialog-open-slide :dialog="dialog"></dialog-open-slide>
        <section>
            <v-flex>
                <slide-show-menu-pane></slide-show-menu-pane>
            </v-flex>
            <side-navigations></side-navigations>
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
    import { State } from 'vuex-class';

    @Component({
        components: {
            SlideShowMenuPane,
            SideNavigations,
            DialogOpenSlide,
        },
    })
    export default class PremiumCollection extends BaseComponent {
        @State(state => state.deviceOrientation) public deviceOrientation?: number;
        @State(state => (state.activities.activity && state.activities.activity.details && state.activities.activity.details.orientation)) public orientation?: number;

        public orientationUtil?: any;
        public dialog: boolean = false;

        constructor() {
            super();
            this.orientationUtil = new OrientationUtil();
        }
        @Watch('activityOrientation')
        public onPropertyChanged(value: any, oldValue: any) {
            if (value !== this.orientation) {
                this.$toast.warning(this.$locale.activities.activityCollection.warningText, '', this.$notificationSystem.options.warning);
            } else {
                this.dialog = false;
            }
        }

        get activityOrientation(): number {
            return this.orientationUtil.orientation;
        }
        public created() {
            if (this.activityOrientation !== this.orientation) {
                this.dialog = true;
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
