<template>

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class BaseComponent extends Vue {
        public $locale: any;
        public $toast: any;
        public $notificationSystem: any;

        constructor() {
            super();
            this.setNotificationSystemSettings();
        }

        public setNotificationSystemSettings() {
            this.$notificationSystem = {
                options: {
                    show: {
                        theme: 'dark',
                        icon: 'icon-person',
                        position: 'bottomLeft',
                        progressBarColor: 'rgb(0, 255, 184)',
                    },
                    info: {
                        position: 'bottomLeft',
                    },
                    success: {
                        position: 'bottomLeft',
                    },
                    warning: {
                        position: 'bottomLeft',
                    },
                    error: {
                        position: 'bottomLeft',
                    },
                },
            };
        }
    }
</script>

<style scoped lang="scss">

</style>