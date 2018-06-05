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
    import { State } from 'vuex-class';

    @Component({
        components: {
            Loading,
            ErrorModal,
        },
    })
    export default class App extends Vue {
        @State(state => state.generalGerror) public generalGerror?: any;

        @Watch('generalGerror')
        public onPropertyChanged(value: any, oldValue: any) {
           const el: any = this.$refs.errorModal;
           el.showError(value);
         }
        @Watch('$route')
        public onPropertyChanged2(value: any, oldValue: any) {
            const el: any = this.$refs.loading;
            el.show();
            setTimeout(() => { el.close(); }, 1000);
        }
    }
</script>

<style lang="scss">
    @import "./assets/css/styles.scss";
</style>
