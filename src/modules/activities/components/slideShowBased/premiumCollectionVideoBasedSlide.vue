<template>
        <div v-if="isSingleVideoSlide" class="full-height table">
            <video-player class="vjs-custom-box vjs-big-play-centered"
                          ref="videoPlayer"
                          @play="onPlayerPlay($event)"
                          :options="playerOptions"
                          :playsinline="true">
            </video-player>
        </div>
</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {PremiumCollectionLayout} from '@/modules/activities/store/types';

    @Component
    export default class PremiumCollectionVideoBasedSlide extends BaseComponent {
        @Prop() public parameter?: any;
        public playerOptions: any;
        public pause: boolean = false;
        constructor() {
            super();
            this.playerOptions = {
                autoplay: false,
                muted: true,
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: "video/mp4",
                    src: this.videoSrc(),
                }],
            };
        }

        get player(): any {
            return (this.$refs.videoPlayer as any).player;
        }

        get isSingleVideoSlide(): boolean {
            return (this.parameter.layout as PremiumCollectionLayout) === PremiumCollectionLayout.SingleMedia;
        }

        public onPlayerPlay(player: any) {
            this.pause = true;
        }

        public pauseAction(): void {
            if (!this.player.paused() && !this.pause) {
                this.player.pause();
            }
            this.pause = false;
        }

        public stopAction(): void {
            if (!this.player.paused()) {
                this.player.pause();
            }
            this.player.currentTime(0);
            this.pause = false;
        }

        public videoSrc(): string {
            return this.selectVideoMedia(this.parameter.media.videos[0]);
        }

    }
</script>

<style scoped lang="scss">
    .full-height{
        background:#F8F8F8;
    }
    .table{
        display:table;
        height:100%;
        width:100%;
        position:relative;
        background: transparent;
    }

</style>
