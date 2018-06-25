<template>
    <swiper :options="swiperOption" ref="swiper">
        <swiper-slide v-for="image in images" :key="image.id">
            <div class="full-height table">
                <div class="cell">
                    <img style="height: 100%; width: 100%; background-color: black"  class="object-fit_contain" :src="image.imgSrc" :alt="image.title" @click.stop="closeModal">
                </div>
            </div>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" @click.stop="closeModal" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-black" @click.stop="closeModal" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-black" @click.stop="closeModal" slot="button-next"></div>
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
        public dialogSlideShow: boolean = false;
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
        public closeModal() {
            return true;
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
        height:100%;
        text-align: center;
    }
    .dialog:not(.dialog--fullscreen) {
        max-width: 95%;
    }
</style>
