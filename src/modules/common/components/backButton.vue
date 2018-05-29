<template>
    <v-btn flat icon color="dark" class="ml-0" @click="$router.go(-1)" v-if="showButton">
        <i class="ex-back-arrow-icon"></i>
    </v-btn>
</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';

    @Component
    export default class BackButton extends BaseComponent {
        @Prop() public showButton?: boolean;
    }
</script>

<style scoped lang="scss">


</style>