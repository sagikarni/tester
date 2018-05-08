<template>
  <div id="app">
    <loading ref="loading"></loading>
    <v-app id="inspire">
        <transition name="page" mode="out-in">
         <router-view></router-view>
        </transition>
    </v-app>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import Loading from '@/modules/utils/loading/loading.vue';
    import {State, Action, Getter} from 'vuex-class';
    import {IRootState,ISystemLoading} from "./modules/common/store/types";


    @Component({
        components: {
            Loading,
        },
    })
    export default class App extends Vue {
        @State(state=>state.systemLoading) loadingInfo?: ISystemLoading;


        @Watch('loadingInfo')
        onPropertyChanged(value: ISystemLoading, oldValue: ISystemLoading){


            let loading = this.$refs.loading as Loading;
            value.isLoading ?  (loading as Loading).show(): (loading as Loading).close();
         }




    }
</script>

<style lang="scss">
    @import "./assets/css/styles.scss";
</style>
