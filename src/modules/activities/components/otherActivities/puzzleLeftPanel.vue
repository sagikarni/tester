<template>
    <div class="sllider-wrapper">
                <div  v-for="image in images" :key="image.id">
                    <div :class="['cell', image.id === 0 ? 'active' : '']">
                        <img :src="image.media.photo">
                    </div>
                </div>
    </div>

</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';


    @Component
    export default class PuzzleLeftPanel extends BaseComponent {
        @Prop() public images?: object[];
    }
</script>

<style scoped lang="scss">
.sllider-wrapper {
    height: 70vh;
    overflow-y: scroll;
    overflow-x: hidden;
    .cell {
        width: 410px;
        height: 200px;
        margin: 15px;
        border: 1px solid #4c6cff;
        position: relative;
        &:after {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.67);
        }
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
        &.active {
            border: 1px solid transparent;
            &:after {
                display: none;
            }
        }
    }
}
</style>
