<template>
  <div id="app">
    <loading ref="loading"></loading>
    <v-app id="inspire" class="theme-dark">
        <transition name="page" mode="out-in">
         <router-view></router-view>
        </transition>
    </v-app>
    <error-modal :dialog="dialog" :message="dialogMessage"></error-modal>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
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
        @State(state => state.errorModalDialog) public errorModalDialog?: boolean;
        @State(state => state.errorModalMessage) public errorModalMessage?: string;

        get dialog(): boolean {
            if (this.errorModalDialog === undefined) {
                return false;
            }
            return this.errorModalDialog;
        }
        get dialogMessage(): string {
            if (this.errorModalMessage === undefined) {
                return 'Something Went Wrong';
            }
            return this.errorModalMessage;
        }
    }
</script>

<style lang="scss">
    @import "./assets/css/styles.scss";
</style>
