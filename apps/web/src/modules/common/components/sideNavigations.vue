<template>
    <div @contextmenu.prevent="openMenu" class="avtivities-background">
        <swiper :options="swiperOption" ref="swiper" class="avtivities-background">
            <swiper-slide>
                <div class="swiper-slide firstActivity">
                    <h2>{{activityName}}</h2>
                    <p> {{mediaCount}} $locale.general.slidesText</p>
                </div>
            </swiper-slide>
            <swiper-slide v-for="slide in slides" :key="slide.id">
                <component ref="slideComponent" class="imgColor" :is="dynamicComponent" :slideIndex="slide.id"
                           :parameter="slide"></component>
            </swiper-slide>

            <swiper-slide @click.native="redirectBack">
                <div class="swiper-slide"><h2>$locale.general.clickExit</h2></div>
            </swiper-slide>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </swiper>
        <zoom-toolbar
                v-if="isZoomActivity && zoomSlide"
                @revealPhoto="revealPhoto"
                @addShape="addShape"
                @enlargeShape="enlargeShape"
                @moveShapes="moveShapes">
        </zoom-toolbar>
        <v-menu
                v-model="showMenu"
                :position-x="x"
                :position-y="y"
                offset-y
                absolute
                class="showMenu"
        >
            <v-list>
                <v-list-tile @click="$router.go(-1)">
                    <v-list-tile-title>$locale.general.exitActivity</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Watch} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import PremiumCollectionSlide from '@/modules/activities/components/slideShowBased/premiumCollectionSlide.vue';
    import MeaningPhotoBasedSlide from '@/modules/activities/components/slideShowBased/meaningPhotoBasedSlide.vue';
    import MeaningVideoBasedSlide from '@/modules/activities/components/slideShowBased/meaningVideoBasedSlide.vue';
    import ZoomSlide from '@/modules/activities/components/slideShowBased/zoomSlide.vue';
    import PremiumCollectionPhotoBasedSlide from '@/modules/activities/components/slideShowBased/premiumCollectionPhotoBasedSlide.vue';
    import PremiumCollectionVideoBasedSlide from '@/modules/activities/components/slideShowBased/premiumCollectionVideoBasedSlide.vue';
    import WhatInThePicturePhotoSlide from '@/modules/activities/components/slideShowBased/whatInThePicturePhotoSlide.vue';
    import WhatInThePictureVideoSlide from '@/modules/activities/components/slideShowBased/whatInThePictureVideoSlide.vue';
    import ZoomToolbar from '@/modules/activities/components/slideShowBased/zoomToolbar.vue';
    import WHQuestionsPhotoSlide from '@/modules/activities/components/slideShowBased/whQuestionsPhotoSlide.vue';
    import WHQuestionsVideoSlide from '@/modules/activities/components/slideShowBased/whQuestionsVideoSlide.vue';
    import SoundPhotoSelectionSlide from '@/modules/activities/components/slideShowBased/soundPhotoSelectionSlide.vue';

    import TimelineMax from 'gsap';


    const timeLineMax = TimelineMax as any;
    import {ActivityType, MediaType} from '@/modules/activities/store/types';

    @Component({
        components: {
            PremiumCollectionPhotoBasedSlide,
            PremiumCollectionVideoBasedSlide,
            MeaningPhotoBasedSlide,
            MeaningVideoBasedSlide,
            WhatInThePicturePhotoSlide,
            WhatInThePictureVideoSlide,
            ZoomSlide,
            ZoomToolbar,
            WHQuestionsPhotoSlide,
            WHQuestionsVideoSlide,
            SoundPhotoSelectionSlide,
        },
    })
    export default class SideNavigantions extends BaseComponent {
        @Prop() public activityName?: string;
        @Prop() public mediaCount?: number;
        @Prop() public slides?: any[];
        @Prop() public activityType?: number;
        @Prop() public mediaType?: number;

        public swiperOption: any;
        public dialogSlideShow: boolean = false;
        public zoomSlide: boolean = false;
        public showMenu?: boolean = false;
        public x?: number = 0;
        public y?: number = 0;
        public timeout: any;
        public lastTap = 0;
        public isBeginning: boolean = true;
        public isZoomActivity: boolean = false;

        constructor() {
            super();

            this.swiperOption = {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: false,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                on: {
                    doubleTap: () => {
                        this.checkDoubleTap();
                    },
                    touchMove: () => {
                        this.hideAllPanes();
                    },
                    touchStart: () => {
                        this.hideAllPanes();
                    },
                    click: () => {
                        const el: any = this.$refs.swiper;
                        const realIndex = el && el.swiper && el.swiper.realIndex;
                        this.pressButton(realIndex);
                        this.hideAllPanes();
                    },
                    slideChange: () => {
                        const el: any = this.$refs.swiper;
                        const realIndex = el && el.swiper && el.swiper.realIndex;
                        const previousIndex = el && el.swiper && el.swiper.previousIndex;
                        this.isBeginning = !!(el.swiper && el.swiper.isBeginning);
                        const slideStatus = !(el.swiper && (el.swiper.isBeginning || el.swiper.isEnd));
                        this.stopVideo(realIndex);
                        this.stopAudio(previousIndex);
                        this.revertWitpModal(realIndex);
                        this.checkZoomSlide(slideStatus, realIndex);
                        this.slideChanged(this.isBeginning);
                        this.clearBrightnessEffect();
                    },
                    beforeDestroy: () => {
                        timeLineMax.to('div.avtivities-background', 0, {opacity: 0});
                    },
                },
            };
        }

        get dynamicComponent() {
            switch (this.activityType) {
                case ActivityType.PremiumCollction:
                    if (this.mediaType === MediaType.Photo) {
                        return 'PremiumCollectionPhotoBasedSlide';
                    } else if (this.mediaType === MediaType.Video) {
                        return 'PremiumCollectionVideoBasedSlide';
                    }
                case ActivityType.Meaning:
                    if (this.mediaType === MediaType.Photo) {
                        return 'MeaningPhotoBasedSlide';
                    } else if (this.mediaType === MediaType.Video) {
                        return 'MeaningVideoBasedSlide';
                    }
                case ActivityType.WhatInThePicture:
                    if (this.mediaType === MediaType.Photo) {
                        return 'WhatInThePicturePhotoSlide';
                    } else if (this.mediaType === MediaType.Video) {
                        return 'WhatInThePictureVideoSlide';
                    }
                case ActivityType.Zoom:
                    if (this.mediaType === MediaType.Photo) {
                        this.isZoomActivity = true;
                        return 'ZoomSlide';
                    }
                case ActivityType.WHQuestions:
                    if (this.mediaType === MediaType.Photo) {
                        return 'WHQuestionsPhotoSlide';
                    } else if (this.mediaType === MediaType.Video) {
                        return "WHQuestionsVideoSlide";
                    }
                case ActivityType.PhotoSelectionBySound:
                    if (this.mediaType === MediaType.PhotoAndSound) {
                        return 'SoundPhotoSelectionSlide';
                    }
                default:
                    break;
            }
        }

        public clearBrightnessEffect() {
            timeLineMax.to('.fourCell', 0.2, {filter: 'brightness(1)', className: "-=clicked"});
        }

        public slideChanged(isBeginning: boolean) {
            this.$emit('isFirstSlide', isBeginning);
        }

        public redirectBack() {
            this.$router.go(-1);
        }

        public hideSidePanes(animationLength: number): void {
            timeLineMax.to('.swiper-button-white', animationLength, {opacity: 0.1});
        }

        public hideAllPanes(): void {
            this.hideSidePanes(0.2);
        }

        public checkDoubleTap(): void {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - this.lastTap;
            clearTimeout(this.timeout);
            if (tapLength < 500 && tapLength > 0) {
                // this.$emit('showTopPane');
            } else {
                this.timeout = setTimeout(() => {
                    clearTimeout(this.timeout);
                }, 500);
            }
            this.lastTap = currentTime;
        }

        public openMenu(e: any): void {
            this.x = e.clientX;
            this.y = e.clientY;
            this.$nextTick(() => {
                this.showMenu = true;
            });
        }


        public pressButton(realIndex: number): void {
            const el: any = this.$refs.slideComponent;
            if (el[realIndex - 1]) {
                if (el[realIndex - 1].$refs.videoPlayer) {
                    el[realIndex - 1].$refs.videoPlayer.pauseAction();
                }
            }
        }

        public stopVideo(realIndex: number): void {
            const el: any = this.$refs.slideComponent;
            if (el[realIndex - 1]) {
                if (el[realIndex - 1].$refs.videoPlayer) {
                    el[realIndex - 1].$refs.videoPlayer.stopAction();
                }
            }
        }

        public stopAudio(index: number): void {
            const el: any = this.$refs.slideComponent;
            if (el[index - 1]) {
                if (el[index - 1]) {
                    el[index - 1].stopSound();
                }
            }
        }

        public revertWitpModal(realIndex: number): void {
            const el: any = this.$refs.slideComponent;
            if (el[realIndex - 1]) {
                if (el[realIndex - 1].$refs.videoPlayer) {
                    el[realIndex - 1].$refs.videoPlayer.revertWitpModal();
                }
            }
        }

        public checkZoomSlide(slideStatus: boolean, index: number): void {
            this.zoomSlide = false;
            setTimeout(() => {
                this.zoomSlide = slideStatus;
            }, 1500);
            if (slideStatus) {
                const el: any = this.$refs.slideComponent;
                if (el[index - 1]) {
                    el[index - 1].showFirstShape();
                }
            }
        }

        public moveShapes() {
            const el: any = this.$refs.swiper;
            const realIndex = el && el.swiper && el.swiper.realIndex;
            (this.$refs.slideComponent as any)[realIndex - 1].rePosition();
        }

        public addShape() {
            const el: any = this.$refs.swiper;
            const realIndex = el && el.swiper && el.swiper.realIndex;
            (this.$refs.slideComponent as any)[realIndex - 1].addData();
        }

        public enlargeShape() {
            const el: any = this.$refs.swiper;
            const realIndex = el && el.swiper && el.swiper.realIndex;
            (this.$refs.slideComponent as any)[realIndex - 1].enlarge();
        }

        public revealPhoto() {
            const el: any = this.$refs.swiper;
            const realIndex = el && el.swiper && el.swiper.realIndex;
            (this.$refs.slideComponent as any)[realIndex - 1].reveal();
        }
    }
</script>

<style scoped lang="scss">
    .swiper-container {
        height: 100vh;
        background-color: #000000;
        color: #fff;
    }

    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .swiper-button-white {
        height: 100%;
        top: 0px;
        width: 100px;
        opacity: 0.5;
        margin-top: 0;
        background-color: rgba(204, 204, 255, .2);
        background-size: 60px;
    }

    .swiper-button-prev {
        left: 0;
        transition: all 0.5s ease;
        &:hover {
            cursor: pointer;
        }

    }

    .swiper-button-next {
        right: 0;
        transition: all 0.5s ease;
        &:hover {
            cursor: pointer;

        }

    }

    .firstActivity {
        flex-direction: column;
        h2 {
            font-size: 24px;
            margin-bottom: 10px;
        }
    }

    .showMenu {
        display: none !important;
    }

    @media only screen and (max-width: 960px) {
        .swiper-button-white {
            width: 50px;
            background-size: 30px;
        }
    }

</style>
