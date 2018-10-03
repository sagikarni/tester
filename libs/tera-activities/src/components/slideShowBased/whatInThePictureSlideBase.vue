<template>

</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {ImageType} from '../../../store/typeEnums';
    import SlideBase from '@/modules/activities/components/slideShowBased/slideBase.vue';

    @Component
    export default class WhatInThePictureSlideBase extends SlideBase {
        @Prop() public parameter?: any;
        public hasQquestions: boolean = false;

        get questionsArray(): any[] {
            return this.parameter && this.parameter.media && this.parameter.media.questions;
        }

        public isValid(): boolean {
            return this.parameter && this.parameter.media && this.parameter.media.questions && this.parameter.media.questions.length > 0;
        }

        get getMediaTypes(): any {
            return ImageType;
        }

        public created() {
            if (this.isValid()) {
                this.hasQquestions = true;
            }
        }

    }
</script>

<style scoped lang="scss">

</style>
