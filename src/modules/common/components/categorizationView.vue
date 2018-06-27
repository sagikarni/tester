<template>
    <main>
        <div class="bounds"></div>
        <div id="pool" class="zone">
            <h3>Pool</h3>
            <div class="tile" v-for="slide in slides" :key="slide.id">
                <img style="width: 40%; background-color: white" class="object-fit_contain" :data-id="slide.media.categoryId" :src="slide.media.photo">
            </div>
        </div>


        <div id="drop" class="zone">
            <h3>Drop Zone</h3>
        </div>
        <div id="drop1" class="zone">
            <h3>Drop Zone</h3>
        </div>
    </main>
</template>

<script lang="ts">
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import TimelineMax from 'gsap';
    import Draggable from 'gsap/Draggable.js';
    import {ActivityType, MediaType} from '@/modules/activities/store/types';

    @Component
    export default class CategorizationView extends BaseComponent {

        @Prop() public slides?: any[];
        @Prop() public activityType?: number;
        @Prop() public mediaType?: number;

        constructor() {
            super();
        }

    }
</script>

<style scoped lang="scss">
    .zone {
        /*position: relative;*/
        background-color: #fafafa;
        /*min-width: 100px;*/
        /*height: 100%;*/
        border: 1px solid #aaa;
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
    }
    #drop{
        min-height: 200px;
        width: 45%!important;
        float: left;
    }
    #drop1{
        float: right;
        min-height: 200px;
        width: 45%!important;
    }
</style>

