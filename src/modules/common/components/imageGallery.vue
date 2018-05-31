<template>
    <v-container grid-list-md class="pa-0">
        <v-layout v-bind="addColumnProp">
            <v-flex sm6 md4 v-for="(thumbnail, index) in thumbnails" :key="index">
                <img :src="thumbnail.thumbnailSrc" :alt="thumbnail.title" width="100%" height="100%" style="object-fit: cover" :class="{'active-item': thumbnail.active, 'inactive-item': !thumbnail.active}">
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
    import { ImageInfo, Image } from "@/modules/store/typeClasses";
    import TimelineMax from 'gsap';


    @Component
    export default class ImageGallery extends Vue {


        public thumbnails?: object[] = [];

        @Prop() public imageGalleryInfo?: ImageInfo;
        @Prop() public filterId?: number;

        get addColumnProp() {
            const addColumnProp = {column: false, wrap: true};
            if (this.$vuetify.breakpoint.xsOnly) {
                addColumnProp.column = true;
                addColumnProp.wrap = false;
            }
            return addColumnProp;
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
            if (galleryInfo && galleryInfo.thumbnails) {
                const thumbnailItems: object[] = [];
                galleryInfo.thumbnails.forEach((item: Image) => {
                    if (item.filterInfo && filterId) {
                        let imageItem: any;
                        if (item.filterInfo.includes(filterId)) {
                            imageItem = {thumbnailSrc: item.thumbnailSrc, title: item.title, active: true};
                        } else {
                            imageItem = {thumbnailSrc: item.thumbnailSrc, title: item.title, active: false};
                        }
                        thumbnailItems.push(imageItem);
                    }
                });
                this.thumbnails = thumbnailItems;
            }
            setTimeout(() => {
                (TimelineMax as any).to('.active-item', 1.5, {filter : '', opacity: 1});
                (TimelineMax as any).to('.inactive-item', 1.5, {filter : 'blur(2px) grayscale(100%)', opacity: 0.3 });
            }, 0);
        }
    }
</script>
<style scoped>

</style>
