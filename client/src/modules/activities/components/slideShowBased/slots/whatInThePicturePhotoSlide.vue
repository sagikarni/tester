<template>

    <what-in-the-picture :parameter="parameter">
        <img style="width: 100%; background-color: white" class="object-fit_contain"
             :src="getImagePath(parameter.media.photos[0], getMediaTypes.Content)"/>
    </what-in-the-picture>

</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {PremiumCollectionLayout, ImageType} from '@/modules/activities/store/types';
    import TimelineMax from 'gsap';
    import WhatInThePicture from '@/modules/activities/components/slideShowBased/slots/whatInThePicture.vue';
    import WhatInThePictureSlideBase from '@/modules/activities/components/slideShowBased/slots/whatInThePictureSlideBase.vue';


    const timeLineMax = TimelineMax as any;

    @Component({
        components: {
            WhatInThePicture,
        },
    })
    export default class WhatInThePicturePhotoSlide extends WhatInThePictureSlideBase {
        @Prop() public parameter?: any;
    }
</script>

<style lang="scss">
    .object-fit_contain {
        object-fit: contain
    }

    .full-height {
        height: 100%;
        background: #F8F8F8;
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

    .witp-questions {
        cursor: pointer;
        position: absolute;
        padding: 7px 55px 35px 35px;
        color: white;
        bottom: 50px;
        left: 0;
        box-sizing: border-box;
        font-size: 18px;
        background: rgba(0, 0, 0, 0.6);
        width: 360px;
        height: 50px;
        span {
            font-size: 24px;
            min-width: 150px;
        }
    }

    .cardWrapper {
        width: 450px;
        height: 270px;
        float: left;
        margin: 0 20px 20px 0;
        cursor: pointer;
        -webkit-font-smoothing: antialiased;
    }

    .card_back_in {
        display: table-cell;
        vertical-align: middle;
    }

    .cardFace.back {
        display: table;
    }

    .cardFace {
        position: absolute;
        width: 450px;
        height: 270px;
        overflow: hidden;
        border: 1px solid white;
        border-radius: 4px;
        padding: 0 20px;
    }

    .front i {
        background-color: #000000;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -12px 0 0 -12px;
        color: white;
    }

    .back {
        background-color: #000;
        color: white;
    }

    .cardFace.back h1 {
        border-color: #91e600;
    }

    .moreInfo {
        padding: 10px;
        color: white;
        line-height: 24px;
    }

    .dialog {
        height: 100%;
        max-height: 100%;

    }

    .dialog_wrappers {
        justify-content: center;
        display: flex;
    }

    .back_what_in_picture {
        left: 0;
        top: 0;
        position: absolute;
    }

    .close_what_in_picture {
        z-index: 100000;
        right: 0px;
        top: 0;
        position: absolute;
        min-width: auto;
        height: auto;
        padding: 2px;
        border-radius: 50%;
        width: 28px;
    }

    .close_what_in_picturebtn .btn__content .icon {
        color: inherit;
    }

    .card_back_in p {
        font-size: 22px;
    }

    .first_dialog_wrappers {
        padding-top: 15px;
    }

    .closeButtonDialog {
        display: flex;
        justify-content: center;
        color: white;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.6);
        padding-top: 15px;
    }

    .btnDialogClose {
        background-color: black !important;
        color: white !important;
        border: 1px solid white !important;
        border-radius: 3px;

    }

    @media screen and (max-width: 1264px) {
        .close_what_in_picture {
            right: 10px;
        }

    }

    @media screen and (max-width: 960px) {
        .cardWrapper, .cardFace {
            width: 230px;
            height: 130px;
        }
        .close_button_what_in_picture {
            margin-top: 0;
        }
        .card_back_in p {
            font-size: 18px;
        }
        .cardWrapper {
            margin: 5px;
        }
        .close_what_in_picture {
            right: 5px;
            top: 2px;
        }
    }

    @media screen and (max-width: 600px) {
        .dialog_wrappers {
            flex-direction: column;
            padding: 0 30px;
        }
        .cardWrapper, .cardFace {
            width: 100%;
            margin: 0 10px 10px 0;
        }
        .close_what_in_picture {
            right: 8px;
        }

    }
</style>