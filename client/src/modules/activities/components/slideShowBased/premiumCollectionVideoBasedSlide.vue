<template>
    <div v-if="isSingleVideoSlide" class="full-height table">
        <slide-video-player class="vjs-custom-box vjs-big-play-centered"
                            ref="videoPlayer"
                            :videoPath="videoPath" >

        </slide-video-player>
    </div>
</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {PremiumCollectionLayout, ImageType, MediaType} from '@/modules/activities/store/types';
    import SlideVideoPlayer from '@/modules/activities/components/slideShowBased/slideVideoPlayer.vue';


    @Component({
        components: {
            SlideVideoPlayer,
        },
    })
    export default class PremiumCollectionVideoBasedSlide extends BaseComponent {
        @Prop() public parameter?: any;
        public playerOptions: any;
        public pause: boolean = false;

        get player(): SlideVideoPlayer {
            return (this.$refs.videoPlayer as SlideVideoPlayer);
        }

        get videoPath(): string {
            return this.getImagePath(this.parameter.media.videos[0], this.getImageTypes.Content, this.getMediaTypes.Video);
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

    .table {
        display: table;
        height: 100%;
        width: 100%;
        position: relative;
        background: transparent !important;
    }

</style>
