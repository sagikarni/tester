<template>
  <div id="app">
    <loading ref="loading"></loading>
    <v-app id="inspire" class="theme-dark">
        <transition name="page" mode="out-in">
         <router-view></router-view>
        </transition>
    </v-app>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import Loading from '@/modules/common/components/loading.vue';
    import {State, Action, Getter} from 'vuex-class';
    import {IRootState, ISystemLoading} from "./modules/store/types";
    import axios from 'axios';

    @Component({
        components: {
            Loading,
        },
    })
    export default class App extends Vue {

    }
</script>

<style lang="scss">
    @import "./assets/css/styles.scss";
</style>
