<template>
    <div>
        <wh-questions-slide-base :question="question" :questionsText="questionsArray">
            <img style="width: 100%; background-color: white" class="object-fit_contain"
                 :src="getImagePath(parameter.media.photos[0], getMediaTypes.Content)"/>
        </wh-questions-slide-base>

    </div>
</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {PremiumCollectionLayout, ImageType} from '@/modules/activities/store/types';
    import whQuestionsSlideBase from '@/modules/activities/components/slideShowBased/slots/whQuestionsSlideBase.vue';


    @Component({
        components: {
            whQuestionsSlideBase,
        },
    })
    export default class WHQuestionsPhotoSlide extends BaseComponent {
        @Prop() public parameter?: any;
        public question: boolean = false;
        public transitionEnded = true;
        public buttonSheet: boolean = true;

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
                this.question = true;
            }
        }

        public pauseAction(): void {
            // do nothing
        }
        public stopAction(): void {
            // do nothing
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
    .object-fit_contain { object-fit: contain }
    .full-height{
        height:100%;
        background:#F8F8F8;
    }
    .table{
        display:table;
        width:100%;
        position:relative;
        background: transparent!important;
    }

    .cell {
        display: table-cell;
        vertical-align: middle;
        width: 100%;
        margin: 0 auto;
        height: 100%;
        text-align: center;
        .cell-content {
            position: relative;
            max-height: 100vh !important;
        }
    }

    .wh-question {
        cursor: pointer;
        position: absolute;
        padding: 7px 55px 1px 100px;
        color: white;
        bottom: 16px;
        left: 0;
        text-align: left;
        box-sizing: border-box;
        font-size: 18px;
        background: rgba(0, 0, 0, 0.6);
        width: 100%;
        .text_refresh_wrapper {
            display: inline-block;
            position: relative;
            min-width: 150px;
        }
        span {
            font-size: 24px;
            min-width: 150px;
            display: inline-block;
            float: left;
            line-height: 32px;
            padding-left: 80px;
        }
        .refresh_icon {
            position: absolute;
            top: -7px;
            left: 0;
            width: 40px;
            min-width: 55px;
            background: #000000;
            margin-right: 0;
            padding-left: 0;
        }
        i {
            font-size: 32px;
            float: right;
            margin: 0 10px;
            margin: 8px 10px;
            transition: all 0.5s;
        }
    }

</style>
