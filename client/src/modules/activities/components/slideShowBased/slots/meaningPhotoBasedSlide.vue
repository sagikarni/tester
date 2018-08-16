<template>
    <meaning-bar :parameter="parameter" :phrase='phrase' :phraseWord="phraseWord">
        <img style="width: 100%; background-color: white" class="object-fit_contain"
             :src="getImagePath(parameter.media.photos[0], getMediaTypes.Content)"/>
    </meaning-bar>

</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {PremiumCollectionLayout, ImageType} from '@/modules/activities/store/types';
    import TimelineMax from 'gsap';
    import MeaningBar from '@/modules/activities/components/slideShowBased/slots/meaningBar.vue';
    import MeaningSlideBase from '@/modules/activities/components/slideShowBased/slots/meaningSlideBase.vue';

    @Component({
        components: {
            MeaningBar,
        },
    })
    export default class MeaningPhotoBasedSlide extends MeaningSlideBase {
        @Prop() public parameter?: any;

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
        .cell-content {
            position: relative;
            max-height: 100vh !important;
        }
    }

    .phrases {
        cursor: pointer;
        position: absolute;
        padding: 7px 55px 35px 35px;
        color: white;
        bottom: 50px;
        left: 0;
        box-sizing: border-box;
        font-size: 18px;
        background: rgba(0, 0, 0, 0.6);
        width: 260px;
        height: 50px;
        span {
            font-size: 24px;
            min-width: 150px;
        }
        .refresh_icon {
            position: absolute;
            right: 0;
            width: 40px;
            min-width: 55px;
            height: 100%;
            top: 0;
            display: block;
            background: #000000;
        }
        i {
            font-size: 32px;
            float: right;
            margin: 0 10px;
            margin: 8px 10px;
            transition: all 0.5s;
        }
    }

</style>
