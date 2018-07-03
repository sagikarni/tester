<template>
    <div class="puzzel-wrapper">
    <section class="container">

        <div class="list-item" v-for="count in imageCount" :key="count">
            <div class="item-content"
                 :style="`background-image: url( ${getImagePath(urlPath)}${count}.jpeg  )`">
                <span class="order">{{count}}</span>
            </div>
        </div>

    </section>
</div>

</template>

<script lang="ts">
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';

    @Component
    export default class PuzzleView extends BaseComponent {
        @Prop() public images?: object[];
        @Prop() public imageCount?: number;
        @Prop() public urlPath?: string;

        public getImagePath(url: string): string{
            return  url.replace(/photo.jpg$/gi, "parts/");
        }
        public created() {
            this.puzzleRender();
        }
        public puzzleRender() {
            this.$nextTick( () => {
                // List version
// https://codepen.io/osublake/pen/jrqjdy/
                var rowSize   = 150;
                var colSize   = 250;
                var totalRows = Math.sqrt(this.imageCount);
                var totalCols = Math.sqrt(this.imageCount);

                var cells = [];

// Map cell locations to array
                for (var row = 0; row < totalRows; row++) {
                    for (var col = 0; col < totalCols; col++) {
                        cells.push({
                            row: row,
                            col: col,
                            x: col * colSize,
                            y: row * rowSize
                        });
                    }
                }

                var container = document.querySelector(".container");
                var listItems = Array.from(document.querySelectorAll(".list-item")); // Array of elements
                var sortables = listItems.map(Sortable); // Array of sortables
                var total     = sortables.length;

                TweenLite.to(container, 0.5, { autoAlpha: 1 });

                function changeIndex(item, to, sameRow, sameCol) {

                    // Check if adjacent to new position
                    if ((sameRow && !sameCol) || (!sameRow && sameCol)) {

                        // Swap positions in array
                        var temp = sortables[to];
                        sortables[to] = item;
                        sortables[item.index] = temp;

                    } else {

                        // Change position in array
                        arrayMove(sortables, item.index, to);
                    }

                    // Simple, but not optimized way to change element's position in DOM. Not always necessary.
                    sortables.forEach(sortable => container.appendChild(sortable.element));

                    // Set index for each sortable
                    sortables.forEach((sortable, index) => sortable.setIndex(index));
                }

                function Sortable(element, index) {

                    var content = element.querySelector(".item-content");
                    var order   = element.querySelector(".order");

                    var animation = TweenLite.to(content, 0.3, {
                        boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
                        force3D: true,
                        scale: 1.1,
                        paused: true
                    });

                    var dragger = new Draggable(element, {
                        onDragStart: downAction,
                        onRelease: upAction,
                        onDrag: dragAction,
                        cursor: "inherit"
                    });

                    var position = element._gsTransform;

                    // Public properties and methods
                    var sortable = {
                        cell:     cells[index],
                        dragger:  dragger,
                        element:  element,
                        index:    index,
                        setIndex: setIndex
                    };

                    TweenLite.set(element, {
                        x: sortable.cell.x,
                        y: sortable.cell.y,
                    });

                    function setIndex(index) {

                        var cell  = cells[index];
                        var dirty = position.x !== cell.x || position.y !== cell.y;

                        sortable.cell = cell;
                        sortable.index = index;
                        order.textContent = index + 1;

                        // Don't layout if you're dragging
                        if (!dragger.isDragging && dirty) layout();
                    }

                    function downAction() {
                        animation.play();
                        this.update();
                    }

                    function dragAction() {

                        var col = clamp(Math.round(this.x / colSize), 0, totalCols - 1);
                        var row = clamp(Math.round(this.y / rowSize), 0, totalRows - 1);

                        var cell = sortable.cell;
                        var sameCol = col === cell.col;
                        var sameRow = row === cell.row;

                        // Check if position has changed
                        if (!sameRow || !sameCol) {

                            // Calculate the new index
                            var index = totalCols * row + col;

                            // Update the model
                            changeIndex(sortable, index, sameRow, sameCol);
                        }
                    }

                    function upAction() {
                        animation.reverse();
                        layout();
                    }

                    function layout() {
                        TweenLite.to(element, 0.3, {
                            x: sortable.cell.x,
                            y: sortable.cell.y
                        });
                    }

                    return sortable;
                }

// Changes an elements's position in array
                function arrayMove(array, from, to) {
                    array.splice(to, 0, array.splice(from, 1)[0]);
                }

// Clamps a value to a min/max
                function clamp(value, a, b) {
                    return value < a ? a : (value > b ? b : value);
                }
            } )
        }

        @Watch('urlPath')
        public onPropertyChanged(value: string, oldValue: string) {
            this.puzzleRender();
        }
     }
</script>

<style scoped lang="scss">
.puzzel-wrapper {
    padding: 15px 30px;
    height: 100%;

.container {
    position: relative;
    /*top: 50%;*/
    /*left: 50%;*/
    width: 80%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    /*transform: translate(-50%, -50%);*/
    cursor: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/cursor.png),move;
    cursor: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/cursor.png) 16 16,move;
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
            box-shadow: rgba(0,0,0,0.2) 0 1px 2px 0;
            .order {
                display: none;
            }
        }
    }
}
}
</style>

