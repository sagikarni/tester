<template>
    <div>
        <rotate-screen-alert :orientation="hasCorrectOrientation && isBeginningSlide"></rotate-screen-alert>
        <section v-show="!orientationStatus">
            <v-flex>
                <slide-show-menu-pane ref="topPane"></slide-show-menu-pane>
            </v-flex>

            <v-layout row wrap class="puzzle-content">
                <v-flex xs3>
                    <puzzle-left-panel :images="slides"></puzzle-left-panel>
                </v-flex>
                <v-flex xs9>
                    <puzzle-view :images="slides"></puzzle-view>
                </v-flex>
            </v-layout>

        </section>
        <v-snackbar v-model="showRotateNotification">
            {{ $locale.general.rotateScreenWarning }}
        </v-snackbar>

    </div>
</template>

<script lang="ts">
    import { Component, Watch } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import SlideShowMenuPane from '@/modules/common/components/slideShowMenuPane.vue';
    import PuzzleView from '@/modules/activities/components/otherActivities/puzzleView.vue';
    import PuzzleLeftPanel from '@/modules/activities/components/otherActivities/puzzleLeftPanel.vue';


    import SideNavigations from '@/modules/common/components/sideNavigations.vue';
    import RotateScreenAlert from '@/modules/common/components/rotateScreenAlert.vue';
    import OrientationUtil from '@/modules/common/utils/orientationUtil';
    import {ActivityType, PremiumCollectionLayout} from '@/modules/activities/store/types';

    import TimelineMax from 'gsap';
    import { State } from 'vuex-class';


    @Component({
        components: {
            SlideShowMenuPane,
            SideNavigations,
            RotateScreenAlert,
            PuzzleView,
            PuzzleLeftPanel,
        },
    })
    export default class PuzzleActivity extends BaseComponent {
        @State(state => state.deviceOrientation) public deviceOrientation?: number;
        @State(state => state.activities.activity && state.activities.activity.details) public activityDetailsState?: any;
        @State(state => state.activities.activity && state.activities.activity.content) public activityDetailsContent?: any;

        public orientationUtil?: any;
        public orientationStatus: boolean = false;
        public activityId: string = '1';
        public showRotateNotification: boolean = false;
        public isBeginningSlide: boolean = true;
        public hasCorrectOrientation: boolean = false;
        public pageLoad: boolean = false;

        constructor() {
            super();
            this.orientationUtil = new OrientationUtil();
        }

        @Watch('activityOrientation')
        public onPropertyChanged(value: any, oldValue: any) {
            if (value !== this.activityDetailsState.orientation) {
                this.hasCorrectOrientation = true;
                if (!this.isBeginningSlide) {
                    this.showRotateNotification = true;
                } else {
                    this.showRotateNotification = false;
                    this.orientationStatus = true;
                }
            } else {
                this.hasCorrectOrientation = false;
                this.orientationStatus = false;
                this.showRotateNotification = false;
                if (this.pageLoad) {
                    setTimeout(() => {
                        (this.$refs.topPane as any).hidePaneInternal(1);
                        (this.$refs.slideNavigations as any).hideSidePanes(1);
                    }, 3000);
                    this.pageLoad = false;
                }
            }
        }

        get slides(): any[] {
            const slides = [];

            if (this.activityDetailsContent && this.activityDetailsContent.Media && this.activityDetailsContent.Media.length > 0) {
                for (let i = 0; i < this.activityDetailsContent.Media.length; i++) {
                    slides.push({id: i, media: this.activityDetailsContent.Media[i]});
                }
            }
            console.log('slide', slides);
            return slides;
        }
        get activityType() {
            return this.activityDetailsState && this.activityDetailsState.activityType;
        }
        get activityOrientation(): number {
            return this.orientationUtil.orientation;
        }

        get mediaType() {
            return this.activityDetailsState && this.activityDetailsState.mediaType;
        }
        get mediaCountInfo(): number {
            return this.activityDetailsState && this.activityDetailsState.mediaCount;
        }

        get activityNameInfo(): string {
            return this.activityDetailsState && this.activityDetailsState.title;
        }

        get activityContent(): any {
            return this.activityDetailsContent;
        }

        public hideTopPane(): void {
            (this.$refs.topPane as any).hidPane();
        }

        public showTopPane(): void {
            (this.$refs.topPane as any).showPane();
        }

        public isFirstSlide(isBeginning: boolean): void {
            if (isBeginning && this.hasCorrectOrientation) {
                this.showRotateNotification = false;
                this.orientationStatus = true;
            }
            this.isBeginningSlide = isBeginning;
        }
        public created() {
            if (this.$route.params.activityId) {
                this.activityId = this.$route.params.activityId;
                (TimelineMax as any).to(".application--wrap", 0,  {backgroundColor: "#000000"});
                this.$nextTick( () => {
                    // List version
// https://codepen.io/osublake/pen/jrqjdy/

                    var rowSize   = 150;
                    var colSize   = 250;
                    var totalRows = 3;
                    var totalCols = 3;

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
                if (!this.activityDetailsState) {
                    this.$router.push(`/activity-details/${this.activityId}`);
                }
                if (this.activityDetailsState && this.activityDetailsState.orientation && this.activityOrientation !== this.activityDetailsState.orientation) {
                    this.hasCorrectOrientation = true;
                    this.orientationStatus = true;
                    this.pageLoad = true;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .puzzle-content {
        margin-top: 60px;
    }

</style>

