<template>
    <v-layout row wrap class="mb-3">
        <v-flex xs3>
            <v-btn flat icon color="dark" class="ml-0">
                <i class="ex-back-arrow-icon"></i>
            </v-btn>
        </v-flex>
        <v-flex xs9 class="text-xs-right" style="align-self: center">
            <v-menu origin="center center"
                    transition="scale-transition"
                    bottom>
                <v-btn flat color="dark" slot="activator" class="ma-0">
                    <i class="ex-share-icon mr-2"></i>
                    {{ $locale.general.social.shareText }}
                </v-btn>
                <v-list>
                    <v-list-tile v-for="network in socialNetworks" :key="network.id" @click="">
                        <v-list-tile-title>{{ network.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-btn flat color="dark" class="ma-0" :class="{'rtl': $isRTL === true}">
                <i class="ex-pin-icon mr-2"></i>
                {{ $locale.general.social.pin }}
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import { Component } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/BaseComponent.vue';

    @Component
    export default class ActivityDetails extends BaseComponent {

        public socialNetworks: object[];

        // public $isRTL: boolean = true;
        constructor() {
            super();
            this.socialNetworks = [
                { id: 1, title: this.$locale.general.social.networks.facebookText },
                { id: 2, title: this.$locale.general.social.networks.googleText },
                { id: 3, title: this.$locale.general.social.networks.twitterText },
            ];
        }
    }
</script>

<style scoped>

</style>