<template>

    <what-in-the-picture :parameter="parameter">
        <img style="width: 100%; background-color: white" class="object-fit_contain"
             :src="getImagePath(parameter.media.photos[0], getMediaTypes.Content)"/>
    </what-in-the-picture>

</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import TimelineMax from 'gsap';
    import WhatInThePicture from '@/modules/activities/components/slideShowBased/whatInThePicture.vue';
    import WhatInThePictureSlideBase from '@/modules/activities/components/slideShowBased/whatInThePictureSlideBase.vue';


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

</style>