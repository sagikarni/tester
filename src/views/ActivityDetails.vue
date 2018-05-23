<template>
    <section class="ex-activity-details-component">
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
        <activity-main-details></activity-main-details>
        <div class="ex-session-info mt-5 pt-3">
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
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import {State, Action, Getter} from 'vuex-class';
    import ActivityMainDetails from '@/modules/activities/components/activitydetails/activityMainDetails.vue';
    import {IActivitiesState} from "@/modules/activities/store/types";

    const namespace: string = 'activities';


    @Component({
        components: {
            ActivityMainDetails,
        },
    })
    export default class ActivityDetails extends Vue {
         @State(state => state.activities) public activitiesState?: IActivitiesState;

        public socialNetworks: object[];
        public sessionLength: string = 'long';
        // public $isRTL: boolean = true;
        constructor() {
            super();
            this.socialNetworks = [
                { id: 1, title: this.$locale.general.social.facebook },
                { id: 2, title: this.$locale.general.social.google },
                { id: 3, title: this.$locale.general.social.twitter },
            ];
        }
    }
</script>