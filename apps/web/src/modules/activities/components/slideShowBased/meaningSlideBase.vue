<template>

</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {MediaType} from '../../store/types';
    import BaseComponent from '../../../common/components/baseComponent.vue';
    import {PremiumCollectionLayout, ImageType} from '../../store/types';
    import SlideBase from '@/modules/activities/components/slideShowBased/slideBase.vue';

    @Component
    export default class MeaningSlideBase extends SlideBase {
        @Prop() public parameter?: any;
        public phrase: boolean = false;
        public phraseWord: string = '';

        get isSinglePhotoSlide(): boolean {
            return (this.parameter.layout as PremiumCollectionLayout) === PremiumCollectionLayout.SingleMedia;
        }

        get getMediaTypes(): any {
            return ImageType;
        }


        public getNextRandomPhrase(): string {
            const arrayLen = this.parameter.media.phrases.length;
            const randNum = Math.floor(Math.random() * arrayLen);
            return this.parameter.media.phrases[randNum];
        }


    }
</script>

<style scoped lang="scss">
    /*.imgColor{*/
    /*width: 100%;*/
    /*}*/
    /*.vjs-custom-box {*/
    /*height: 100vh;*/
    /*width: 100%;*/
    /*}*/
</style>