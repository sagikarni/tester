<template>
    <div class="menu">
        <v-menu v-if="!$isRTL"
                offset-y
                origin="center center"
                transition="scale-transition"
                content-class="ex-social-menu"
                bottom>
            <v-btn flat color="dark" slot="activator" class="ma-0">
                <i class="ex-share-icon mr-2"></i>
                {{ $locale.general.social.shareText }}
            </v-btn>
            <v-list>
                <v-list-tile v-for="network in socialNetworks" :key="network.id" @click="">
                    <v-icon class="mr-2">{{ network.icon }}</v-icon>
                    <v-list-tile-title class="text-xs-left">{{ network.title }}</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>

        <v-menu v-if="$isRTL"
                offset-y
                origin="center center"
                transition="scale-transition"
                content-class="ex-social-menu"
                bottom>
            <v-btn flat color="dark" slot="activator" class="ma-0">
                <i class="ex-share-icon mr-2"></i>
                {{ $locale.general.social.shareText }}
            </v-btn>
            <v-list>
                <v-list-tile v-for="network in socialNetworks" :key="network.id" @click="">
                    <v-list-tile-title class="text-xs-right">{{ network.title }}</v-list-tile-title>
                    <v-icon class="ml-2">{{ network.icon }}</v-icon>
                </v-list-tile>
            </v-list>
        </v-menu>
    </div>

</template>

<script lang="ts">
    import { Component } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';

    @Component
    export default class SocialShare extends BaseComponent {

        public socialNetworks: object[];

        constructor() {
            super();
            this.socialNetworks = [
                { id: 1, title: this.$locale.general.social.networks.facebookText, icon: 'fab fa-facebook-f' },
                { id: 2, title: this.$locale.general.social.networks.googleText, icon: 'fab fa-google-plus-g' },
                { id: 3, title: this.$locale.general.social.networks.twitterText, icon: 'fab fa-twitter' },
            ];
        }
    }
</script>

<style scoped>

</style>