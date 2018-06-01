<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="400px">
            <v-card class="text-xs-center pt-3">
                <v-card-text class="display-1 text-xs-center pb-0">{{$locale.general.oopsTitleText}}</v-card-text>
                <v-card-text v-if="message" class="pa-0 title">{{message}}</v-card-text>
                <v-card-text v-else class="pa-0 title">{{$locale.general.somethingWentWrong}}</v-card-text>
                <v-card-text class="text-xs-center pa-4">
                    <v-spacer></v-spacer>
                    <v-btn depressed outline  @click.native="tryAgain">{{$locale.general.tryAgainText}}</v-btn>
                    <v-btn depressed outline @click.native="goToHomePage">{{$locale.general.homeText}}</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {Action} from 'vuex-class';

    @Component
    export default class ErrorModal extends BaseComponent {
        @Action('errorModalDialog') public errorModalDialog?: any;

        @Prop() public dialog?: boolean;
        @Prop() public message?: string;

        constructor() {
            super();
        }

        public tryAgain() {
            this.hideModal();
            this.$router.go(0); // Reloading the current route like this this.$router.currentRoute
        }

        public goToHomePage() {
            this.hideModal();
            this.$router.push('/'); // Going to home page
        }

        private hideModal() {
            setTimeout(() => {
                this.errorModalDialog({dialog: false, message: ''});
            }, 1000);
        }
    }
</script>

<style scoped lang="scss">

</style>
