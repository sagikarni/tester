<template>
<div>
 <div v-if="isSinglePhotoSlide" class="full-height table">
                <div class="cell">
                    <img style="height: 100%; width: 100%; background-color: white"  class="object-fit_contain" :src="parameter.media.photos[0]">
                </div>
 </div>

    <div v-else-if="isTwoVerticalPhotoes" class="full-height table">
        <div class="row">
            <div class="cell">
                <img class="object-fit_contain twoCell" :src="parameter.media.photos[0]">
            </div>
        </div>
        <div class="row">
            <div class=" cell">
                <img class="object-fit_contain twoCell" :src="parameter.media.photos[1]">
            </div>

        </div>
    </div>


    <div v-else-if="isFourPhotoesSlide" class="full-height table">

        <div class="row">
            <div class="cell">
                <img class="object-fit_contain fourCell" :src="parameter.media.photos[0]">

                <img class="object-fit_contain fourCell" :src="parameter.media.photos[1]">
            </div>
        </div>
        <div class="row">
            <div class=" cell">
                <img class="object-fit_contain fourCell" :src="parameter.media.photos[2]">
                <img class="object-fit_contain fourCell" :src="parameter.media.photos[3]">
            </div>

        </div>

    </div>

</div>

</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {PremiumCollectionLayout} from '@/modules/activities/store/types';

    @Component
    export default class PremiumCollectionPhotoBasedSlide extends BaseComponent {
        @Prop() public parameter?: any;

        get isSinglePhotoSlide(): boolean {
            return (this.parameter.layout as PremiumCollectionLayout) === PremiumCollectionLayout.SingleMedia;
        }
        get isTwoVerticalPhotoes(): boolean {
            return (this.parameter.layout as PremiumCollectionLayout) === PremiumCollectionLayout.TwoMediasVertical;
        }
        get isFourPhotoesSlide(): boolean {
            return (this.parameter.layout as PremiumCollectionLayout) === PremiumCollectionLayout.FourMedias;
        }
        public pauseAction(): void {
            // do nothing
        }
        public stopAction(): void {
            // do nothing
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
        background: transparent;
    }
    .cell {
        display: table-cell;
        vertical-align: middle;
        width: 100%;
        margin: 0 auto;
        height:100%;
        text-align: center;
    }
    .row{
        display:table-row;
        width:auto;
    }
    .fourCell{
        background-color: white;
        width: calc(50% - 60px);
        padding: 5px 5px 0px 5px;
        box-sizing: border-box;
    }
    .twoCell{
        background-color: white;
        width: calc(100% - 40px);
        margin: 5px 5px
    }

</style>
