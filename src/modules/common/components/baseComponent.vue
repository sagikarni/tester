<template>

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { State } from 'vuex-class';
    import { ImageType } from '@/modules/store/typeEnums';

    @Component
    export default class BaseComponent extends Vue {
        public $locale: any;
        public $fullscreen: any;
        public $toast: any;
        public $notificationSystem: any;
        public explicitExitFromFullScreen: boolean = false;
        @State(state => state.isHDMedia) public isHDMedia?: boolean;
        constructor() {
            super();
            this.setNotificationSystemSettings();
        }

        public selectPhotoMedia(url: string , imageType: ImageType = ImageType.None): string {
            if (this.isHDMedia && url) {
                return url.replace(/.jpg$/gi, "_hd.jpg");
            } else {
                return url;
            }
        }


        public getImagePath(imageName: string , basePath: string , imageType: ImageType = ImageType.None): string {
            // 1. add _hd if this.isHDMedia = true
            // 2. compine basePath , imageName and ImageType into a complete url
            // if ImageType = content the url should be 'basePath/content/imageName'
            // if ImageType = thumbnail the url should be 'basePath/thumbnails/imageName'
            // if ImageType = none the url should be 'basePath/imageName'
            return "";
        }


        public selectVideoMedia(url: string): string {
            if (this.isHDMedia && url) {
                return url.replace(/.mp4$/gi, "_hd.mp4");
            } else {
                return url;
            }
        }

        public hasFullScreenSupport(): boolean {
           return (document.body.requestFullscreen || (document.body as any).msRequestFullscreen || (document.body as any).mozRequestFullScreen || (document.body as any).webkitRequestFullscreen) != null;
        }

        public exitFullScreen() {
              try {
                this.explicitExitFromFullScreen = true;
                this.$fullscreen.exit();
            } catch {
                // do nothing
            }
        }

        public enterFullScreen() {
            try {
                this.explicitExitFromFullScreen = false;
                if (this.hasFullScreenSupport()) {
                    this.$fullscreen.enter(document.getElementById("app"), {
                        callback: (isFullScreen: boolean) => {
                            if (!isFullScreen && !this.explicitExitFromFullScreen) {
                                this.$router.go(-1);
                            }
                        },
                    });
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
