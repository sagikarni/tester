<template>
    <swiper :options="swiperOption" ref="swiper">
        <swiper-slide>
            <div class="swiper-slide">Slide 1</div>
        </swiper-slide>
        <swiper-slide>
            <div class="swiper-slide">Slide 2</div>
        </swiper-slide>
        <swiper-slide>
            <div class="swiper-slide">Slide 3</div>
        </swiper-slide>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev">
           </div>
        <div class="swiper-button-next swiper-button-white" slot="button-next">
          </div>
    </swiper>
</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import TimelineMax from 'gsap';

    @Component
    export default class SideNavigantions extends BaseComponent {

        public swiperOption: any;
        public dialogSlideShow: boolean = false;
        constructor() {
            super();

            this.swiperOption = {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
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
                    click: () => {
                        this.hiddenAfterClick();
                    },
                },
            };
        }
        public created() {
            this.hidden();
        }
        public hidden(): void {
            setTimeout(() => {
                (TimelineMax as any).to('.swiper-button-white', 1, {opacity : 0 });
            } , 3000);
        }
        public hiddenAfterClick(): void {
            (TimelineMax as any).to('.swiper-button-white', 0.5, {opacity : 0 });
        }
        public closeModal() {
            return true;
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
    .swiper-button-prev{
        height: 100%;
        top: 0;
        left: 0;
        width: 100px;
        opacity: 0.5;
        margin-top: 0;
        background-color: rgba(33, 33, 33, .86);
        background-size: 60px;
    }
    .swiper-button-next{
        height: 100%;
        top: 0;
        right: 0;
        width: 100px;
        opacity: 0.5;
        margin-top: 0;
        background-color: rgba(33, 33, 33, .86);
        background-size: 60px;
    }

</style>
