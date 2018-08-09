<template>
    <div>
        <div class="full-height table">
            <div class="cell">
                <div class="cell-content">
                    <img style="width: 100%; background-color: white" class="object-fit_contain"
                         :src="getImagePath(parameter.media.photos[0], getMediaTypes.Content)">
                    <div v-if="question" class="wh-question" @click="changeQuestion">
                        <div class="text_refresh_wrapper">
                            <span class="refresh_icon">
                                <i class="material-icons meaningRefresh"> cached </i>
                            </span>
                            <span class="spanFade meaningSpanFade">{{questionsArray[0]}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {PremiumCollectionLayout, ImageType} from '@/modules/activities/store/types';

    import TimelineMax from 'gsap';

    @Component
    export default class WHQuestionsSlide extends BaseComponent {
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
        public getNextQuestion() {
            const firstQ = this.questionsArray.shift();
            this.questionsArray.push(firstQ);
        }

        public created() {
            if (this.isValid()) {
                this.question = true;
            }
        }

        public changeQuestion() {
            if (!this.transitionEnded) {
                return;
            }

            const elemrefresh = document.getElementsByClassName("meaningRefresh");
            const elemFadingWord = document.getElementsByClassName("meaningSpanFade");

            this.transitionEnded = false;
            (TimelineMax as any).set(elemrefresh, {transform: "rotate(180deg)", autoAlpha: 0.5 });

            (TimelineMax as any).to(elemFadingWord, 0.5,
                {
                    autoAlpha: 0,
                    ease: Power1.easeOut,
                    onComplete: () => {
                        (TimelineMax as any).set(elemrefresh, {transform: "rotate(0deg)", autoAlpha: 1 });
                        this.getNextQuestion();
                        (TimelineMax as any).to(elemFadingWord, 0.5, {
                            autoAlpha: 1, ease: Power1.easeOut, onComplete: () => {
                                this.transitionEnded = true;
                            },
                        });
                    },
                });
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
