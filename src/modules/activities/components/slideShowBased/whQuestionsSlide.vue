<template>
    <v-btn @click="slideClicked" >
       Click Me
    </v-btn>
</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';

    @Component
    export default class WHQuestionSlide extends BaseComponent {
        @Prop() public parameter?: any;

        public slideClicked() {
             alert(this.parameter.name);
        }
    }
</script>

<style scoped lang="scss">


</style>