<template>
    <div v-if="sessionLengthInfo && sessionLengthInfo.length > 0">
        <h5>{{ $locale.general.sessionLengthText }}</h5>
        <v-layout justify-center class="mb-3">
            <div class="d-inline-flex py-2">
                <v-btn-toggle v-model="sessionLength" mandatory>
                    <v-btn v-for="infoItem in sessionLengthInfo" :key="infoItem.id" flat :value="infoItem.description" class="px-5 py-2" @click="sessionInfoIdChanged(infoItem.id)">
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
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {SessionsInfo } from '../store/types';
    import {Action} from 'vuex-class';

    const namespace: string = 'activities';

    @Component
    export default class SessionLength extends BaseComponent {

        @Action('updateSessionInfoType' , {namespace}) public updateSessionInfoType: any;

        public sessionLength: string = '';

        @Prop() public sessionLengthInfo?: SessionsInfo[];

        constructor() {
            super();
        }

        public sessionInfoIdChanged(sessionInfoId: number) {
            // TODO need to check why this is not working. Tried @Emit, but it is not working too
            // this.$emit('sessionInfoIdChanged', sessionInfoId);
            this.updateSessionInfoType( {sessionInfoId} );
        }
    }
</script>

<style scoped>

</style>