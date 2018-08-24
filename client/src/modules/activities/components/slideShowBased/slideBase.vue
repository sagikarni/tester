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

        public stopSound() {
            // do nothing
        }



    }
</script>

<style lang="scss">
    .theme--light.v-card {
        background-color: black !important;
        color: rgba(0,0,0,.87);
    }
    .v-card__title {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        padding: 16px;
        flex-direction: column;
        text-align: center;
        align-items: center;
    }

</style>