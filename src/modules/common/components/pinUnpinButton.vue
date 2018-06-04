<template>
    <v-btn :loading="loading"
           :disabled="loading"
           flat color="dark"
           class="ma-0">
        <i :class="[isPinned ? 'ex-unpin-icon mr-2' :  'ex-pin-icon mr-2']"></i>
        <span v-if="!isPinned">{{ $locale.general.social.pin }}</span>
        <span v-else>{{ $locale.general.social.unPin }}</span>
    </v-btn>
</template>

<script lang="ts">
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';

    @Component
    export default class PinUnpinButton extends BaseComponent {
        @Prop() public isPinned?: boolean;
        @Prop() public loading?: boolean;

        constructor() {
            super();
        }

    }
</script>

<style scoped lang="scss">
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
