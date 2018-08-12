<template>
    <div class="puzzel-wrapper">
        <section class="container">
            <transition-group name="list-complete"
                              v-for="image in images"
                              :key="image.id"
                              :class="[!puzzleShuffle ? 'list-complete' : '', image.id === indexId && !puzzleShuffle ? 'activeSection' : '']"
                              tag="section">
                <div v-for="item,index in filteredItems"
                     :key="item.id"
                     :data-id="item.id"
                     :data-paretId="image.id"
                     v-if="image.id === indexId"
                     :class="[ puzzleShuffle ? 'list-item' : 'list-complete-item' ]"
                     :style="!puzzleShuffle ? `width: ${100/Math.sqrt(count)}%; height: ${100/Math.sqrt(count)}%` : `width: ${itemWidth}px; height: ${itemHeight}px`">
                    <div :class="[puzzleShuffle ? 'item-content' : 'list-complete-img']">
                        <img :src="getImagePath(item.puzzlePath, getMediaTypes.Content)" alt=""/>
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
    import { ImageType} from '@/modules/activities/store/types';
    import TimelineMax from 'gsap';
    import Draggable from 'gsap/Draggable.js';
    import $ from 'jquery';
    import _ from "lodash";

    @Component
    export default class PuzzleView extends BaseComponent {
        @Prop() public images?: any[];
        public puzzleShuffle?: boolean = false;
        public width?: number = 0;
        public puzzleImage: any;
        public count: number = 0;
        public indexId: number = 0;
        public itemWidth: number = 0;
        public itemHeight: number = 0;
        public puzzleIsComplate: boolean = false;
        public stopEvents: boolean = false;

        constructor() {
            super();
            this.puzzleImage = [];
        }

        get getMediaTypes(): any {
            return ImageType;
        }
        public created() {
                this.changeImageData(this.indexId);
                localStorage.clear();
                this.stopEvents = true;
                setTimeout(() => {
                    this.itemWidth = $(".list-complete-item").width();
                    this.itemHeight = $(".list-complete-item").height();
                    this.repeatShuffle();
                    setTimeout(() => {
                        (TimelineMax as any).to($(".container"), 0.8, {
                            autoAlpha: 1, onComplete: () => {
                                this.puzzleShuffle = true;
                                this.puzzleRender();
                                (TimelineMax as any).to($(".container"), 0.8, {autoAlpha: 1});
                                this.savePuzzleIndex();
                                this.stopEvents = false;
                            },
                        });
                    }, 1500);
                }, 3000);
         }

        get filteredItems() {
            return this.puzzleImage;
        }

        public changeImageData(index: number) {
            if (this.images && this.images[index]) {
                this.count = this.images[index] && this.images[index]['media']['partsCount'];
                this.puzzleImage = this.images[index] && this.images[index]['puzzleMadia'];
            }
        }

        public puzzleComplete(status: boolean) {
            this.$nextTick(() => {
                let complete = true;
                this.puzzleIsComplate = false;
                if (localStorage.getItem(`puzzleIndex-${this.indexId}`)) {
                    const getPuzzleData = localStorage.getItem(`puzzleIndex-${this.indexId}`);
                    if (getPuzzleData) {
                        const puzzleData = JSON.parse(getPuzzleData);
                        if (puzzleData && puzzleData.length > 0) {
                            for (let i = 0; i < puzzleData.length - 1; i++) {
                                if (puzzleData[i].item > puzzleData[i + 1].item) {
                                    complete = false;
                                }
                            }
                            if (complete) {
                                this.puzzleIsComplate = true;
                                if (!status) {
                                    (TimelineMax as any).to($('.item-content'), 1, {
                                        className: '+=puzzle-correct',
                                        autoAlpha: 0,
                                        onComplete: () => {
                                            this.puzzleOver(this.indexId);
                                            this.puzzleIsComplate = false;
                                        },
                                    });
                                }

                            }
                        }
                    }
                }
            });
        }

        public puzzleOver(index: number) {
            (TimelineMax as any).set($(".container"), {autoAlpha: 0});
            this.indexId = index !== 0 ? 0 : 1;

            this.puzzleShuffle = false;
            this.count = 1;
            this.puzzleImage = [];

            this.indexId = index;

            this.$nextTick(() => {
                this.puzzleShuffle = false;
                this.count = 1;
                const puzzlePath = this.images && this.images[index] && this.images[index]['media']['photo'];
                this.puzzleImage = [{id: 1, puzzlePath}];
                (TimelineMax as any).to($(".container"), 0.1, {
                    autoAlpha: 0, onComplete: () => {
                        (TimelineMax as any).set($(".list-complete-item"), {className: '+=stopDragg'});
                        (TimelineMax as any).to($(".container"), 0.1, {autoAlpha: 1});
                    },
                });
            });
        }

        public savePuzzleIndex() {
            this.$nextTick(() => {
                const stack: any[] = [];
                $('.list-item').each((index: number, item: any) => {
                    stack.push({id: index, item: $(item).data('id')});
                });
                localStorage.setItem(`puzzleIndex-${this.indexId}`, JSON.stringify(stack));
                this.puzzleComplete(false);
            });
        }

        public changePuzzleImage(index: number) {
            this.stopEvents = true;

            this.indexId = index;
            if (localStorage.getItem(`puzzleIndex-${index}`)) {
                const getPuzzleData = localStorage.getItem(`puzzleIndex-${index}`);
                if (getPuzzleData) {
                    const puzzleData: any = JSON.parse(getPuzzleData);
                    this.puzzleComplete(true);
                    this.$nextTick(() => {
                        if (this.puzzleIsComplate) {
                            (TimelineMax as any).to($(".container"), 0.15, {
                                autoAlpha: 0, onComplete: () => {
                                    this.puzzleShuffle = false;
                                    this.count = 1;
                                    const puzzlePath = this.images && this.images[index] && this.images[index]['media']['photo'];
                                    this.puzzleImage = [{id: 1, puzzlePath}];
                                    this.$nextTick(() => {
                                        (TimelineMax as any).set($(".list-complete-item"), {className: '+=stopDragg'});
                                        (TimelineMax as any).to($(".container"), 0.8, {autoAlpha: 1});
                                        this.stopEvents = false;
                                    });
                                },
                            });
                            this.puzzleIsComplate = false;
                        } else {

                            const data = this.images && this.images[index] && this.images[index]['puzzleMadia'];
                            const newData = puzzleData.map((item: any) => {
                                return data[item.item - 1];
                            });
                            (TimelineMax as any).to($(".container"), 0.15, {
                                autoAlpha: 0, onComplete: () => {
                                    this.puzzleShuffle = false;
                                    this.count = this.images && this.images[index] && this.images[index]['media']['partsCount'];
                                    this.puzzleImage = newData;
                                    (TimelineMax as any).to($(".container"), 0.8, {autoAlpha: 1});
                                    setTimeout(() => {
                                        this.itemWidth = $(".list-complete-item").width();
                                        this.itemHeight = $(".list-complete-item").height();
                                        this.puzzleShuffle = true;
                                        this.puzzleRender();
                                        this.stopEvents = false;
                                    }, 1000);
                                },
                            });
                        }
                    });
                }
            } else {
                (TimelineMax as any).to($(".container"), 0.15, {
                    autoAlpha: 0, onComplete: () => {
                        this.puzzleShuffle = false;
                        this.changeImageData(index);
                        (TimelineMax as any).to($(".container"), 0.8, {autoAlpha: 1});
                        setTimeout(() => {
                            this.itemWidth = $(".list-complete-item").width();
                            this.itemHeight = $(".list-complete-item").height();
                            this.repeatShuffle();
                            setTimeout(() => {
                                this.puzzleShuffle = true;
                                this.puzzleRender();
                                this.savePuzzleIndex();
                                this.stopEvents = false;
                            }, 2500);
                        }, 3000);
                    },
                });
            }
        }

        public puzzleRender() {
            this.$nextTick(() => {

                // List version
// https://codepen.io/osublake/pen/jrqjdy/
                const rowSize = this.itemHeight;
                const colSize = this.itemWidth;
                const totalRows = Math.sqrt(this.count);
                const totalCols = Math.sqrt(this.count);
                const selfThis = this;

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
                    sortables.forEach(sortable => container ? container.appendChild(sortable.element) : true);

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

                    function setIndex(indexId: any) {

                        const cell = cells[indexId];
                        const dirty = position.x !== cell.x || position.y !== cell.y;

                        sortable.cell = cell;
                        sortable.index = indexId;
                        order.textContent = indexId + 1;

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
                            const sortIndex = totalCols * row + col;

                            // Update the model
                            changeIndex(sortable, sortIndex, sameRow, sameCol);
                        }
                    }

                    function upAction() {
                        animation.reverse();
                        layout();
                        selfThis.savePuzzleIndex();
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

        @Watch('stopEvents')
        public onPropertyChanged(value: boolean, oldValue: boolean) {
            this.$emit('stopEvents', value);
        }

        public repeatShuffle() {
            this.shuffle();
            setTimeout(() => {
                this.shuffle();
            }, 1200);
        }

        public shuffle() {
            this.puzzleImage = (_ as any).shuffle(this.puzzleImage);
        }

    }
</script>


<style scoped lang="scss">
    .list-complete {
        display: flex;
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        &.puzzle-correct {
            padding: 0;
        }
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
        padding: 0 15px;
        height: 100%;
        .container {
            position: relative;
            width: 100%;
            height: 100%;
            opacity: 1;
            cursor: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/cursor.png) 16 16, move;
            .activeSection {
                width: 100%;
                height: 100%;
            }
            .list-item {
                position: absolute;
                top: unset !important;
                left: unset !important;
                width: 250px;
                border-radius: 4px;
                height: 170px;
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

    .puzzle-correct {
        padding: 0 !important;
    }

    .stopDragg {
        pointer-events: none;
    }

    .order {
        display: none;
    }
</style>
