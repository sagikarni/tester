<template>
    <section class="ex-activity-details-component">
        <social-share></social-share>
        <activity-main-details :activity="activityState"></activity-main-details>
        <div class="ex-session-info mt-5 pt-3">
            <session-length :activity="activityState"></session-length>
        </div>
        <image-gallery></image-gallery>
    </section>
</template>

<script lang="ts">
    import { Component, Watch } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {State, Action} from 'vuex-class';
    import ActivityMainDetails from '@/modules/activities/components/activitydetails/activityMainDetails.vue';
    import ImageGallery from '@/modules/common/components/imageGallery.vue';
    import SessionLength from '@/modules/activities/components/sessionLength.vue';
    import SocialShare from '@/modules/common/components/socialShare.vue';
    import {IActivitiesState} from "@/modules/activities/store/types";

    const namespace: string = 'activities';


    @Component({
        components: {
            ActivityMainDetails,
            ImageGallery,
            SocialShare,
            SessionLength,
        },
    })
    export default class ActivityDetails extends BaseComponent {
        @State(state => state.activities.activity) public activityState?: any;
        @Action('getActivity' , {namespace}) public getActivity: any;

        constructor() {
            super();
        }

        public created() {
            this.getActivity({activity: "1"});
        }
    }
</script>