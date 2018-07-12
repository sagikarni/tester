<template>
    <div class="puzzel-wrapper">
        <section class="container" >
            <transition-group name="list-complete"
                              v-for="image in images"
                              :key="image.id"
                              :class="[!puzzleShuffle ? 'list-complete' : '']"
                              v-if="image.id === indexId"
                              tag="section">
                <div v-for="item,index in filteredItems"
                     :key="item.id"
                     :data-id="item.id"
                     :data-paretId="image.id"
                     v-if="image.id === indexId"
                     :class="[ puzzleShuffle ? 'list-item' : 'list-complete-item' ]"
                     :style="!puzzleShuffle ? `width: ${100/Math.sqrt(count)}%; height: ${100/Math.sqrt(count)}%` : `width: ${itemWidth}px; height: ${itemHeight}px`">
                    <div :class="[puzzleShuffle ? 'item-content' : 'list-complete-img']">
                        <img :src="item.puzzlePath" alt=""/>
                        <span class="order">{{index}}</span>
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
        @Prop() public images: any[];
        public puzzleShuffle?: boolean = false;
        public width?: number = 0;
        public puzzleImage: any;
        public count: number;
        public indexId: number = 0;
        public itemWidth: number = 0;
        public itemHeight: number = 0;

        constructor() {
            super();
            this.puzzleImage = this.images[this.indexId] && this.images[this.indexId]['puzzleMadia'];
        }
        get filteredItems() {
            return this.puzzleImage;
        }

        public getImagePath(url: string): string {
            return  url.replace(/photo.jpg$/gi, "parts/");
        }

        public changeImageData(index: number) {
            this.count = this.images[index] && this.images[index]['media']['partsCount'];
            this.puzzleImage = this.images[index] && this.images[index]['puzzleMadia'];
        }

        public ttt (index: number) {
            let stack = [];
            $('.list-item').each( (index, item ) => {
                stack.push({id: index, item: $(item).data('id')});
            } );
            localStorage.setItem(`puzzleIndex-${this.indexId}`,  JSON.stringify(stack) );
            //

                if(localStorage.getItem(`puzzleIndex-${index}`)){
                    console.log( 'puzzleIndex', JSON.parse(localStorage.getItem(`puzzleIndex-${index}`))  );
                }

                $(`[data-paretid = ${this.indexId}]`).remove();
                this.indexId = index;

                (TimelineMax as any).to(".container", 0.8, {
                    autoAlpha: 0, onComplete: () => {
                        this.puzzleShuffle = false;
                        this.changeImageData(index);
                        (TimelineMax as any).to(".container", 1.8, {autoAlpha: 1});
                    },
                });

                setTimeout(()=> {
                    this.itemWidth = $(".list-complete-item").width();
                    this.itemHeight = $(".list-complete-item").height();
                    this.shuffle();
                    setTimeout(()=> {
                        this.puzzleShuffle = true;
                        this.puzzleRender();
                    }, 2000);
                }, 2000);

        }


        public created() {
            this.changeImageData(this.indexId);
            setTimeout(() => {
                this.itemWidth = $(".list-complete-item").width();
                this.itemHeight = $(".list-complete-item").height();
                this.shuffle();
                (TimelineMax as any).to(".container", 0.8, {
                    autoAlpha: 1, onComplete: () => {
                        this.puzzleShuffle = true;
                        this.puzzleRender();
                        (TimelineMax as any).to(".container", 0.8, {autoAlpha: 1});
                    },
                });
            }, 3000);
        }

        public puzzleRender() {
            this.$nextTick( () => {

                // List version
// https://codepen.io/osublake/pen/jrqjdy/
                const rowSize   = this.itemHeight;
                const colSize   = this.itemWidth ;
                const totalRows = Math.sqrt(this.count);
                const totalCols = Math.sqrt(this.count);

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

                function Sortable(element: any, index: any) {

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

                    function setIndex(index: any) {

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
            } );
        }

        @Watch('urlPath')
        public onPropertyChanged(value: string, oldValue: string) {
            // this.puzzleRender();
        }

        public shuffle() {
            this.puzzleImage = _.shuffle(this.puzzleImage);
        }

    }
</script>



<style scoped lang="scss">
    .list-complete {
        display: flex;
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        .list-complete-item {
            transition: transform 1s;
            width: 250px;
            height: 100%;
            .list-complete-img {
                padding: 5px;
                img {
                    object-fit: cover;
                    height: 100%;
                    width: 100%;
                    vertical-align: top;
                    max-width: 100%;
                }
            }
        }
    }
    .puzzel-wrapper {
        padding: 15px 30px;
        height: 100%;
        .container {
            position: relative;
            width: 80%;
            height: 100%;
            opacity: 1;
            cursor: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/cursor.png) 16 16,move;
            @media (max-width: 1200px) {
                width: 100%;
            }
            .list-item {
                position: absolute;
                top: unset!important;
                left: unset!important;
                width:250px;
                border-radius: 4px;
                height: 170px;
                &.two {
                    width: 50%;
                    height: 50%;
                }
                .item-content {
                    padding: 5px;
                    width: 100%;
                    height: 100%;
                    &.puzzle-correct {
                        padding: 0;
                    }
                    img {
                        object-fit: cover;
                        height: 100%;
                        width: 100%;
                    }
                }
            }
        }

    }
    .order {
        display: none;
    }
</style>
