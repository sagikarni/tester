<template>


</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {PremiumCollectionLayout} from '@/modules/activities/store/types';

    @Component
    export default class PremiumCollectionVideoBasedSlide extends BaseComponent {
        @Prop() public parameter?: any;


    }
</script>

<style scoped lang="scss">
   

</style>