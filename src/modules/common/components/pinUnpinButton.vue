<template>
    <v-btn flat color="dark" class="ma-0">
        <i :class="[isPinned ? 'ex-unpin-icon mr-2' :  'ex-pin-icon mr-2']"></i>
        <span v-if="!isPinned">{{ $locale.general.social.pin }}</span>
        <span v-else>{{ $locale.general.social.unPin }}</span>
    </v-btn>
</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';

    @Component
    export default class PinUnpinButton extends BaseComponent {
        @Prop() public isPinned?: boolean;
    }
</script>

<style scoped lang="scss">


</style>