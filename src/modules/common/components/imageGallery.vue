<template>
    <v-container grid-list-md class="pa-0">
        <v-layout v-bind="addColumnProp">
            <v-flex sm6 md4 v-for="(thumbnail, index) in thumbnails" :key="index">
                <div class="img_cover">
                    <v-img  :src="getImagePath(thumbnail.thumbnailSrc, getMediaTypes.Thumbnail)"
                            :alt="thumbnail.title" width="100%" height="100%" style="object-fit: cover" :class="{'active-item': thumbnail.active, 'inactive-item': !thumbnail.active}"
                            @click="showSlideImages(thumbnail)"> </v-img>
                <p class="img_content" v-if="!thumbnail.active">{{ $locale.activities.notIncluded.text }} {{ sessionDescription }} {{ $locale.activities.notIncluded.session }}</p>
                </div>
            </v-flex>

            <div row justify-center v-if="dialogSlideShow">
                <v-toolbar class="close_button">
                    <v-btn icon dark @click.native="dialogSlideShow = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-dialog v-model="dialogSlideShow" max-width="85%">
                    <v-card>
                        <slide-show @click.native="dialogSlideShow = false" :images="slideImages"
                                    :selectedImgId="selectedImgId"></slide-show>
                    </v-card>
                </v-dialog>
            </div>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import { ImageInfo, Image } from "@/modules/store/typeClasses";
    import { ImageType } from '@/modules/activities/store/types';
    import SlideShow from '@/modules/common/components/slideShow.vue';
    import TimelineMax from 'gsap';

    @Component({
        components: {
            SlideShow,
        },
    })
    export default class ImageGallery extends BaseComponent {

        public thumbnails?: object[] = [];
        public slideImages?: object[] = [];
        public dialogSlideShow: boolean = false;
        public selectedImgId: number = 0;

        @Prop() public imageGalleryInfo?: ImageInfo;
        @Prop() public filterId?: number;
        @Prop() public sessionBtnDescription?: string;

        get addColumnProp() {
            const addColumnProp = {column: false, wrap: true};
            if (this.$vuetify.breakpoint.xsOnly) {
                addColumnProp.column = true;
                addColumnProp.wrap = false;
            }
            return addColumnProp;
        }

        get sessionDescription() {
            if (this.sessionBtnDescription) {
                return this.sessionBtnDescription.toLocaleLowerCase();
            }
        }
        get getMediaTypes(): any {
            return ImageType;
        }
        @Watch('imageGalleryInfo')
        public onPropertyChanged(value: any, oldValue: any) {
            this.chooseGalleryThumbnails(value, this.filterId);
        }

        @Watch('filterId')
        public onPropertyChanged2(value: any, oldValue: any) {
            this.chooseGalleryThumbnails(this.imageGalleryInfo, value);
        }

        public chooseGalleryThumbnails(galleryInfo: any, filterId: any) {
            let imageItem: any;
            if (galleryInfo && galleryInfo.thumbnails) {
                const thumbnailItems: object[] = [];
                const slideImages: object[] = [];
                galleryInfo.thumbnails.forEach((item: Image) => {
                    if (filterId && item.filterInfo) {
                        if (item.filterInfo.includes(filterId)) {
                            imageItem = {
                                thumbnailSrc: item.thumbnailSrc,
                                title: item.title,
                                active: true,
                                id: item.id,
                            };
                            slideImages.push({id: item.id, title: item.title, imgSrc: item.imgSrc});
                        } else {
                            imageItem = {thumbnailSrc: item.thumbnailSrc, title: item.title, active: false};
                        }
                    } else {
                        imageItem = {thumbnailSrc: item.thumbnailSrc, title: item.title, active: true, id: item.id};
                        slideImages.push({id: item.id, title: item.title, imgSrc: item.imgSrc});
                    }
                    thumbnailItems.push(imageItem);

                });
                this.thumbnails = thumbnailItems;
                this.slideImages = slideImages;

            }
            setTimeout(() => {
                (TimelineMax as any).to('.active-item', 1.5, {filter: '', opacity: 1});
                (TimelineMax as any).to('.inactive-item', 1.5, {filter: 'blur(2px) grayscale(100%)', opacity: 0.3});
            }, 0);
        }

        public showSlideImages(item: any) {
            if (item.active) {
                this.dialogSlideShow = true;
                this.selectedImgId = item.id;
            }
        }

        public created() {
            this.chooseGalleryThumbnails(this.imageGalleryInfo, this.filterId);
        }
    }
</script>
<style scoped>
    .dialog card {
        min-height: 90vh;
        box-shadow: none !important;
        background: none !important;
    }

    .swiper-container {
        height: 75vh;
    }

    .theme--light card {
        background-color: transparent !important;
        color: rgba(0, 0, 0, .87);
        box-shadow: none !important;
    }

    .swiper-slide img {
        width: 100%;
    }

    .close_button {
        position: fixed;
        top: 0;
        right: 8px;
        width: 50px;
        background: none !important;
        box-shadow: none !important;
        z-index: 1000;
    }

    .close_button div {
        background: none !important;
    }

    .img_cover {
        position: relative;
    }

    .img_cover:hover {
        cursor: pointer;
    }

    .img_content {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        text-align: center;
        padding: 0 10px;
    }
</style>
