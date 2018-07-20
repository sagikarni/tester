<template>
    <div class="ex-wrapper">
        <div v-for="item in peepholeArray" :key="item.id" class="ex-peephole"  :style="{top: `${item.top}px`, left: `${item.left}px`, backgroundImage: `url(${selectPhotoMedia(parameter.media.photos[0])})`, backgroundPosition: `${-item.top}px ${-item.left}px` }"></div>
        <!--<div class="ex-peephole" style="right: 200px; top: 400px" :style="{ backgroundImage: 'url(' + selectPhotoMedia(parameter.media.photos[0]) + ')' }"></div>-->
        <!--<div class="ex-peephole" style="left: 800px; top: 500px" :style="{ backgroundImage: 'url(' + selectPhotoMedia(parameter.media.photos[0]) + ')' }"></div>-->
        <!--<img style="height: 100%; width: 100%; background-color: white"  class="object-fit_contain" :src="selectPhotoMedia(parameter.media.photos[0])">-->
    </div>
</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {PremiumCollectionLayout} from '@/modules/activities/store/types';
    import TimelineMax from 'gsap';

    @Component
    export default class ZoomSlide extends BaseComponent {
        @Prop() public parameter?: any;
        public peepholeData: any[] = [{ id: 1, top: 0, left: 0 }];

        get peepholeArray() {
            return this.peepholeData;
        }
        public divTop: number = 0;
        public divLeft: number = 0;

        public pauseAction(): void {
            // do nothing
        }
        public stopAction(): void {
            // do nothing
        }
        public revertWitpModal(): void {
            // do nothing
        }

        public created() {
            this.randomCordinate();
        }

        public addShape() {
            const length = this.peepholeData.length;
            this.peepholeData.push(
                {
                    id: length + 1,
                    top: Math.round(Math.random() * window.innerHeight) - 70,
                    left: Math.round(Math.random() * window.innerWidth) - 70,
                });
        }

        public randomCordinate() {
            this.peepholeData.map( (item: any) => {
                item.left = Math.round(Math.random() * window.innerWidth) - 70;
                item.top = Math.round(Math.random() * window.innerHeight) - 70;
            } );
        }

        public enlargeShape() {
            (TimelineMax as any).to('.ex-peephole', 0.3, {scale: 1.5});
        }

    }
</script>

<style scoped lang="scss">
    .object-fit_contain { object-fit: contain }
    .full-height{
        height:100%;
        background:#F8F8F8;
    }
    .full-height.two{
        background:#ACACAC;
    }
    .full-height.three{
        background:#5E5E5E;
    }
    .ex-wrapper{
        position: relative;
        height: 100vh;
        width: 100vh;
        .ex-peephole{
            position: absolute;
            width: 70px;
            height: 70px;
            border-radius: 50%;
        }
    }
    .table{
        display:table;
        width:100%;
        position:relative;
        background: transparent!important;
    }
    .cell {
        position: relative;
        display: table-cell;
        vertical-align: middle;
        width: 100%;
        margin: 0 auto;
        height:100%;
        text-align: center;
    }


</style>
