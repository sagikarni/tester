<template>
    <swiper :options="swiperOption" ref="swiper" class="avtivities-background">

        <swiper-slide v-for="slide in slides" :key="slide.id">
            <component ref="slideComponent" class="imgColor" :is="dynamicComponent" :parameter="slide"></component>
        </swiper-slide>

        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </swiper>
</template>

<script lang="ts">
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import TimelineMax from 'gsap';
    import Categorization from '@/modules/activities/components/otherActivities/categorization.vue';

    import {ActivityType, MediaType} from '@/modules/activities/store/types';
    @Component({
        components: {
            Categorization,
        },
    })
    export default class CategorizationView extends BaseComponent {

        @Prop() public slides?: any[];
        @Prop() public activityType?: number;
        @Prop() public mediaType?: number;
        public swiperOption: any;
        public dialogSlideShow: boolean = false;

        public showMenu?: boolean = false;

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
            };
        }

        get dynamicComponent() {
            switch (this.activityType) {
                case ActivityType.Categorization:
                    return 'Categorization';
            }
        }

    }
</script>

<style scoped lang="scss">

    .swiper-container {
        height: 30vh;
        width: 30vh;
    }
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

