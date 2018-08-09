<template>

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import {ImageType, MediaType} from '@/modules/activities/store/types';
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
        @State(state => (state.activities.activity && state.activities.activity.details && state.activities.activity.details.baseFolder)) public baseFolder?: string;

        constructor() {
            super();
            this.setNotificationSystemSettings();
        }

<<<<<<< HEAD
        public selectPhotoMedia(url: string , imageType: ImageType = ImageType.None): string {
            if (this.isHDMedia && url) {
                return url.replace(/.jpg$/gi, "_hd.jpg");
            } else {
                return url;
=======
        public getImagePath(mediaName: string , imageType: number = ImageType.None, mediaType: number = MediaType.Photo): string {
            const pathName = mediaName;

            if (this.isHDMedia && pathName) {
                if (mediaType === MediaType.Photo) {
                    pathName.replace(/.jpg$/gi, "_hd.jpg");
                } else if (mediaType === MediaType.Video) {
                    pathName.replace(/.mp4$/gi, "_hd.mp4");
                }
>>>>>>> e6a91dee64328cf1ad9104e5d988f606348f61eb
            }

<<<<<<< HEAD

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
=======
            let type;

            switch (imageType) {
                case ImageType.Content:
                    type = '/content/';
                    break;
                case ImageType.Thumbnail:
                    type = '/thumbnails/';
                    break;
                case ImageType.PreLoad:
                    type = '/preload/';
                    break;
                default:
                    type = '/';
                    break;
>>>>>>> e6a91dee64328cf1ad9104e5d988f606348f61eb
            }

            return this.baseFolder + type + pathName;
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
