<template>
    <v-layout row class="ex-activity-main-details" v-if="dataExist">
        <v-flex class="hidden-xs-only mr-4">
            <div class="ex-cover-image-wrapper">
                <img :src="coverPhoto" alt="img" width="100%" height="100%">
            </div>
        </v-flex>
        <v-flex :class="{'ex-rtl': $isRTL === true}">
            <h2>{{title}}</h2>
            <p>{{description}}</p>
            <v-layout row justify-space-around class="text-xs-center">
                <v-flex>
                    <p class="mb-1">{{mediaCount}} {{ $locale.general.slidesText }}</p>
                    <i class="ex-slides"></i>
                </v-flex>
                <v-flex>
                    <p class="mb-1">{{mediaTypeText}}</p>
                    <i :class="mediaTypeIconClass"></i>
                </v-flex>
                <v-flex>
                    <p class="mb-1">{{orientationText}}</p>
                    <i :class="orientationIconClass"></i>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import { Component, Watch, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {MediaType, Orientation} from '../../store/types';

    @Component
    export default class ActivityMainDetails extends BaseComponent {
        @Prop() public activity?: any;

        public dataExist: boolean = false;
        public title: string = "";
        public description: string = "";
        public coverPhoto: string = "";
        public mediaCount: number = 0;
        public mediaType: number = 0;
        public mediaTypeText: string = "";
        public mediaTypeIconClass: string = "";
        public orientation: number = 0;
        public orientationText: string = "";
        public orientationIconClass: string = "";

        constructor() {
            super();
        }

        @Watch('activity')
        public onPropertyChanged(value: any, oldValue: any) {
            if (value && value.details) {
                this.dataExist = true;
                this.title = value.details.title;
                this.description = value.details.description;
                this.coverPhoto = value.details.coverPhoto;
                this.mediaCount = value.details.mediaCount;

                this.mediaType = value.details.mediaType;
                if (value.details.mediaType === MediaType.Photo) {
                    this.mediaTypeText = this.$locale.activities.activityDetails.photoBasedText;
                    this.mediaTypeIconClass = "ex-photo";
                } else if (value.details.mediaType === MediaType.Video) {
                    this.mediaTypeText = this.$locale.activities.activityDetails.videoBasedText;
                    this.mediaTypeIconClass = "ex-play-video";
                }
                //
                this.orientation = value.details.orientation;
                if (value.details.orientation === Orientation.Landscape) {
                    this.orientationText = this.$locale.activities.activityDetails.landscapeText;
                    this.orientationIconClass = "ex-landscape";
                } else if (value.details.orientation === Orientation.Portrait) {
                    this.orientationText = this.$locale.activities.activityDetails.portraitText;
                    this.orientationIconClass = "ex-portrait";
                }
            }
        }
    }
</script>