<template>
    <v-btn @click="slideClicked" >
       This is where photoes needs to be embedded
    </v-btn>
</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';

    @Component
    export default class PremiumCollectionSlide extends BaseComponent {
        @Prop() public parameter?: any;

        public slideClicked() {
            alert(this.parameter.media.photos[0]);
            alert(this.parameter.layout);
        }
    }
</script>

<style scoped lang="scss">


</style>