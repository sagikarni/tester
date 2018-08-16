<template>

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {ImageType, MediaType} from '@/modules/activities/store/types';


    @Component
    export default class SlideBase extends BaseComponent {
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

</style>
