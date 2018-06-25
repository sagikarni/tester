<template>
    <div>
        <div v-if="isSinglePhotoSlide" class="full-height table">
            <div class="cell">
                <div class="cell-content">
                    <img style="width: 100%; background-color: white" class="object-fit_contain"
                         :src="selectPhotoMedia(parameter.media.photos[0])">
                    <div v-if="phrase" class="phrases" @click="randomWord">
                        <span class="spanFade" id="meaningSpanFade">{{phraseWord}}</span>
                    </div>
                </div>
            </div>
            <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent>
                    <div class="cardWrapper">
                    <div class="card" @click="ttt($event)">
                        <div class="cardFace front"><h1>front</h1></div>
                        <div class="cardFace back"><h1>{{this.parameter.media.questions[0]}}</h1></div>
                    </div>
                </div>
                    <div class="cardWrapper">
                        <div class="card">
                            <div class="cardFace front"><h1>front</h1></div>
                            <div class="cardFace back"><h1>{{this.parameter.media.questions[1]}}</h1></div>
                        </div>
                    </div>
                    <div class="cardWrapper">
                        <div class="card">
                            <div class="cardFace front"><h1>front</h1></div>
                            <div class="cardFace back"><h1>{{this.parameter.media.questions[2]}}</h1></div>
                        </div>
                    </div>
                    <div class="cardWrapper">
                        <div class="card">
                            <div class="cardFace front"><h1>front</h1></div>
                            <div class="cardFace back"><h1>{{this.parameter.media.questions[3]}}</h1></div>
                        </div>
                    </div>
                    <v-btn color="darken-1" flat @click.native="dialog = false"><v-icon>close</v-icon></v-btn>
                    <v-btn color="darken-1" flat @click.native="dialog = false">Close</v-btn>
                    <v-card>
                        <v-card-actions>
                            <!--<v-spacer></v-spacer>-->

                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </div>
    </div>

</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {PremiumCollectionLayout} from '@/modules/activities/store/types';
    import TimelineMax from 'gsap';

    @Component
    export default class PremiumCollectionPhotoBasedSlide extends BaseComponent {
        @Prop() public parameter?: any;
        public phraseWord: string = '';
        public phrase: boolean = false;
        public transitionEnded = true;
        public dialog: boolean = false;

        get isSinglePhotoSlide(): boolean {
            return (this.parameter.layout as PremiumCollectionLayout) === PremiumCollectionLayout.SingleMedia;
        }
        public isValid(): boolean {
            return this.parameter && this.parameter.media && this.parameter.media.questions && this.parameter.media.questions.length > 0;
        }
        public getNextRandomPhrase(): string {
            const arrayLen = this.parameter.media.questions.length;
            const randNum = Math.floor(Math.random() * arrayLen);
            return this.parameter.media.questions[randNum];
        }

        public created() {
            if (this.isValid()) {
                this.phraseWord = this.$locale.activities.switchQuestions;
                this.phrase = true;
            }
        }

        public randomWord() {
            this.dialog = true;
            (TimelineMax as any).set(".cardWrapper", {perspective: 800});
            (TimelineMax as any).set(".card", {transformStyle: "preserve-3d"});
            (TimelineMax as any).set(".back", {rotationY: -180});
            (TimelineMax as any).set([".back", ".front"], {backfaceVisibility: "hidden"});
            (TimelineMax as any).staggerTo(".card", 1, {rotationY: -180, repeat: 1, yoyo: true}, 0.1);
        }

        public ttt(event: any) {
            console.log('event', event.currentTarget);
            if (this.transitionEnded) {
                (TimelineMax as any).to((event.currentTarget), 1.2, {rotationY: 180, ease: Back.easeOut});
                this.transitionEnded = false;
            } else {
                (TimelineMax as any).to((event.currentTarget), 1.2, {rotationY: 0, ease: Back.easeOut});
                this.transitionEnded = true;
            }
            // (event: any) => {
            //     (TimelineMax as any).to((event.target).find(".card"), 1.2, {rotationY:180, ease:Back.easeOut});
            // },
            // (event: any) => {
            //     (TimelineMax as any).to((event.target).find(".card"), 1.2, {rotationY:0, ease:Back.easeOut});
            // }
        }
        public pauseAction(): void {
            // do nothing
        }
        public stopAction(): void {
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
        width: 360px;
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

    .cardWrapper{
        width:150px;
        height:150px;
        position:relative;
        /*background-color:#333;*/
        float:left;
        margin-right:10px;
        cursor:pointer;
        -webkit-font-smoothing:antialiased;
    }

    .cardFace{
        position:absolute;
        width:150px;
        height:150px;
        overflow:hidden;
    }

    .front{
        background-color:#333;
    }

    .back{
        background-color:#333;
    }



    .cardFace h1{
        margin:0px;
        font-size:18px;
        padding:10px 0px 10px 10px;
        border-bottom:solid 6px #aaa;
        border-top:solid 6px #aaa;
        background-color:black;
        color:white;
    }


    .cardFace.back h1{
        border-color:#91e600;
    }

    .moreInfo{
        padding:10px;
        color:white;
        line-height:24px;
    }

</style>
