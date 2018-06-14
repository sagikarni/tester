<template>

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class BaseComponent extends Vue {
        public $locale: any;
        public $fullscreen: any;
        public $toast: any;
        public $notificationSystem: any;

        constructor() {
            super();
            this.setNotificationSystemSettings();
        }

        public hasFullScreenSupport(): boolean {
           return (document.body.requestFullscreen || (document.body as any).msRequestFullscreen || (document.body as any).mozRequestFullScreen || (document.body as any).webkitRequestFullscreen) != null;
        }

        public exitFullScreen() {
             try {
                if (this.hasFullScreenSupport()) {
                    this.$fullscreen.exit();
                }
            } catch {
                // do nothing
            }
        }

        public enterFullScreen() {
            try {
                if (this.hasFullScreenSupport()) {
                    this.$fullscreen.enter();
                }
            } catch {
                // do nothing
            }
        }

        public setNotificationSystemSettings() {
            this.$notificationSystem = {
                options: {
                    show: {
                        theme: 'dark',
                        icon: 'icon-person',
                        position: 'topCenter',
                        progressBarColor: 'rgb(0, 255, 184)',
                    },
                    info: {
                        position: 'topCenter',
                    },
                    success: {
                        position: 'topCenter',
                    },
                    warning: {
                        position: 'topCenter',
                    },
                    error: {
                        position: 'topCenter',
                    },
                },
            };
        }
    }
</script>

<style scoped lang="scss">

</style>