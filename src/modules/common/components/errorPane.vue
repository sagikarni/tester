<template>
    <v-layout row justify-center v-if="dialog">
        <v-card class="text-xs-center pt-3" width="90%">
            <v-card-text class="display-1 text-xs-center pb-0">{{$locale.general.oopsTitleText}}</v-card-text>
            <v-card-text v-if="message" class="pa-0 title">{{message}}</v-card-text>
            <v-card-text v-else class="pa-0 title">{{$locale.general.somethingWentWrong}}</v-card-text>
            <v-card-text class="text-xs-center pa-4">
                <v-spacer></v-spacer>
                <v-btn depressed outline  @click.native="tryAgain">{{$locale.general.tryAgainText}}</v-btn>
                <v-btn depressed outline @click.native="goToHomePage">{{$locale.general.homeText}}</v-btn>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<script lang="ts">
    import { Component } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import { Action } from 'vuex-class';
    import { GeneralError } from "@/modules/store/typeClasses";

    @Component
    export default class ErrorPane extends BaseComponent {
        @Action('errorPaneAction') public errorPaneAction?: any;

        public dialog?: boolean;
        public message?: string;

        constructor() {
            super();
            this.dialog = false;
            this.message = '';
        }

        public showError(er: GeneralError) {
            this.message = er.message;
            this.dialog = true;
        }
        public tryAgain() {
            this.hideView();
            this.$router.go(0); // Reloading the current route like this this.$router.currentRoute
        }

        public goToHomePage() {
            this.hideView();
            setTimeout(() => {
                this.$router.push('/'); // Going to home page
            }, 300);
        }

        private hideView() {
            this.dialog = false;
            setTimeout(() => {
                this.errorPaneAction(null);
            }, 1000);
        }
    }
</script>

<style scoped lang="scss">


</style>