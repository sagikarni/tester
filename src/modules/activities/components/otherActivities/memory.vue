<template>
    <div id="memoryRoot">
        <div ref="memoryContainer" id="memoryContainer">
            <v-btn color="white" class="close_rotation_issue" flat @click.native="$router.go(-1)">
                <v-icon>close</v-icon>
            </v-btn>
            <transition-group v-show="!showExit" :name="shuffleSpeed" tag="div" class="memoryInnerContainer">

                <div v-for="card in imgCards" :key="card.id" :data-id="card.imgID" :data-wrapper="card.id"
                     class="cardWrapper" :style="{ width: cardWidth + 'px', height: cardHeight + 'px' }">

                        <div v-touch="{left: () =>  touchSwipe(card.id), right: () =>  touchSwipe(card.id), up: () =>  touchSwipe(card.id), down: () =>  touchSwipe(card.id)}" class="card show" :data-id="card.imgID" :data-card="card.id"
                             style="width: 100%;height: 100%"
                             @click="openQuestionCard($event)">

                            <div class="cardFace front"
                                 :style="{ width: cardWidth + 'px', height: cardHeight + 'px' }">
                            </div>

                            <div class="cardFace back"
                                 :style="{ width: cardWidth + 'px', height: cardHeight + 'px' }">
                                <div class="card_back_in">
                                    <img class="cardShuffle" :src="getImagePath(card.src, getMediaTypes.Content)" alt="">
                                </div>
                            </div>

                        </div>

                </div>

            </transition-group>

            <div v-show="showExit" class="memory_exit" color="white" flat @click="$router.go(-1)">
                <h2>Click to exit</h2>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import { ImageType} from '@/modules/activities/store/types';
    import Vue from 'vue';
    import TimelineMax from 'gsap';

    const timeLineMax = TimelineMax as any;

    @Component
    export default class Memory extends BaseComponent {
        @Prop() public images?: any[];
        @Prop() public columnCount?: number;
        @Prop() public rowsCount?: number;
        @Prop() public aspectRatio?: number;
        @Prop() public memoryLayout?: number;
        @Prop() public isMobile?: boolean;
        public cards: any[] = [];
        public shuffleCount: number = 0;
        public shuffledDeck: boolean = false;
        public dialog: boolean = true;
        public shuffleSpeed: string = 'shuffleMedium';
        public timeout: any;
        public showExit: boolean = false;
        public cardHeight: number = 0;
        public cardWidth: number = 0;

        get imgCards() {
            return this.cards;
        }
        get getMediaTypes(): any {
            return ImageType;
        }

        public mounted() {
            this.initializeMemory();
        }

        public initializeMemory() {
            if (this.columnCount && this.rowsCount && this.aspectRatio) {
                const root = document.getElementById("app") as any;
                let availableHeight = root.offsetHeight;
                let availableWidth = root.offsetWidth;
                const memoryContainer: any = this.$refs.memoryContainer;

                // this implementation of setting height or width is good when rowsCount ==  columnCount
                // if they are not eual , we will need to change the code accordinally.
                const cardMargins = 11;
                const extraMargins = 1;
                const leftMargin = 10;
                const rightMargin = 10;
                const reduceHeight = 0.95;
                availableHeight = availableHeight - leftMargin;
                availableWidth = availableWidth - rightMargin;

                if (availableWidth / availableHeight > this.aspectRatio) {
                    // height is small in this case in porportion to the width
                    this.cardHeight = ((availableHeight / this.rowsCount) - cardMargins - extraMargins) * reduceHeight;
                    memoryContainer.style.width = (availableHeight * this.aspectRatio) + (cardMargins * this.columnCount) + "px";
                    this.cardWidth = this.cardHeight * this.aspectRatio;

                } else {
                    this.cardWidth = (availableWidth / this.columnCount) - cardMargins - extraMargins;
                    memoryContainer.style.height = (availableWidth / this.aspectRatio) + (cardMargins * this.rowsCount) + "px";
                    this.cardHeight = this.cardWidth / this.aspectRatio;
                }
                this.displayInitialDeck();

                this.$nextTick(() => {
                    this.openModalQuestions();
                    timeLineMax.set('#memoryRoot .card',
                        {
                            className: "+=openCard", rotationY: 180, ease: Back.easeOut, pointerEvents: 'none',
                            onComplete: () => {
                                setTimeout(() => {
                                    timeLineMax.staggerTo(('.openCard'), 1.5,
                                        {className: "-=openCard", rotationY: 0, ease: Back.easeOut}, 0.1);
                                    setTimeout(() => {
                                        this.shuffleDeck(false);
                                        setTimeout(() => {
                                            this.shuffleDeck(true);
                                        }, 1500);
                                    }, 3000);
                                }, 2500);
                            },
                        });
                });
            }
        }

        public displayInitialDeck() {
            let id = 1;
            this.cards = [];
            if (this.images && this.images.length > 0) {
                this.images.forEach((item, index) => {
                    let s = 0;
                    while (s < 2) {
                        const card = {
                            id,
                            imgID: index,
                            src: item,
                        };
                        this.cards.push(card);
                        id++;
                        s++;
                    }
                });
            }
            this.shuffledDeck = false;
            this.shuffleCount = 0;
            return this.cards;
        }

        public shuffleDeck(event: boolean) {
            let counter = this.cards.length;

            while (counter > 0) {
                const randomIndex = Math.floor(Math.random() * counter);

                counter--;

                const temp = this.cards[counter];
                Vue.set(this.cards, counter, this.cards[randomIndex]);
                Vue.set(this.cards, randomIndex, temp);
            }

            this.shuffledDeck = true;
            this.shuffleCount++;
            if (event) {
                timeLineMax.to('#memoryRoot .card', 1, {pointerEvents: 'auto'});
            }
        }

        public openModalQuestions() {

            timeLineMax.set(".cardWrapper", {perspective: 800});
            timeLineMax.set("#memoryRoot .card", {transformStyle: "preserve-3d"});
            timeLineMax.set(".back", {rotationY: -180});
            timeLineMax.set([".back", ".front"], {backfaceVisibility: "hidden"});
        }


        public touchSwipe(cardId: number) {
            if (cardId) {
                const el = document.querySelector(`[data-card='${cardId}']`);
                this.openQuestionCard(el);
            }
        }

        public openQuestionCard(event: any) {

            let el;
            if (event.type === 'click') {
                el = event.currentTarget;
            } else if (this.isMobile) {
                el = event;
            }

            clearTimeout(this.timeout);
            const tiles: any = this.$el.querySelectorAll('.openCard');

            if (el && !(!tiles || (tiles && tiles.length < 2))) {
                timeLineMax.to(('.openCard'), 1.2, {
                    className: "-=openCard",
                    rotationY: 0,
                    ease: Back.easeOut,
                });
            }

            if (el && !(el.classList.contains('openCard') && tiles.length === 2)) {
                timeLineMax.set((el), {className: "+=openCard"});
                const elemeWrap = this.$el.querySelectorAll('.openCard');
                timeLineMax.to((el), 1.2, {rotationY: 180, ease: Back.easeOut});
                setTimeout(() => {
                    this.win(elemeWrap);
                }, 200);
            }
        }

        public win(elemeWrap: any) {

            if (elemeWrap && elemeWrap.length === 2) {
                if (elemeWrap[0].getAttribute('data-id') === elemeWrap[1].getAttribute('data-id')) {
                    const tileId1 = elemeWrap[0].getAttribute('data-card');
                    const tileId2 = elemeWrap[1].getAttribute('data-card');
                    const tileWrapper1 = this.$el.querySelector(`[data-wrapper='${tileId1}']`);
                    const tileWrapper2 = this.$el.querySelector(`[data-wrapper='${tileId2}']`);

                    if (tileWrapper1 && tileWrapper2) {
                        const position1 = tileWrapper1.getBoundingClientRect();
                        const position2 = tileWrapper2.getBoundingClientRect();
                        const xCord = position1.left - position2.left;
                        const yCord = position1.top - position2.top;

                        timeLineMax.set(elemeWrap, {className: ""});
                        timeLineMax.to(tileWrapper2, 1.2, {
                            x: xCord, y: yCord, zIndex: '99999',
                            onComplete: () => {
                                timeLineMax.to([elemeWrap[0], elemeWrap[1]], 0.5,
                                    {
                                        autoAlpha: 0,
                                        className: "",
                                        cursor: 'auto',
                                        onComplete: () => {
                                            const showElem = this.$el.querySelectorAll('.show');
                                            if ((showElem && showElem.length === 0) || !showElem) {
                                                this.showExit = true;
                                            }
                                        },
                                    });
                            },
                        });
                    }
                } else {
                    this.timeout = setTimeout(() => {
                        timeLineMax.to(('.openCard'), 1.2, {className: "-=openCard", rotationY: 0, ease: Back.easeOut});
                        clearTimeout(this.timeout);
                    }, 2500);
                }
            }
        }

    }
</script>

<style scoped lang="scss">
    #memoryRoot {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #memoryContainer {
        text-align: center;
        width: 100%;
        height: 100%;
        line-height: 0px !important;

        .title-section {
            font-family: Roboto Slab, sans-serif;
            text-align: center;
            margin-top: 30px;
        }

        .title-section .title {
            font-weight: 300;
            font-size: 3rem;
        }

        .title-section .vue {
            height: 55px;
            position: relative;
            top: 10px;
        }

        .speed-buttons {
            padding-bottom: 30px;
            .button {
                height: 2.50em;
            }
        }

        .main-buttons {
            display: block;
            margin: 0 auto;
            padding-bottom: 30px;
            text-align: center;
            margin-bottom: 0 !important;
        }

        .count-section {
            position: absolute;
            top: 10px;
            right: 10px;
        }

        .memoryInnerContainer {
            margin: 10px 0px 0px 10px;
            height: 100%;
        }

        .cardShuffle {
            width: 100%;
            /*height: 100px;*/
            float: left;
            /*margin-right: 5px;*/
            /*margin-bottom: 5px;*/
            border-radius: 2px;
        }

        .card__suit {
            width: 100%;
            display: block;
        }

        .card__suit--top {
            text-align: left;
            padding-left: 5px;
        }

        .card__suit--bottom {
            position: absolute;
            bottom: 0px;
            text-align: left;
            transform: rotate(180deg);
            padding-left: 5px;
        }

        .card__number {
            width: 100%;
            position: absolute;
            top: 38%;
            text-align: center;
        }

        .twitter-section {
            position: absolute;
            bottom: 10px;
            right: 10px;

            .fa-twitter-square {
                color: #00d1b2;
                font-size: 30px;
            }
        }

        // Transitions
        .shuffleSlow-move {
            transition: transform 2s;
        }

        .shuffleMedium-move {
            transition: transform 1s;
        }

        .shuffleFast-move {
            transition: transform 0.5s;
        }

        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s;
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }

    }

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

    .cardWrapper {
        display: inline-block;
        margin: 0 10px 10px 0;
        border-radius: 20px !important;
        -webkit-font-smoothing: antialiased;
    }

    .cardFace {
        position: absolute;
        overflow: hidden;
        border-radius: 20px !important;
        background-color: #595959;
    }

    .card {
        cursor: pointer;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 20;
    }

    .card_back_in {
        display: table-cell;
        vertical-align: middle;
    }

    .cardFace.back {
        display: table;
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

    .memory_exit {
        z-index: 100000;
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        cursor: pointer;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        h2 {
            color: #ffffff;
        }

    }
</style>
