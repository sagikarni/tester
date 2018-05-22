<template>
    <v-layout row class="ex-activity-main-details">
        <v-flex class="hidden-sm-and-down mr-4">
            <div class="ex-cover-image-wrapper">
                <img :src="coverImagePath" alt="img" width="100%" height="100%">
            </div>
        </v-flex>
        <v-flex>
            <h2>Card Deck Name</h2>
            <p>This is a short description of the deck.  It should be between one to 2 lines. It just indicates what this pack contains (not what you can do with the pack)</p>
            <v-layout row justify-space-around class="text-xs-center">
                <v-flex>
                    <p class="mb-1">18 {{ $locale.general.slidesText }}</p>
                    <i class="ex-slides"></i>
                </v-flex>
                <v-flex>
                    <p class="mb-1">{{$locale.activities.activityDetails.videoBasedText}}</p>
                    <i class="ex-play-video"></i>
                </v-flex>
                <v-flex>
                    <p class="mb-1">{{$locale.activities.activityDetails.landscapeText}}</p>
                    <i class="ex-landscape"></i>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class ActivityMainDetails extends Vue {
        public coverImagePath: string = "../public/img/coverDemo.png";
    }
</script>