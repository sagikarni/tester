<template>
    <div v-if="sessionInfo && sessionInfo.length > 0">
        <h5>{{ $locale.general.sessionLengthText }}</h5>
        <v-layout justify-center class="mb-3">
            <div class="d-inline-flex py-2">
                <v-btn-toggle v-model="sessionLength" mandatory>
                    <v-btn v-for="infoItem in sessionInfo" :key="infoItem.id" flat :value="infoItem.description" class="px-5 py-2">
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

    @Component
    export default class SessionLength extends BaseComponent {

        public sessionLength: string = 'Long';
        public sessionInfo: object[];

        @Prop() public activity?: any;

        constructor() {
            super();
            this.sessionInfo = [];
        }

        @Watch('activity')
        public onPropertyChanged(value: any, oldValue: any) {
            if (value && value.details) {
                this.sessionInfo = value.details.sessionsInfo;
            }
        }
    }
</script>

<style scoped>

</style>