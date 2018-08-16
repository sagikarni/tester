<template>
    <video-player class="vjs-custom-box vjs-big-play-centered"
                  ref="videoPlayer"
                  @play="onPlayerPlay($event)"
                  :options="playerOptions"
                  :playsinline="true">

    </video-player>
</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {PremiumCollectionLayout, ImageType, MediaType} from '@/modules/activities/store/types';

    @Component
    export default class SlideVideoPlayer extends BaseComponent {
        @Prop() public videoPath?: string;
        public playerOptions: any;
        public pause: boolean = false;

        get player(): any {
            return (this.$refs.videoPlayer as any).player;
        }

        get getImageTypes(): any {
            return ImageType;
        }

        get getMediaTypes(): any {
            return MediaType;
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

        public created() {
            this.playerOptions = {
                autoplay: false,
                muted: true,
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: "video/mp4",
                    src: this.videoPath,
                }],
            };
        }

        public revertWitpModal(): void {
            // do nothing
        }

        public showFirstShape() {
            // do nothing
        }

    }
</script>

<style scoped lang="scss">
    .full-height {
        background: #F8F8F8;
    }

    .table {
        display: table;
        height: 100%;
        width: 100%;
        position: relative;
        background: transparent !important;
    }

</style>
