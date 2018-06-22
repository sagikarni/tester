<template>
    <div @contextmenu.prevent="openMenu" class="avtivities-background">
        <swiper :options="swiperOption" ref="swiper" class="avtivities-background">
            <swiper-slide>
                <div class="swiper-slide firstActivity">
                    <h2>{{activityName}}</h2>
                    <p> {{mediaCount}} {{$locale.general.slidesText}}</p>
                </div>
            </swiper-slide>
             <swiper-slide v-for="slide in slides" :key="slide.id">
                  <component ref="slideComponent" class="imgColor" :is="dynamicComponent" :parameter="slide"></component>
            </swiper-slide>

            <swiper-slide @click.native="redirectBack">
                <div class="swiper-slide"><h2>Click To Exit</h2></div>
            </swiper-slide>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </swiper>
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
                    <v-list-tile-title>Exit Activity</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import TimelineMax from 'gsap';
    import PremiumCollectionSlide from '@/modules/activities/components/slideShowBased/premiumCollectionSlide.vue';
    import MeaningPhotoBasedSlide from '@/modules/activities/components/slideShowBased/meaningPhotoBasedSlide.vue';
    import WHQuestionsSlide from '@/modules/activities/components/slideShowBased/whQuestionsSlide.vue';
    import PremiumCollectionPhotoBasedSlide from '@/modules/activities/components/slideShowBased/premiumCollectionPhotoBasedSlide.vue';
    import PremiumCollectionVideoBasedSlide from '@/modules/activities/components/slideShowBased/premiumCollectionVideoBasedSlide.vue';

    import {ActivityType, MediaType} from '@/modules/activities/store/types';
    @Component({
        components: {
            PremiumCollectionPhotoBasedSlide,
            PremiumCollectionVideoBasedSlide,
            MeaningPhotoBasedSlide,
            WHQuestionsSlide,
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

        public showMenu?: boolean = false;
        public x?: number = 0;
        public y?: number = 0;

        public timeout: any;
        public lastTap = 0;

        public isBeginning: boolean = true;

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
                        const realIndex = el &&  el.swiper && el.swiper.realIndex;
                        this.pressButton(realIndex);
                        this.hideAllPanes();
                    },
                    slideChange: () => {
                        const el: any = this.$refs.swiper;
                        const realIndex = el &&  el.swiper && el.swiper.realIndex;
                        this.stopVideo(realIndex);
                        this.isBeginning = !!(el.swiper && el.swiper.isBeginning);
                        this.slideChanged(this.isBeginning);
                    },
                    beforeDestroy: () => {
                        (TimelineMax as any).to('div.avtivities-background', 0 , {opacity : 0 });
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
                    }
                case ActivityType.WHQuestions:
                    return 'WHQuestionsSlide';
            }
        }


        public slideChanged(isBeginning: boolean) {
            this.$emit('isFirstSlide', isBeginning);
        }

        public redirectBack() {
                this.$router.go(-1);
        }
        public hideSidePanes(animationLength: number): void {
                (TimelineMax as any).to('.swiper-button-white', animationLength , {opacity : 0.1 });
        }

        public hideAllPanes(): void {
            // hide top pane
            this.$emit('hideTopPane');
            // hide side pane
            this.hideSidePanes(0.2);
        }

        public checkDoubleTap(): void {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - this.lastTap;
            clearTimeout(this.timeout);
            if (tapLength < 500 && tapLength > 0) {
                this.$emit('showTopPane');
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
                el[realIndex - 1].pauseAction();
            }
        }

        public stopVideo(realIndex: number): void {
            const el: any = this.$refs.slideComponent;
            if (el[realIndex - 1]) {
                el[realIndex - 1].stopAction();
            }
        }

    }
</script>

<style scoped lang="scss">
    .swiper-container{
        height: 100vh;
        background-color: #000000;
        color:#fff;
    }
    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .swiper-button-white{
        height: 100%;
        top: 48px;
        width: 100px;
        opacity: 0.5;
        margin-top: 0;
        background-color: rgba(204,204, 255, .2);
        background-size: 60px;
        background-position-y: calc(50% - 48px);
    }
    .swiper-button-prev{
        left: 0;
        transition: all 0.5s ease;
        &:hover {
            cursor: pointer;
            /*opacity: .86!important;*/
        }
        /*&:focus{*/
            /*opacity: 0.1!important;*/
        /*}*/
    }
    .swiper-button-next{
        right: 0;
        transition: all 0.5s ease;
        &:hover {
            cursor: pointer;
            /*opacity: .86!important;*/
        }
        /*&:focus{*/
            /*opacity: 0.1!important;*/
        /*}*/
    }
    .firstActivity{
        flex-direction: column;
        h2{
            font-size: 24px;
            margin-bottom: 10px;
        }
    }
    .showMenu{
        display: none!important;
    }
    @media only screen and (max-width: 960px) {
        .swiper-button-white{
            width: 50px;
            background-size: 30px;
        }
    }

</style>
