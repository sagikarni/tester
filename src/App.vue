<template>
  <div id="app">
    <loading ref="loading"></loading>
    <v-app id="inspire" class="theme-dark">
        <transition name="page" mode="out-in">
         <router-view></router-view>
        </transition>
       <error-modal ref="errorModal"></error-modal>
    </v-app>

  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Watch } from 'vue-property-decorator';
    import Loading from '@/modules/common/components/loading.vue';
    import ErrorModal from '@/modules/common/components/errorModal.vue';
    import OrientationUtil from '@/modules/common/utils/orientationUtil';
    import { State, Action } from 'vuex-class';
    import {bus, busConstants} from '@/modules/utils/eventBus';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import TimelineMax from 'gsap';

    @Component({
        components: {
            Loading,
            ErrorModal,
        },
    })
    export default class App extends BaseComponent {
        @State(state => state.generalGerror) public generalGerror?: any;
        @Action('changeReloadActivityDetails') public changeReloadActivityDetails?: any;

        public orientationUtil?: any;

        constructor() {
            super();
            this.orientationUtil = new OrientationUtil();
            bus.$on(busConstants.ENTER_FULL_SCREEN, () => {
               this.enterFullScreen();
            });
            bus.$on(busConstants.EXIT_FULL_SCREEN, () => {
               this.exitFullScreen();
            });
        }

        @Watch('generalGerror')
        public onPropertyChanged(value: any, oldValue: any) {
            const el: any = this.$refs.errorModal;
            el.showError(value);
        }

        @Watch('$route')
        public onPropertyChanged2(value: any, oldValue: any) {
            if (oldValue && oldValue.params && oldValue.params.activityId
                && (oldValue.path === `/premium-collection/${oldValue.params.activityId}`
                    || oldValue.path === `/categorization-activity/${oldValue.params.activityId}` || oldValue.path === `/puzzle-activity/${oldValue.params.activityId}`)) {
                (TimelineMax as any).to(".application--wrap", 0, {backgroundColor: "white"});
                this.changeReloadActivityDetails({status: false}); // No need to reload activities if they are exist
            }
            const el: any = this.$refs.loading;
            el.show();
            setTimeout(() => {
                el.close();
            }, 1000);
        }

    }
</script>

<style lang="scss">
    @import "./assets/css/styles.scss";
</style>
