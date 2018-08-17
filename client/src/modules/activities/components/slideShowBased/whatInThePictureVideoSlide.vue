<template>

    <what-in-the-picture :parameter="parameter">
        <slide-video-player v-if='isSingleVideoSlide' class="vjs-custom-box vjs-big-play-centered"
                            ref="videoPlayer"
                            :videoPath="videoPath">
        </slide-video-player>
    </what-in-the-picture>

</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import {PremiumCollectionLayout, ImageType, MediaType} from '../../store/types';
    import TimelineMax from 'gsap';
    import WhatInThePicture from '@/modules/activities/components/slideShowBased/whatInThePicture.vue';
    import WhatInThePictureSlideBase from '@/modules/activities/components/slideShowBased/whatInThePictureSlideBase.vue';
    import SlideVideoPlayer from '@/modules/activities/components/slideShowBased/slideVideoPlayer.vue';


    const timeLineMax = TimelineMax as any;

    @Component({
        components: {
            WhatInThePicture,
            SlideVideoPlayer,
        },
    })
    export default class WhatInThePictureVideoSlide extends WhatInThePictureSlideBase {
        @Prop() public parameter?: any;
        get player(): SlideVideoPlayer {
            return (this.$refs.videoPlayer as SlideVideoPlayer);
        }
        get isSingleVideoSlide(): boolean {
            return (this.parameter.layout as PremiumCollectionLayout) === PremiumCollectionLayout.SingleMedia;
        }
        get videoPath(): string {
            return this.getImagePath(this.parameter.media.videos[0], this.getImageTypes.Content, this.getMediaTypes.Video);
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