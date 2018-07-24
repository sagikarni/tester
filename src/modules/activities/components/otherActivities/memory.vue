<template>
    <div ref="memoryContainer">

    </div>
</template>


<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';

    @Component
    export default class PuzzleLeftPanel extends BaseComponent {
        // @Prop() public images: any[];
        @Prop() public columnCount: number = 1;
        @Prop() public rowsCount: number = 1;
        @Prop() public aspectRatio: number = 1;

        public created() {
            const memoryContainer = this.$refs.memoryContainer as any;
            let containerHeight = memoryContainer.offsetHeight;
            let containerWidth = memoryContainer.offsetWidth;
            let imageHeight, imageWidth = -1; // this implementation of setting height or width is good when rowsCount ==  columnCount
            // if they are not eual , we will need to change the code accordinally.
            if (containerWidth / containerHeight > this.aspectRatio) {
                imageHeight = 100 / this.rowsCount;
            } else {
                imageWidth = 100 / this.columnCount;
            }
            // if imageHeight !=-1 set the images height (do not set width - it will autonmatically will be set)
            // if imageWidth !=-1 set the images width (do not set width - it will autonmatically will be set)
        }
    }
</script>
