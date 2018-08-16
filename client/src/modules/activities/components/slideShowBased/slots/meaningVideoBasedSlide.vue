<template>
    <div>
        <meaning-bar>
            <slide-video-player v-if='isSingleVideoSlide' class="vjs-custom-box vjs-big-play-centered"
                                ref="videoPlayer"
                                :videoPath="videoPath">
            </slide-video-player>
        </meaning-bar>
    </div>
</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import {PremiumCollectionLayout, ImageType, MediaType} from '@/modules/activities/store/types';
    import SlideVideoPlayer from '@/modules/activities/components/slideShowBased/slideVideoPlayer.vue';
    import MeaningSlideBase from '@/modules/activities/components/slideShowBased/slots/meaningSlideBase.vue';
    import MeaningBar from '@/modules/activities/components/slideShowBased/slots/meaningBar.vue';

    @Component({
        components: {
            MeaningBar,
            SlideVideoPlayer,
        },
    })
    export default class MeaningVideoBasedSlide extends MeaningSlideBase {
        @Prop() public parameter?: any;
        public playerOptions: any;
        public pause: boolean = false;

        get player(): SlideVideoPlayer {
            return (this.$refs.videoPlayer as SlideVideoPlayer);
        }

        get videoPath(): string {
            return this.getImagePath(this.parameter.media.videos[0], this.getImageTypes.Content, this.getMediaTypes.Video);
        }

        get getImageTypes(): any {
            return ImageType;
        }

        get getMediaTypes(): any {
            return MediaType;
        }

        get isSingleVideoSlide(): boolean {
            return (this.parameter.layout as PremiumCollectionLayout) === PremiumCollectionLayout.SingleMedia;
        }

    }

</script>

<style scoped lang="scss">
    .full-height {
        background: #F8F8F8;
    }

    .vjs-custom-box {
        height: calc(100vh - 60px);
    }

    .table {
        display: table;
        height: 100%;
        width: 100%;
        position: relative;
        background: transparent !important;
    }

    .imgColor {
        width: 100%;
    }

    .vjs-custom-box {
        height: 100vh;
        width: 100%;
    }
</style>
