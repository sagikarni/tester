<template>
    <v-toolbar flat dense app fixed clipped-left class="top_pane" @click="showPane">
        <v-btn absolute right outline color="white" class="close_activity mr-0-xs" @click="$router.go(-1)">Close</v-btn>
    </v-toolbar>
</template>

<script lang="ts">
    import { Component } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import TimelineMax from 'gsap';

    @Component
    export default class SlideShowMenuPane extends BaseComponent {
        public created() {
            this.hidden();
        }
        public hidden(): void {
            setTimeout(() => {
                (TimelineMax as any).to('.top_pane', 1, {opacity : 0 });
            } , 3000);
        }
        public showPane(): void {
            (TimelineMax as any).to('.top_pane', 0.5, {opacity : .86 });
            this.hidden();
        }
    }
</script>

<style scoped lang="scss">
    .close_activity {
        margin-right: 100px !important;
    }
    .top_pane{
        opacity: 0.5;
        background-color: rgba(204,204, 255, .2);
    }
    @media only screen and (max-width: 960px) {
        .close_activity.mr-0-xs {
            margin-right: 50px !important;
        }
    }
</style>
