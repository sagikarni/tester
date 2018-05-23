<template>
    <div>
        <h5>Session Length:</h5>
        <v-layout justify-center class="mb-3">
            <div class="d-inline-flex py-2">
                <v-btn-toggle v-model="sessionLength" mandatory>
                    <v-btn flat value="short" class="px-5 py-2">
                        <p class="mb-0">{{ $locale.activities.sessionsInfo.shortText }}</p>
                        6 {{ $locale.general.slidesText }}
                    </v-btn>
                    <v-btn flat value="medium" class="px-5 py-2">
                        <p class="mb-0">{{ $locale.activities.sessionsInfo.mediumText }}</p>
                        12 {{ $locale.general.slidesText }}
                    </v-btn>
                    <v-btn flat value="long" class="px-5 py-2">
                        <p class="mb-0">{{ $locale.activities.sessionsInfo.longText }}</p>
                        18 {{ $locale.general.slidesText }}
                    </v-btn>
                </v-btn-toggle>
            </div>
        </v-layout>
        <v-btn large color="primary">{{ $locale.activities.sessionsInfo.startText }}</v-btn>
    </div>
</template>

<script lang="ts">
    import { Component, Watch } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/BaseComponent.vue';
    import {State, Action, Getter} from 'vuex-class';
    const namespace: string = 'activities';

    @Component
    export default class SessionLength extends BaseComponent {

        @State(state => state.activity) public activityState?: any;
        @Action('getActivity' , {namespace}) public getActivity: any;

        public sessionLength: string = 'long';

        // public $isRTL: boolean = true;
        constructor() {
            super();
        }
        public mounted() {
            this.getActivity({activity: "1"});
        }

    }
</script>

<style scoped>

</style>