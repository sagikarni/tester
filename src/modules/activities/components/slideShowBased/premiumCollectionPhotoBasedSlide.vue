<template>
<div>
 <div v-if="isSinglePhotoSlide" class="full-height table">
                <div class="cell">
                    <img style="height: 100%; width: 100%; background-color: white"  class="object-fit_contain" :src="parameter.media.photos[0]">
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

</style>