<template>
    <v-layout class="ex-activity-main-details" :class="{'ex-dir-row-reverse': $isRTL}" v-if="activityMainDetailsInfo.dataExist">
        <v-flex class="hidden-xs-only ex-fixed-image-scope" :class="[$isRTL ? 'ml-4' : 'mr-4']">
            <div class="ex-cover-image-wrapper">
                <img :src="activityMainDetailsInfo.coverPhoto" alt="img" width="100%" height="100%">
            </div>
        </v-flex>
        <v-flex :class="{'ex-rtl': $isRTL === true}">
            <v-layout column class="ex-main-info-wrapper">
                <h2>{{activityMainDetailsInfo.title}}</h2>
                <p>{{activityMainDetailsInfo.description}}</p>
                <section class="ex-mt-auto">
                    <v-layout row justify-space-around class="text-xs-center">
                        <v-flex>
                            <p class="mb-1">{{activityMainDetailsInfo.mediaCount}} {{ $locale.general.slidesText }}</p>
                            <i class="ex-slides"></i>
                        </v-flex>
                        <v-flex>
                            <p class="mb-1">{{activityMainDetailsInfo.mediaTypeText}}</p>
                            <i :class="activityMainDetailsInfo.mediaTypeIconClass"></i>
                        </v-flex>
                        <v-flex>
                            <p class="mb-1">{{activityMainDetailsInfo.orientationText}}</p>
                            <i :class="activityMainDetailsInfo.orientationIconClass"></i>
                        </v-flex>
                    </v-layout>
                </section>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import { Component, Watch, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {MediaType, Orientation, ActivityMainDetailsInfo} from '../../store/types';

    @Component
    export default class ActivityMainDetails extends BaseComponent {

        @Prop() public activityMainDetailsInfo?: ActivityMainDetailsInfo;

        constructor() {
            super();
        }
    }
</script>