<template>

    <div id="memoryContainer">
        <v-btn color="white" class="close_rotation_issue" flat @click.native="$router.go(-1)">
            <v-icon>close</v-icon>
        </v-btn>
        <transition-group v-show="!showExit" :name="shuffleSpeed" tag="div" class="deck">
            <div v-for="card in imgCards" :key="card.id" :data-id="card.imgID" :data-wrapper="card.id"
                 class="cardWrapper">
                <div class="card show" :data-id="card.imgID" :data-card="card.id" @click="openQuestionCard($event)">
                    <div class="cardFace front">
                    </div>
                    <div class="cardFace back">
                        <div class="card_back_in">
                            <img class="cardShuffle" :src="card.src" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </transition-group>
        <div v-show="showExit" class="memory_exit" color="white" flat @click.native="$router.go(-1)">
            <h2>Click to exit</h2>
        </div>
    </div>
</template>


<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import Vue from 'vue';
    import TimelineMax from 'gsap';

    @Component
    export default class Memory extends BaseComponent {
        @Prop() public images: any[];
        @Prop() public columnCount: number;
        @Prop() public rowsCount: number;
        @Prop() public aspectRatio: number;
        @Prop() public memoryLayout: number;

        public cards: any[] = [];
        public shuffleCount: number = 0;
        public shuffledDeck: boolean = false;
        public dialog: boolean = true;
        public shuffleSpeed: string = 'shuffleMedium';
        public timeout: any;
        public showExit: boolean = false;

        get imgCards() {
            return this.cards;
        }

        public created() {

            const containerHeight = this.$vuetify.breakpoint.height;
            const containerWidth = this.$vuetify.breakpoint.width;

            this.displayInitialDeck();
            this.$nextTick(() => {

                this.openModalQuestions();

                (TimelineMax as any).set(('.card'), {
                    className: "+=openCard",
                    rotationY: 180,
                    ease: Back.easeOut,
                    onComplete: () => {
                        setTimeout(() => {
                            (TimelineMax as any).to(('.openCard'), 1.2,
                                {className: "-=openCard", rotationY: 0, ease: Back.easeOut});
                            setTimeout(() => {
                                this.shuffleDeck();
                                setTimeout(() => {
                                    this.shuffleDeck();
                                }, 3000);
                            }, 2500);
                        }, 1500);
                    },
                });
                // this implementation of setting height or width is good when rowsCount ==  columnCount
                // if they are not eual , we will need to change the code accordinally.
                let cardHeight = -1;
                let cardWidth = -1;
                if (containerWidth / containerHeight > this.aspectRatio) {
                    cardHeight = containerHeight / this.rowsCount;
                    cardWidth = cardHeight * this.aspectRatio;
                } else {
                    cardWidth = (containerWidth / this.columnCount) - 30;
                    cardHeight = cardWidth / this.aspectRatio;
                }

                (TimelineMax as any).set(['.cardWrapper', '.cardFace'], {width: cardWidth, height: cardHeight});

                // if imageHeight !=-1 set the images height (do not set width - it will autonmatically will be set)
                // if imageWidth !=-1 set the images width (do not set width - it will autonmatically will be set)

            });

        }

        public displayInitialDeck() {
                let id = 1;
                this.cards = [];

                if (this.images && this.images.length > 0) {
                    this.images.sort();
                    for (let s = 0; s < this.images.length; s++) {
                        for (let j = 0; j < 2; j++) {
                            const card = {
                                id,
                                imgID: s,
                                src: this.images[s],
                            };
                            this.cards.push(card);
                            id++;
                        }
                    }
                }

                this.shuffledDeck = false;
                this.shuffleCount = 0;
                return this.cards;
        }

        public shuffleDeck() {
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
        }

        public openModalQuestions() {
            (TimelineMax as any).set(".cardWrapper", {perspective: 800});
            (TimelineMax as any).set(".card", {transformStyle: "preserve-3d"});
            (TimelineMax as any).set(".back", {rotationY: -180});
            (TimelineMax as any).set([".back", ".front"], {backfaceVisibility: "hidden"});
        }

        public openQuestionCard(event: any) {
            const tiles: any = this.$el.querySelectorAll('.openCard');

            if (!tiles || (tiles && tiles.length < 2)) {
                (TimelineMax as any).to((event.currentTarget), 1.2, {
                    className: "+=openCard",
                    rotationY: 180,
                    ease: Back.easeOut,
                    onComplete: () => {
                        this.win();
                    },
                });
            } else if (event.currentTarget.classList.contains('openCard') && tiles.length === 2) {
                (TimelineMax as any).to(('.openCard'), 1.2,
                    {className: "-=openCard", rotationY: 0, ease: Back.easeOut});
            } else {
                (TimelineMax as any).to(('.openCard'), 1.2,
                    {className: "-=openCard", rotationY: 0, ease: Back.easeOut});
                (TimelineMax as any).to((event.currentTarget), 1.2, {
                    className: "+=openCard",
                    rotationY: 180,
                    ease: Back.easeOut,
                    onComplete: () => {
                        this.win();
                    },
                });
            }
        }

        public win() {
            const elemeWrap = this.$el.querySelectorAll('.openCard');
            clearTimeout(this.timeout);

            if (elemeWrap && elemeWrap.length === 2) {
                if (elemeWrap[0].getAttribute('data-id') === elemeWrap[1].getAttribute('data-id')) {
                    const tileId1 = elemeWrap[0].getAttribute('data-card');
                    const tileId2 = elemeWrap[1].getAttribute('data-card');

                    const tileWrapper1 = this.$el.querySelector(`[data-wrapper='${tileId1}'] `);
                    const tileWrapper2 = this.$el.querySelector(`[data-wrapper='${tileId2}'] `);

                    if (tileWrapper1 && tileWrapper2) {
                        const position1 = tileWrapper1.getBoundingClientRect();
                        const position2 = tileWrapper2.getBoundingClientRect();
                        const xCord = position1.left - position2.left;
                        const yCord = position1.top - position2.top;
                        (TimelineMax as any).to(tileWrapper2, 1.2, {
                            x: xCord, y: yCord,
                            onComplete: () => {
                                (TimelineMax as any).to([elemeWrap[0], elemeWrap[1]], 0.5,
                                    {
                                        autoAlpha: 0,
                                        className: "-=show",
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
                        (TimelineMax as any).to(('.openCard'), 1.2,
                            {className: "-=openCard", rotationY: 0, ease: Back.easeOut});
                        clearTimeout(this.timeout);
                    }, 2500);
                }
            }
        }

    }
</script>

<style scoped lang="scss">
    #memoryContainer {
        text-align: center;
        width: 100%;
        height: 100%;

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

        .deck {
            margin-top: 50px;
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
        width: 398px;
        height: 264px;
        display: inline-block;
        margin: 0 10px 10px 10px;
        border-radius: 20px !important;
        -webkit-font-smoothing: antialiased;
    }

    .cardFace {
        position: absolute;
        width: 398px;
        height: 264px;
        overflow: hidden;
        border-radius: 20px !important;
        background-color: #595959;
    }

    .card {
        cursor: pointer;
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
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        cursor: pointer;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        h2 {
            color: #ffffff;
        }

    }
</style>
