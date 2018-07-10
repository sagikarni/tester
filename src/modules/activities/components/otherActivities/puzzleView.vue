<template>
    <div class="puzzel-wrapper">
        <section class="container">
            <transition-group name="list-complete" v-for="image in images" v-show="image.id === 0"
                              :key="image.id"
                              :data-id="image.id"
                              :class="[!puzzleShuffle ? 'list-complete' : '', image.id === 0 ? 'active' : '']" tag="section">
                <div
                        v-for="item in image.puzzleMadia"
                        :key="item.id"
                        :class="[ puzzleShuffle ? 'list-item' : 'list-complete-item' ]"
                        :style="!puzzleShuffle ? `flex: 1 1 ${100/Math.sqrt(imageCount)}%` : ``">
                    <div :class="[puzzleShuffle ? 'item-content' : 'list-complete-img']"
                         :style="`background-image: url( ${item.puzzlePath}  )`">
                        <span class="order">{{item.id}}</span>
                    </div>
                </div>
            </transition-group>
        </section>
    </div>

</template>

<script lang="ts">
    import {Component, Prop, Watch} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import TimelineMax from 'gsap';
    import Draggable from 'gsap/Draggable.js';

    import $ from 'jquery';
    @Component
    export default class PuzzleView extends BaseComponent {
        @Prop() public images?: object[];
        @Prop() public puzzleImagesPath?: object[];
        @Prop() public imageCount: number = 1;
        @Prop() public puzzleId?: number;
        @Prop() public urlPath?: string;
        public puzzleShuffle?: boolean = false;

        constructor() {
            super();
        }

        public created() {
            setTimeout(() => {
                this.shuffle(0);
                setTimeout(() => {
                    this.puzzleShuffle = true;
                    this.puzzleRender();
                }, 2000);
            }, 3000);
        }

        public puzzleRender() {
            this.$nextTick(() => {
                // List version
// https://codepen.io/osublake/pen/jrqjdy/
                const rowSize = 150;
                const colSize = 250;
                const totalRows = Math.sqrt(this.imageCount);
                const totalCols = Math.sqrt(this.imageCount);

                const cells: any[] = [];

                // (TimelineMax as any).to(document.querySelector(".list-item"), 0.5, { top: 0, left: 0 });
// Map cell locations to array
                for (let row = 0; row < totalRows; row++) {
                    for (let col = 0; col < totalCols; col++) {
                        cells.push({
                            row,
                            col,
                            x: col * colSize,
                            y: row * rowSize,
                        });
                    }
                }

                const container = document.querySelector(".container");
                const listItems = Array.from(document.querySelectorAll(".list-item")); // Array of elements
                const sortables = listItems.map(Sortable); // Array of sortables
                const total = sortables.length;

                (TimelineMax as any).to(container, 0.5, {autoAlpha: 1});

                function changeIndex(item: any, to: any, sameRow: any, sameCol: any) {

                    // Check if adjacent to new position
                    if ((sameRow && !sameCol) || (!sameRow && sameCol)) {

                        // Swap positions in array
                        const temp = sortables[to];
                        sortables[to] = item;
                        sortables[item.index] = temp;

                    } else {

                        // Change position in array
                        arrayMove(sortables, item.index, to);
                    }

                    // Simple, but not optimized way to change element's position in DOM. Not always necessary.
                    sortables.forEach(sortable => container ?  container.appendChild(sortable.element) : true);

                    // Set index for each sortable
                    sortables.forEach((sortable, index) => sortable.setIndex(index));
                }

                function Sortable(element: any, index: number) {

                    const content = element.querySelector(".item-content");
                    const order = element.querySelector(".order");

                    const animation = (TimelineMax as any).to(content, 0.3, {
                        boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
                        force3D: true,
                        scale: 1.1,
                        paused: true,
                    });

                    const dragger = new Draggable(element, {
                        onDragStart: downAction,
                        onRelease: upAction,
                        onDrag: dragAction,
                        cursor: "inherit",
                    });

                    const position = element._gsTransform;

                    // Public properties and methods
                    const sortable = {
                        cell: cells[index],
                        dragger,
                        element,
                        index,
                        setIndex,
                    };

                    (TimelineMax as any).set(element, {
                        x: sortable.cell.x,
                        y: sortable.cell.y,
                    });

                    function setIndex(index: number) {

                        const cell = cells[index];
                        const dirty = position.x !== cell.x || position.y !== cell.y;

                        sortable.cell = cell;
                        sortable.index = index;
                        order.textContent = index + 1;

                        // Don't layout if you're dragging
                        if (!dragger.isDragging && dirty) {
                            layout();
                        }
                    }

                    function downAction(this: any) {
                        animation.play();
                        this.update();
                    }

                    function dragAction(this: any) {

                        const col = clamp(Math.round(this.x / colSize), 0, totalCols - 1);
                        const row = clamp(Math.round(this.y / rowSize), 0, totalRows - 1);

                        const cell = sortable.cell;
                        const sameCol = col === cell.col;
                        const sameRow = row === cell.row;

                        // Check if position has changed
                        if (!sameRow || !sameCol) {

                            // Calculate the new index
                            const index = totalCols * row + col;

                            // Update the model
                            changeIndex(sortable, index, sameRow, sameCol);
                        }
                    }

                    function upAction() {
                        animation.reverse();
                        layout();
                    }

                    function layout() {
                        (TimelineMax as any).to(element, 0.3, {
                            x: sortable.cell.x,
                            y: sortable.cell.y,
                        });
                    }

                    return sortable;
                }

// Changes an elements's position in array
                function arrayMove(array: any, from: any, to: any) {
                    array.splice(to, 0, array.splice(from, 1)[0]);
                }

// Clamps a value to a min/max
                function clamp(value: any, a: any, b: any) {
                    return value < a ? a : (value > b ? b : value);
                }
            });
        }

        @Watch('urlPath')
        public onPropertyChanged(value: string, oldValue: string) {
            // (TimelineMax as any).set($('.active'), {
            //     className: "-=active",
            //     className: "+=already",
            //     display: 'none',
            //     onComplete: () => {
            //         (TimelineMax as any).set(event.target, {className: "+=active"});
            //     },
            // });
            this.puzzleRender();
        }

        public shuffle(index: number) {
            // if (this.images[index] && this.images[index]['puzzleMadia']) {
            //     this.images[index]['puzzleMadia'] = _.shuffle(this.images[index]['puzzleMadia']);
            // }
        }
    }
</script>

<style scoped lang="scss">
    .list-complete {
        display: flex;
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .list-complete-item {
        transition: transform 1s;
        /*flex: 1 1 33%;*/
        height: 200px;
        padding: 10px;
        /*   display: inline-block;
          margin-right: 10px; */
    }

    .list-complete-img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        background-size: cover;
    }

    .list-complete-enter, .list-complete-leave-to
        /* .list-complete-leave-active for <2.1.8 */
    {
        opacity: 0;
        transform: translateY(30px);
    }

    .list-complete-leave-active {
        position: absolute;
    }

    .puzzel-wrapper {
        padding: 15px 30px;
        height: 100%;

        .container {
            position: relative;
            /*top: 50%;*/
            /*left: 50%;*/
            width: 80%;
            height: 100%;
            opacity: 1;
            /*visibility: hidden;*/
            /*transform: translate(-50%, -50%);*/
            cursor: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/cursor.png), move;
            cursor: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/cursor.png) 16 16, move;
            .list-item {
                position: absolute;
                top: 0;
                left: 0;
                height: 140px;
                width: 240px;
                .item-content {
                    background-size: cover;
                    height: 100%;
                    border: 0 solid rgba(123, 123, 123, 0.498039);
                    border-radius: 4px;
                    color: rgb(153, 153, 153);
                    line-height: 140px;
                    /*padding-left: 32px;*/
                    font-size: 24px;
                    font-weight: 400;
                    background-color: rgb(255, 255, 255);
                    box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0;
                    .order {
                        display: none;
                    }
                }
            }
        }
    }
</style>

