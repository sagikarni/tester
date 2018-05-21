<template>
    <div>
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
                        Share
                    </v-btn>
                    <v-list>
                        <v-list-tile v-for="network in socialNetworks" :key="network.id" @click="">
                            <v-list-tile-title>{{ network.title }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <v-btn flat color="dark" class="ma-0">
                    <i class="ex-pin-icon mr-2"></i>
                    Pin
                </v-btn>
            </v-flex>
        </v-layout>
        <activity-main-details></activity-main-details>
    </div>
</template>
<script lang="ts">
    import ActivityMainDetails from './ActivityMainDetails.vue';

    @Component({
        components: {
            ActivityMainDetails,
        },
    })

    export default {
        name: 'ActivityDetails',
        components: {ActivityMainDetails},
        data: () => ({
            socialNetworks: [
                { id: 1, title: 'Facebook' },
                { id: 2, title: 'Google' },
                { id: 3, title: 'Twitter' },
            ],
        }),
    };
</script>

<style lang="scss">
    .ex-back-arrow-icon{
        width: 20px;
        height: 20px;
        display: inline-block;
        background-image: url(../../public/img/icons/arrow-down.png);
        -webkit-background-size: contain;
        background-size: contain;
        -webkit-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
    }
    .ex-share-icon{
        width: 15px;
        height: 15px;
        display: inline-block;
        background-image: url(../../public/img/icons/share.png);
        -webkit-background-size: contain;
        background-size: contain;
    }
    .ex-pin-icon{
        width: 15px;
        height: 15px;
        display: inline-block;
        background-image: url(../../public/img/icons/pin.png);
        -webkit-background-size: contain;
        background-size: contain;
    }
</style>