<template>
    <div>
        <div class="full-height table">
            <div class="cell">
                <img style="height: 100%; width: 100%; background-color: white"  class="object-fit_contain" :src="selectPhotoMedia(parameter.media.photos[0])">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {PremiumCollectionLayout} from '@/modules/activities/store/types';

    @Component
    export default class ZoomSlide extends BaseComponent {
        @Prop() public parameter?: any;

        public pauseAction(): void {
            // do nothing
        }
        public stopAction(): void {
            // do nothing
        }
        public revertWitpModal(): void {
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
