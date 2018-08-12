<template>
    <div>
        <whQuestionsPhotoSlide>
        <img style="width: 100%; background-color: white" class="object-fit_contain"
            :src="getImagePath(parameter.media.photos[0], getMediaTypes.Content)"/>   
         </whQuestionsPhotoSlide>    
    </div>
</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';


    @Component
    export default class WHQuestionsSlideBase extends BaseComponent {

    }

</script>