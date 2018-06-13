<template>
    <div @contextmenu.prevent="openMenu">
        <swiper :options="swiperOption" ref="swiper">
            <swiper-slide>
                <div class="swiper-slide firstActivity">
                    <h2>{{activityName}}</h2>
                    <p> {{mediaCount}} {{$locale.general.slidesText}}</p>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper-slide">Slide 1</div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper-slide">Slide 2</div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper-slide">Slide 3</div>
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
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import TimelineMax from 'gsap';

    @Component
    export default class SideNavigantions extends BaseComponent {
        @Prop() public activityName?: string;
        @Prop() public mediaCount?: number;
        @Prop() public activityContent?: any;

        public swiperOption: any;
        public dialogSlideShow: boolean = false;

        public showMenu?: boolean = false;
        public x?: number = 0;
        public y?: number = 0;

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
                    touchMove: () => {
                        this.hiddenAfterClick();
                    },
                    touchStart: () => {
                        this.hiddenAfterClick();
                    },
                    click: () => {
                        this.hiddenAfterClick();
                    },
                },
            };
        }
        public created() {
            this.hidden();
        }

        public redirectBack() {
                this.$router.go(-1);
        }
        public hidden(): void {
            setTimeout(() => {
                (TimelineMax as any).to('.swiper-button-white', 1, {opacity : 0.1 });
            } , 3000);
        }

        public hiddenAfterClick(): void {
            this.$emit('hideTopPane');
            (TimelineMax as any).to('.swiper-button-white', 0.2, {opacity: 0.1});
        }

        public openMenu(e: any): void {
            this.x = e.clientX;
            this.y = e.clientY;
            this.$nextTick(() => {
                this.showMenu = true;
            });
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
            opacity: .86!important;
        }
        &:focus{
            opacity: 0.1!important;
        }
    }
    .swiper-button-next{
        right: 0;
        transition: all 0.5s ease;
        &:hover {
            cursor: pointer;
            opacity: .86!important;
        }
        &:focus{
            opacity: 0.1!important;
        }
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
