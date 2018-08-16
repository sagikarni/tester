<template>
    <div>
        <div v-if="isSinglePhotoSlide" class="full-height table what_in_picture">
            <div class="cell">
                <div class="cell-content">
                    <slot></slot>
                    <div class="witp-questions" @click="openModalQuestions">
                        <span>{{switchQuestions}}</span>
                    </div>
                </div>
            </div>
            <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent class="Witp-modal">
                    <div class="dialog_wrappers first_dialog_wrappers">
                        <div class="cardWrapper">
                            <div class="card" @click="openQuestionCard($event)">
                                <div class="cardFace front">
                                    <v-icon class="iQuestion">fas fa-question</v-icon>
                                    <v-icon class="iDone">done</v-icon>
                                </div>
                                <div class="cardFace back">
                                    <div class="card_back_in">
                                        <p>{{this.parameter.media.questions[0]}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cardWrapper">
                            <div class="card" @click="openQuestionCard($event)">
                                <div class="cardFace front">
                                    <v-icon class="iQuestion">fas fa-question</v-icon>
                                    <v-icon class="iDone">done</v-icon>
                                </div>
                                <div class="cardFace back">
                                    <div class="card_back_in">
                                        <p>{{this.parameter.media.questions[1]}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dialog_wrappers">
                        <div class="cardWrapper">
                            <div class="card" @click="openQuestionCard($event)">
                                <div class="cardFace front">
                                    <v-icon class="iQuestion">fas fa-question</v-icon>
                                    <v-icon class="iDone">done</v-icon>
                                </div>
                                <div class="cardFace back">
                                    <div class="card_back_in">
                                        <p>{{this.parameter.media.questions[2]}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cardWrapper">
                            <div class="card" @click="openQuestionCard($event)">
                                <div class="cardFace front">
                                    <v-icon class="iQuestion">fas fa-question</v-icon>
                                    <v-icon class="iDone">done</v-icon>
                                </div>
                                <div class="cardFace back">
                                    <div class="card_back_in">
                                        <p>{{this.parameter.media.questions[3]}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="closeButtonDialog">
                        <v-btn @click="fllipAllOpenCards" class="btnDialogClose">
                            {{ $locale.general.close }}
                        </v-btn>
                    </div>

                </v-dialog>
            </v-layout>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {PremiumCollectionLayout, ImageType} from '@/modules/activities/store/types';
    import TimelineMax from 'gsap';

    const timeLineMax = TimelineMax as any;

    @Component
    export default class WhatInThePicture extends BaseComponent {
        @Prop() public parameter?: any;
        public switchQuestions: string = '';
        public dialog: boolean = false;

        get isSinglePhotoSlide(): boolean {
            return (this.parameter.layout as PremiumCollectionLayout) === PremiumCollectionLayout.SingleMedia;
        }


        public isValid(): boolean {
            return this.parameter && this.parameter.media && this.parameter.media.questions && this.parameter.media.questions.length > 0;
        }


        public created() {
            if (this.isValid()) {

                this.switchQuestions = this.$locale.activities.switchQuestions;
                timeLineMax.set("body", {className: "+=Witp-globalClass"});
            }
        }

        public fllipAllOpenCards() {
            timeLineMax.to(('.openCard'), 1.2, {
                className: "-=openCard",
                rotationY: 0,
                ease: Back.easeOut,
            });
            timeLineMax.set(".openCard .front .iQuestion", {display: 'none'});
            timeLineMax.set(".openCard .front .iDone", {display: 'block'});
            this.dialog = false;

        }

        public openModalQuestions() {
            this.dialog = true;
            timeLineMax.set(".cardWrapper", {perspective: 800});
            timeLineMax.set(".card", {transformStyle: "preserve-3d"});
            timeLineMax.set(".back", {rotationY: -180});
            timeLineMax.set([".back", ".front"], {backfaceVisibility: "hidden"});
        }

        public openQuestionCard(event: any) {
            if (event.currentTarget.classList.contains('openCard')) {
                timeLineMax.to(('.openCard'), 1.2, {
                    className: "-=openCard",
                    rotationY: 0,
                    ease: Back.easeOut,
                });
            } else {
                timeLineMax.to(('.openCard'), 1.2, {
                    className: "-=openCard",
                    rotationY: 0,
                    ease: Back.easeOut,
                });
                timeLineMax.to((event.currentTarget), 1.2, {
                    className: "+=openCard",
                    rotationY: 180,
                    ease: Back.easeOut,
                });
            }
            timeLineMax.set(".openCard .front .iQuestion", {display: 'none'});
            timeLineMax.set(".openCard .front .iDone", {display: 'block'});
        }

        public revertWitpModal(): void {
            timeLineMax.set(".front .iDone", {display: 'none'});
            timeLineMax.set(".front .iQuestion", {display: 'block'});
            timeLineMax.to(('.openCard'), 1.2, {className: "-=openCard", rotationY: 0, ease: Back.easeOut});
            this.dialog = false;
        }

    }
</script>

<style lang="scss">
    .object-fit_contain {
        object-fit: contain
    }

    .full-height {
        height: 100%;
        background: #F8F8F8;
    }

    .table {
        display: table;
        width: 100%;
        position: relative;
        background: transparent !important;
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

    .witp-questions {
        cursor: pointer;
        position: absolute;
        padding: 7px 55px 35px 35px;
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
    }

    .cardWrapper {
        width: 450px;
        height: 270px;
        float: left;
        margin: 0 20px 20px 0;
        cursor: pointer;
        -webkit-font-smoothing: antialiased;
    }

    .card_back_in {
        display: table-cell;
        vertical-align: middle;
    }

    .cardFace.back {
        display: table;
    }

    .cardFace {
        position: absolute;
        width: 450px;
        height: 270px;
        overflow: hidden;
        border: 1px solid white;
        border-radius: 4px;
        padding: 0 20px;
    }

    .front i {
        background-color: #000000;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -12px 0 0 -12px;
        color: white;
    }

    .back {
        background-color: #000;
        color: white;
    }

    .cardFace.back h1 {
        border-color: #91e600;
    }

    .moreInfo {
        padding: 10px;
        color: white;
        line-height: 24px;
    }

    .dialog {
        height: 100%;
        max-height: 100%;

    }

    .dialog_wrappers {
        justify-content: center;
        display: flex;
    }

    .back_what_in_picture {
        left: 0;
        top: 0;
        position: absolute;
    }

    .close_what_in_picture {
        z-index: 100000;
        right: 0px;
        top: 0;
        position: absolute;
        min-width: auto;
        height: auto;
        padding: 2px;
        border-radius: 50%;
        width: 28px;
    }

    .close_what_in_picturebtn .btn__content .icon {
        color: inherit;
    }

    .card_back_in p {
        font-size: 22px;
    }

    .first_dialog_wrappers {
        padding-top: 15px;
    }

    .closeButtonDialog {
        display: flex;
        justify-content: center;
        color: white;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.6);
        padding-top: 15px;
    }

    .btnDialogClose {
        background-color: black !important;
        color: white !important;
        border: 1px solid white !important;
        border-radius: 3px;

    }

    @media screen and (max-width: 1264px) {
        .close_what_in_picture {
            right: 10px;
        }

    }

    @media screen and (max-width: 960px) {
        .cardWrapper, .cardFace {
            width: 230px;
            height: 130px;
        }
        .close_button_what_in_picture {
            margin-top: 0;
        }
        .card_back_in p {
            font-size: 18px;
        }
        .cardWrapper {
            margin: 5px;
        }
        .close_what_in_picture {
            right: 5px;
            top: 2px;
        }
    }

    @media screen and (max-width: 600px) {
        .dialog_wrappers {
            flex-direction: column;
            padding: 0 30px;
        }
        .cardWrapper, .cardFace {
            width: 100%;
            margin: 0 10px 10px 0;
        }
        .close_what_in_picture {
            right: 8px;
        }

    }
</style>
