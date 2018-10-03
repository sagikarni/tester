<template>
    <div>
        <wh-questions-slide :hasQuestions="hasQquestions" :questions="questionsArray">
            <slide-video-player v-if='isSingleVideoSlide' class="vjs-custom-box vjs-big-play-centered"
                                ref="videoPlayer"
                                :videoPath="videoPath">
            </slide-video-player>
        </wh-questions-slide>
    </div>
</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import {PremiumCollectionLayout, ImageType, MediaType} from '../../store/types';
    import WhQuestionsSlide from '@/modules/activities/components/slideShowBased/whQuestionsSlide.vue';
    import WhQuestionsSlideBase from '@/modules/activities/components/slideShowBased/whQuestionsSlideBase.vue';
    import SlideVideoPlayer from '@/modules/activities/components/slideShowBased/slideVideoPlayer.vue';

    @Component({
        components: {
            WhQuestionsSlide,
            SlideVideoPlayer,
        },
    })
    export default class WhQuestionsVideoSlide extends WhQuestionsSlideBase {
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
