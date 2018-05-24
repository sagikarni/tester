<template>
    <div v-if="sessionLengthInfo && sessionLengthInfo.length > 0">
        <h5>{{ $locale.general.sessionLengthText }}</h5>
        <v-layout justify-center class="mb-3">
            <div class="d-inline-flex py-2">
                <v-btn-toggle v-model="sessionLength" mandatory>
                    <v-btn v-for="infoItem in sessionLengthInfo" :key="infoItem.id" flat :value="infoItem.description" class="px-5 py-2">
                        <p class="mb-0">{{infoItem.description}}</p>
                        {{infoItem.slidesCount}} {{ $locale.general.slidesText }}
                    </v-btn>
                </v-btn-toggle>
            </div>
        </v-layout>
        <v-btn large color="primary">{{ $locale.activities.sessionsInfo.startText }}</v-btn>
    </div>
</template>

<script lang="ts">
    import { Component, Watch, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {SessionsInfo } from '../store/types';
    @Component
    export default class SessionLength extends BaseComponent {

        public sessionLength: string = '';

        @Prop() public sessionLengthInfo?: SessionsInfo[];

        constructor() {
            super();
         }

    }
</script>

<style scoped>

</style>