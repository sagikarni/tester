<template>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {MediaType} from '@/modules/activities/store/types';
    import {State} from 'vuex-class';
    import {ImageType} from '@/modules/store/typeEnums';

    @Component
    export default class BaseComponent extends Vue {
        public $locale: any;
        public $fullscreen: any;
        public $toast: any;
        public $notificationSystem: any;
        public explicitExitFromFullScreen: boolean = false;
        @State(state => state.isHDMedia) public isHDMedia?: boolean;
        @State(state => state.isFullScreen) public isFullScreen?: boolean;
        @State(state => (state.activities.activity && state.activities.activity.details && state.activities.activity.details.baseFolder)) public baseFolder?: string;

        constructor() {
            super();
            this.setNotificationSystemSettings();
        }

        public getImagePath(mediaName: string, imageType: number = ImageType.None, mediaType: number = MediaType.Photo): string {
            const pathName = mediaName;

            if (this.isHDMedia && pathName) {
                if (mediaType === MediaType.Photo) {
                    pathName.replace(/.jpg$/gi, "_hd.jpg");
                } else if (mediaType === MediaType.Video) {
                    pathName.replace(/.mp4$/gi, "_hd.mp4");
                }
            }

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
                if (this.hasFullScreenSupport() && this.isFullScreen) {
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

        get getImageTypes(): any {
            return ImageType;
        }

        get getMediaTypes(): any {
            return MediaType;
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
