<template>

</template>

<script lang="ts">
    import { Component } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import device from 'current-device';

    @Component
    export default class OrientationUtil extends BaseComponent {

        public device?: any;
        public orientation?: number;

        constructor() {
            super();
            this.device = device.noConflict();

            this.device.onChangeOrientation((cb: string) => {
                // cb is a landscape or portrait
                this.checkOrientation(cb);
            });
            this.checkOrientation(this.device.orientation);
        }

        public getOrientation() {
            this.checkOrientation(this.device.orientation);
            return this.orientation;
        }

        private checkOrientation(orientation: string) {
            if (orientation === 'landscape') {
                this.orientation = 0;
            } else {
                this.orientation = 1;
            }
        }

    }
</script>

<style scoped lang="scss">


</style>
