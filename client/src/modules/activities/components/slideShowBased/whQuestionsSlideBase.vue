<template>

</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { MediaType} from '../../store/types';
    import { ImageType } from '../../../store/typeEnums';
    import BaseComponent from '../../../common/components/baseComponent.vue';
    import SlideBase from '@/modules/activities/components/slideShowBased/slideBase.vue';
    @Component
    export default class WhQuestionsSlideBase extends SlideBase {
         @Prop() public parameter?: any;
        public hasQquestions: boolean = false;

        get questionsArray(): any[] {
            return this.parameter && this.parameter.media && this.parameter.media.questions;
        }
        get getMediaTypes(): any {
            return ImageType;
        }
        public isValid(): boolean {
            return this.parameter && this.parameter.media && this.parameter.media.questions && this.parameter.media.questions.length > 0;
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
