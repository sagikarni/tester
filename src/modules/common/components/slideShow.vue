<template>
    <swiper :options="swiperOption" ref="swiper">
        <swiper-slide v-for="image in images" :key="image.id"><img :src="image.imgSrc" :alt="image.title"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';


    @Component
    export default class SlideShow extends BaseComponent {

        @Prop() public images?: object[];
        @Prop() public selectedImgId?: number;

        public swiperOption: any;

        constructor() {
            super();
            let selectedImgIndex = 0;
            if (this.images) {
                this.images.forEach( (img: any, index: number) => {
                    if (img.id === this.selectedImgId) {
                        selectedImgIndex = index;
                    }
                });
            }

            this.swiperOption = {
                initialSlide: selectedImgIndex, // Default slide is a selectedImgId slide
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
            };
        }

    }
</script>

<style scoped lang="scss">

    .swiper-slide{
        text-align: center;
    }
    .swiper-slide img{
        width: 100%;
    }

</style>