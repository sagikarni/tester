<template>
    <div class="ex-wrapper ex-zoom-activity">
        <svg style="background: black" fill="black" class = "button" expanded = "true" height = "100%" width = "100%">
            <defs>
                <clipPath :id="`theClipPath_${index}`">
                </clipPath>
            </defs>
            <g :clip-path="`url(#theClipPath_${index})`">
                <rect width="100%" height="100%" style="fill:rgb(255,255,255)" />
                <image preserveAspectRatio="xMinYMin slice" class="kid clipPathReveal"  style='stroke-width: 0px; background-color: blue;'
                       :href="getImagePath(parameter.media.photos[0], getMediaTypes.Content)"
                       x="0" y="0" width="100%" height="100%" />
            </g>
        </svg>
    </div>
</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import { State } from 'vuex-class';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {ShapeType, ImageType} from '@/modules/activities/store/types';
    import SlideBase from '@/modules/activities/components/slideShowBased/slideBase.vue';

    @Component
    export default class ZoomSlide extends SlideBase {
        @Prop() public parameter?: any;
        @Prop() public slideIndex?: number;
        @State(state => state.activities.activity && state.activities.activity.content) public activityDetailsContent?: any;

        public data: any[] = [];
        public size: number = 1;
        public largeEvent: boolean = true ;
        public showShape: boolean = true ;

        get getMediaTypes(): any {
            return ImageType;
        }
        get index(): number {
            return this.slideIndex ? this.slideIndex : 0;
        }

        get isCircle(): boolean {
            return (this.activityDetailsContent.shape as ShapeType) === ShapeType.Circle;
        }

        public randomIntFromInterval(min: number, max: number) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        public reveal() {
            const svgns = "http://www.w3.org/2000/svg";
            const clipPath = document.getElementById(`theClipPath_${this.index}`);
            const rect = document.createElementNS(svgns, 'rect');

            rect.setAttribute('width', '100%');
            rect.setAttribute('height', '100%');
            rect.setAttribute('class', 'rect');
            if (clipPath) {
                clipPath.appendChild(rect);
            }
        }

        public addData() {
            let min = 0;
            let max = 100;
            if (this.data.length < 2) { // make sure to place the first 2 point not in the sides
                min = 20;
                max = 80;
            }
            const x = this.randomIntFromInterval(min, max);
            const y = this.randomIntFromInterval(min, max);
            const newObj = {x, y};
            this.data.push(newObj);
            this.draw(newObj);
        }

        public clear() {
            const clipPath = document.getElementById(`theClipPath_${this.index}`);
            while (clipPath && clipPath.firstChild) {
                clipPath.removeChild(clipPath.firstChild);
            }
        }

        public rePosition() {
            this.clear();
            for (const data of this.data) {
                data.x = this.randomIntFromInterval(0, 100);
                data.y = this.randomIntFromInterval(0, 100);
                this.draw(data);
            }
        }

        public enlarge() {
            if (this.data && this.data.length > 0 && this.largeEvent) {
                // add new shapes , in the same position
                this.largeEvent = false;
                this.size += 1;
                for (const data of this.data) {
                    this.draw(data);
                }
                this.largeEvent = true;
            }
        }

        public draw(obj: any) {
            if (this.isCircle) {
                this.drawCircle(obj);
            } else {
                this.drawRect(obj);
            }
        }

        public drawCircle(obj: any) {
            const x = obj.x;
            const y = obj.y;
            const svgns = "http://www.w3.org/2000/svg";
            const clipPath = document.getElementById(`theClipPath_${this.index}`);

            const circle = document.createElementNS(svgns, 'circle');
            circle.setAttribute('cx', x + '%');
            circle.setAttribute('cy', y + '%');
            circle.setAttribute('r', (50 * this.size) + 'px');
            circle.setAttribute('style', 'transform-origin: ' + x + '% ' + y + '%');
            circle.setAttribute('class', 'shape');
            if (clipPath) {
                clipPath.appendChild(circle);
            }
        }

        public drawRect(obj: any) {
            const x = obj.x;
            const y = obj.y;

            const svgns = "http://www.w3.org/2000/svg";
            const clipPath = document.getElementById(`theClipPath_${this.index}`);
            const circle = document.createElementNS(svgns, 'rect');
            circle.setAttribute('x', '0px');
            circle.setAttribute('y', y + '%');
            circle.setAttribute('height', (15 * this.size) + 'px');
            circle.setAttribute('width', '100%');
            circle.setAttribute('style', 'transform-origin: ' + x + '%' + y + '%');
            circle.setAttribute('class', 'shape');
            if (clipPath) {
                clipPath.appendChild(circle);
            }
        }

        public showFirstShape() {
            if (this.showShape) {
                setTimeout(() => {
                    this.addData();
                }, 500);
                this.showShape = false;
            }
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
        width: 100vw;
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

    @keyframes shapeTransition {
        from {
            transform: scale(0.2);
        }
        to {
            transform: scale(1);
        }
    }
    .shape {
        animation-duration: 1s;
        animation-name: shapeTransition;

    }

    @keyframes fullImageTransition {
        from {
            transform: scale(0.2);
        }
        to {
            transform: scale(1);
        }
    }
    .rect {
        animation-duration: 2s;
        animation-name: fullImageTransition;
        transform-origin: 0px 0px;
    }
</style>
