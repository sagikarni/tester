<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="50%">
            <v-card>
                <v-card-title class="headline">{{$locale.general.oopsTitleText}}</v-card-title>
                <v-card-text v-if="message">{{message}}</v-card-text>
                <v-card-text v-else>{{$locale.general.somethingWentWrong}}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native="tryAgain">{{$locale.general.tryAgainText}}</v-btn>
                    <v-btn color="green darken-1" flat @click.native="goToHomePage">{{$locale.general.homeText}}</v-btn>
                </v-card-actions>
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