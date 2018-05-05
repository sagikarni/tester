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
    import { Component, Prop } from 'vue-property-decorator';
    import Loading from '@/modules/utils/loading.vue';
    import {commonService} from './modules/common/api';

    @Component({
        components: {
            Loading,
        },
    })
    export default class App extends Vue {

    public mounted() {
        commonService.getActivityDetails();
        setTimeout(()=> {
            (this.$refs.loading as Loading).show();
        } , 2000);
      }
    }
</script>

<style lang="scss">
    @import "./assets/css/styles.scss";
</style>
