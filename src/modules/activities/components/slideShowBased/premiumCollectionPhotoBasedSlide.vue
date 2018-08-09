<template>
<div>
 <div v-if="isSinglePhotoSlide" class="full-height table">
                <div class="cell">
                    <img style="height: 100%; width: 100%; background-color: white"  class="object-fit_contain" :src="getImagePath(parameter.media.photos[0], getMediaTypes.Content )">
                </div>
 </div>

    <div v-else-if="isTwoVerticalPhotoes" class="full-height table">
        <div class="row">
            <div class="cell">
                <img class="object-fit_contain twoCell" :src="getImagePath(parameter.media.photos[0], getMediaTypes.Content )">
            </div>
        </div>
        <div class="row">
            <div class=" cell">
                <img class="object-fit_contain twoCell" :src="getImagePath(parameter.media.photos[1], getMediaTypes.Content )">
            </div>

            </div>
        </div>


        <div v-else-if="isFourPhotoesSlide" class="full-height table">

        <div class="row">
            <div class="cell">
                <img class="object-fit_contain fourCell" @click="changeBrightness($event)" :src="getImagePath(parameter.media.photos[0], getMediaTypes.Content )">

                <img class="object-fit_contain fourCell" @click="changeBrightness($event)" :src="getImagePath(parameter.media.photos[1], getMediaTypes.Content )">
            </div>
        </div>
        <div class="row">
            <div class=" cell">
                <img class="object-fit_contain fourCell" @click="changeBrightness($event)" :src="getImagePath(parameter.media.photos[2], getMediaTypes.Content )">
                <img class="object-fit_contain fourCell" @click="changeBrightness($event)" :src="getImagePath(parameter.media.photos[3], getMediaTypes.Content )">
            </div>

            </div>

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
    export default class PremiumCollectionPhotoBasedSlide extends BaseComponent {
        @Prop() public parameter?: any;

        get isSinglePhotoSlide(): boolean {
            return (this.parameter.layout as PremiumCollectionLayout) === PremiumCollectionLayout.SingleMedia;
        }

        get getMediaTypes(): any {
            return ImageType;
        }

        get isTwoVerticalPhotoes(): boolean {
            return (this.parameter.layout as PremiumCollectionLayout) === PremiumCollectionLayout.TwoMediasVertical;
        }

        get isFourPhotoesSlide(): boolean {
            return (this.parameter.layout as PremiumCollectionLayout) === PremiumCollectionLayout.FourMedias;
        }

        public changeBrightness(event: any) {
            if (event.target.classList.contains("clicked")) {
                timeLineMax.to('.fourCell', 0.2, {filter: 'brightness(1)', className: "-=clicked"});
            } else {
                timeLineMax.to('.fourCell', 0.2, {filter: 'brightness(0.5)', className: "-=clicked"});
                timeLineMax.to(event.target, 0.2, {filter: 'brightness(1)', className: "+=clicked"});

            }
        }

        public pauseAction(): void {
            // do nothing
        }

        public stopAction(): void {
            // do nothing
        }

        public revertWitpModal(): void {
            // do nothing
        }

        public showFirstShape() {
            // do nothing
        }

    }
</script>

<style scoped lang="scss">
    .object-fit_contain {
        object-fit: contain
    }

    .full-height {
        height: 100%;
        background: #F8F8F8;
    }

    .full-height.two {
        background: #ACACAC;
    }

    .full-height.three {
        background: #5E5E5E;
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
    }

    .row {
        display: table-row;
        width: auto;
    }

    .fourCell {
        background-color: white;
        width: calc(50% - 60px);
        padding: 5px 5px 0px 5px;
        box-sizing: border-box;
<<<<<<< HEAD
        -webkit-filter: brightness(0.80);
        filter: brightness(0.80);
=======
        -webkit-filter: brightness(1);
        filter: brightness(1);
>>>>>>> e6a91dee64328cf1ad9104e5d988f606348f61eb
    }

    .twoCell {
        background-color: white;
        width: calc(100% - 40px);
        margin: 5px 5px
    }

    /*.brightness {*/
    /*-webkit-filter: brightness(1);*/
    /*filter: brightness(1);*/
    /*}*/

</style>
