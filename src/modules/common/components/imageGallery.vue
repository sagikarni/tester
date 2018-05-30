<template>
    <v-container grid-list-md class="mt-5 pa-0">
        <h3>What's inside:</h3>
        <v-layout v-bind="addColumnProp">
            <v-flex sm6 md4 v-for="(thumbnail, index) in thumbnails" :key="index">
                <img :src="thumbnail.imgSrc" :alt="thumbnail.title" width="100%" height="100%" style="object-fit: cover">
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
    import { ImageGalleryInfo, Thumbnail } from "@/modules/store/typeClasses";


    @Component
    export default class ImageGallery extends Vue {


        public thumbnails?: object[] = [];

        @Prop() public imageGalleryInfo?: ImageGalleryInfo;
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
                galleryInfo.thumbnails.forEach((item: Thumbnail) => {
                    if (item.filterInfo && filterId) {
                        if (item.filterInfo.includes(filterId)) {
                            thumbnailItems.push({imgSrc: item.imgSrc, title: item.title});
                        }
                    }
                });
                this.thumbnails = thumbnailItems;
            }
        }
    }
</script>
<style scoped>

</style>