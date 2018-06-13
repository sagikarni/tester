<template>
    <v-toolbar flat dense app fixed clipped-left class="top_pane" @click="showPane">
        <v-btn v-if="isCloseBtnVisible" absolute right outline color="white" class="close_activity mr-0-xs" @click="$router.go(-1)">Close</v-btn>
    </v-toolbar>
</template>
<script lang="ts">
    import { Component } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import TimelineMax from 'gsap';

    @Component
    export default class SlideShowMenuPane extends BaseComponent {
        public isCloseBtnVisible?: boolean = true;

        public created() {
             setTimeout(() => {
              this.hidePaneInternal(1);
            }, 3000);
        }

       public showPane(): void {
            (TimelineMax as any).to('.top_pane', 0.2, {opacity: .86 , onComplete: () => {
                this.isCloseBtnVisible = true;
            }});
        }
        public hidPane(): void {
            this.hidePaneInternal(0.2);
        }

        private hidePaneInternal(animationTime: number): void {
             (TimelineMax as any).to('.top_pane', animationTime, {opacity: 0.07, onComplete: () => {
                this.isCloseBtnVisible = false;
            }});
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
