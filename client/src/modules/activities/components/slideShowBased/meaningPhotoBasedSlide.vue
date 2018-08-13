<template>
    <div>
        <div v-if="isSinglePhotoSlide" class="full-height table">
            <div class="cell">
                <div class="cell-content">
                    <img style="width: 100%; background-color: white" class="object-fit_contain"
                           :src="getImagePath(parameter.media.photos[0], getMediaTypes.Content)"/>
                    <div v-if="phrase" class="phrases" @click="randomWord">
                        <span class="spanFade meaningSpanFade">{{phraseWord}}</span>
                        <span class="refresh_icon">
                            <i class="material-icons meaningRefresh"> cached </i>
                        </span>
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
    export default class PremiumCollectionPhotoBasedSlide extends BaseComponent {
        @Prop() public parameter?: any;
        public phraseWord: string = '';
        public phrase: boolean = false;
        public transitionEnded = true;

        get isSinglePhotoSlide(): boolean {
            return (this.parameter.layout as PremiumCollectionLayout) === PremiumCollectionLayout.SingleMedia;
        }
        get getMediaTypes(): any {
            return ImageType;
        }
        public isValid(): boolean {
            return this.parameter && this.parameter.media && this.parameter.media.phrases && this.parameter.media.phrases.length > 0;
        }
        public getNextRandomPhrase(): string {
          const arrayLen = this.parameter.media.phrases.length;
          const randNum = Math.floor(Math.random() * arrayLen);
          return this.parameter.media.phrases[randNum];
        }

        public created() {
            if (this.isValid()) {
                  this.phraseWord = this.getNextRandomPhrase();
                  this.phrase = true;
            }
        }

        public randomWord() {
            if (!this.transitionEnded) {
              return;
            }
            const elemrefresh = document.getElementsByClassName("meaningRefresh");
            const elemFadingWord = document.getElementsByClassName("meaningSpanFade");

            this.transitionEnded = false;
            (TimelineMax as any).to(elemrefresh, 0, {transform: "rotate(180deg)", autoAlpha: 0.5 });
            (TimelineMax as any).to(elemFadingWord, 0.5,
            {
                  css: {"margin-right": "-200px", "alpha": "0"},
                  ease: Power1.easeOut,
                  onComplete: () => {
                         (TimelineMax as any).to(elemrefresh, 0, {transform: "rotate(0deg)", autoAlpha: 1 });
                         (TimelineMax as any).set(elemFadingWord, {
                         css: {"margin-left": "-400px"},
                        });
                         this.phraseWord = this.getNextRandomPhrase();
                         (TimelineMax as any).to(elemFadingWord, 0.5, {
                         css: {"margin-left": "-200px", "alpha": "1"}, ease: Power1.easeOut, onComplete: () => {
                             this.transitionEnded = true;
                          },
                         });
                        },
                      });
            (TimelineMax as any).to(elemFadingWord, 0, {css: {"margin-left": "0", "margin-right": "0"}});
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
    .full-height.two{
        background:#ACACAC;
    }
    .full-height.three{
        background:#5E5E5E;
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

    .phrases {
        cursor: pointer;
        position: absolute;
        padding: 7px 55px  35px 35px;
        color: white;
        bottom: 50px;
        left: 0;
        box-sizing: border-box;
        font-size: 18px;
        background: rgba(0, 0, 0, 0.6);
        width: 260px;
        height: 50px;
        span {
            font-size: 24px;
            min-width: 150px;
        }
        .refresh_icon{
            position: absolute;
            right: 0;
            width: 40px;
            min-width: 55px;
            height: 100%;
            top: 0;
            display: block;
            background: #000000;
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
