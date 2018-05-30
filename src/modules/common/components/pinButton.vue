<template>
    <v-btn flat color="dark" class="ma-0">
        <i class="ex-pin-icon mr-2"></i>
        {{ $locale.general.social.pin }}
    </v-btn>
</template>

<script lang="ts">
    import { Component } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';

    @Component
    export default class PinButton extends BaseComponent {

    }
</script>

<style scoped lang="scss">


</style>