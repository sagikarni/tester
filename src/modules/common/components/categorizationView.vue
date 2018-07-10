<template>
    <main>
        <section id="top-bar">
            <div id="clone-container">
                <div id="scroll-box">
                    <div id="tile-container">
                        <div class="tile-wrapper" v-for="slide in slides" :key="slide.id">
                        <div class="tile" :data-id="slide.media.categoryId" :style="`background-image: url( ${slide.media.photo}  )`"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="content"></section>
        <div class="left-right-panel">
            <div class="left-pane">
                <h3>{{dropName}}</h3>
                <div id="drop-panel" :data-id="dropDataId">
                </div>
            </div>
            <div class="right-pane">
                <h3>{{dropName1}}</h3>
                <div id="drop-panel2" :data-id="dropDataId1">
                </div>
            </div>
        </div>
    </main>


</template>

<script lang="ts">
    import {Component, Prop, Watch} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import TimelineMax from 'gsap';
    import Draggable from 'gsap/Draggable.js';
    import $ from "jquery";
    import {ActivityType, MediaType} from '@/modules/activities/store/types';

    @Component
    export default class CategorizationView extends BaseComponent {
        @Prop() public slides?: any[];
        @Prop() public categoryTypes?: any[];
        @Prop() public activityType?: number;
        @Prop() public mediaType?: number;

        public height: number = 0;
        public width: number = 0;
        public margin: number = 30;

        constructor() {
            super();
        }

        get dropName(): string {
            return this.categoryTypes && this.categoryTypes[0] && this.categoryTypes[0]['category'] && this.categoryTypes[0]['category']['categoryName'];
        }

        get dropName1(): string {
            return this.categoryTypes && this.categoryTypes[1] && this.categoryTypes[1]['category'] && this.categoryTypes[1]['category']['categoryName'];
        }

        get dropDataId(): number {
            return this.categoryTypes && this.categoryTypes[0] && this.categoryTypes[0]['category'] && this.categoryTypes[0]['category']['categorId'];
        }

        get dropDataId1(): number {
            return this.categoryTypes && this.categoryTypes[0] && this.categoryTypes[0]['category'] && this.categoryTypes[1]['category']['categorId'];
        }


        public created() {
          this.draggAndDrop();
       }


        public draggAndDrop() {
            this.$nextTick( () => {

                const container = $("#clone-container");
                const scrollBox = $("#scroll-box");
                const dropPanel = $("#drop-panel");
                const dropPanel2 = $("#drop-panel2");
                const tiles     = $(".tile");
                const threshold = "50%";

                (TimelineMax as any).set(dropPanel, {height: window.innerHeight - 540});
                (TimelineMax as any).set(dropPanel2, {height: window.innerHeight - 560});

                tiles.each(function(this: void) {

                    const element = $(this);
                    const wrapper = element.parent();
                    const offset  = element.position();

                    const scope = {
                        clone   : element.clone().addClass("clone").prependTo(container),
                        element,
                        wrapper,
                        width   : wrapper.outerWidth(),
                        dropped : false,
                        moved   : false,
                        draggable: '',
                        get x() { return getPosition(wrapper, offset).x; },
                        get y() { return getPosition(wrapper, offset).y; },
                    };

                    scope.draggable = createDraggable(scope);

                    element.on("mousedown touchstart", scope, startDraggable);

                });

// START DRAGGABLE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                function startDraggable(event: any) {

                    const tile = event.data;

                    TweenLite.set(tile.element, { autoAlpha: 0 });
                    TweenLite.set(tile.clone, { x: tile.x, y: tile.y, autoAlpha: 1 });

                    tile.draggable.startDrag(event.originalEvent);
                }

// CREATE DRAGGABLE ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                function createDraggable(tile: any) {

                    const clone   = tile.clone;
                    const wrapper = tile.wrapper;

                    tile.draggable = new Draggable(clone, {
                        onPress   : () => {
                            if (Draggable.hitTest(clone, scrollBox)) {
                                TweenLite.to(clone, 0.15, {scale: 0.6, autoAlpha: 0.75});
                            } else {
                                TweenLite.to(clone, 0.15, {scale: 1.2, autoAlpha: 0.75});
                            }
                        },
                        onDrag() {
                            if (!tile.moved) {
                                if (!this.hitTest(wrapper)) {
                                    tile.moved = true;
                                    TweenLite.to(wrapper, 0.3, { width: 0 });
                                }
                            }
                        },
                        onRelease() {
                            let className: string | undefined;
                            if ( this.hitTest(dropPanel, threshold)) {
                                dropPanel.append(wrapper);
                                tile.dropped = true;
                                className = "+=dropped";
                            }

                            if ( this.hitTest(dropPanel2, threshold)) {
                                dropPanel2.append(wrapper);
                                tile.dropped = true;
                                className = "+=dropped";
                            }

                            moveBack(tile, className);
                        },
                    });

                    return tile.draggable;
                    ///////

                    function setActive() {
                        if (Draggable.hitTest(clone, scrollBox)) {
                            TweenLite.to(clone, 0.15, {scale: 0.6, autoAlpha: 0.75});
                        } else {
                            TweenLite.to(clone, 0.15, {scale: 1.2, autoAlpha: 0.75});
                        }
                    }

                    function collapseSpace(this: any) {
                        if (!tile.moved) {
                            if (!this.hitTest(wrapper)) {
                                tile.moved = true;
                                TweenLite.to(wrapper, 0.3, { width: 0 });
                            }
                        }
                    }

                    function dropTile(this: any) {
                        let className: string | undefined;
                        if ( this.hitTest(dropPanel, threshold)) {
                            dropPanel.append(wrapper);
                            tile.dropped = true;
                            className = "+=dropped";
                        }

                        if ( this.hitTest(dropPanel2, threshold)) {
                            dropPanel2.append(wrapper);
                            tile.dropped = true;
                            className = "+=dropped";
                        }

                        moveBack(tile, className);
                    }
                }

// MOVE BACK :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                function moveBack(tile: any, className: string | undefined) {

                    const clone   = tile.clone;
                    const element = tile.element;
                    const wrapper = tile.wrapper;

                    // TweenLite.set(wrapper, { width: tile.width });
                    TweenLite.to(wrapper, 0.1, { width: tile.width });
                    setTimeout( () => {
                            TweenLite.to(clone, 0.2, { scale: 1, autoAlpha: 1, x: tile.x, y: tile.y, onComplete: done });
                            if (className) {
                                (TimelineMax as any).to([element, clone], 0.2, {className: `${className}`});
                            }
                            function done() {
                                tile.moved = false;
                                TweenLite.set(clone, { autoAlpha: 0 });
                                TweenLite.set(element, { autoAlpha: 1 });
                            }
                        }, 110);

                    checkCategoryNew(tile);
                }

                function checkCategoryNew(letter: any) {
                    // If different catigory border is red
                    if (Draggable.hitTest(letter.element, dropPanel)) {
                        if (dropPanel.data("id") === letter.element.data("id")) {
                            (TimelineMax as any).set([letter.element, letter.clone], {
                                border: "2px solid green",
                            });
                        } else {
                            (TimelineMax as any).set([letter.element, letter.clone], {
                                border: "2px solid red",
                            });
                        }
                    } else if (Draggable.hitTest(letter.element, dropPanel2)) {
                        if (dropPanel2.data("id") === letter.element.data("id")) {
                            (TimelineMax as any).set([letter.element, letter.clone], {
                                border: "2px solid green",
                            });
                        } else {
                            (TimelineMax as any).set([letter.element, letter.clone], {
                                border: "2px solid red",
                            });
                        }
                    }
                }

// GET POSITION ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                function getPosition(wrapper: any, offset: any) {

                    const position1 = wrapper.offset();
                    const position2 = container.offset();

                    return {
                        x: position1.left - position2.left + offset.left,
                        y: position1.top  - position2.top  + offset.top,
                    };
                }

            } );
        }

    }
</script>


<style scoped lang="scss">
    body {
        background-color: #eee;
        height: 100vh;
        margin: 0;
        position: relative;
        overflow: hidden;
    }

    * {
        box-sizing: border-box;
    }

    main {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        user-select: none;
        margin-top: 60px;
    }

    #top-bar {
        margin: 10px;
        padding: 10px;
        background-color: white;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
        min-height: 300px;
    }
    .left-right-panel {
        display: flex;
        justify-content: space-between;
        h3 {
            margin: 10px;
            text-align: center;
            color: #fff;
            font-size: 22px;

        }
        #drop-panel , #drop-panel2 {
            min-height: 500px;
            width: 300px;
            background: white;
            padding: 10px;
            margin: 10px;
            box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
        }

    }
    .content {
        display: none;
    }

    #scroll-box {
        white-space: nowrap;
        overflow: hidden;
        min-height: 300px;
        width: 410px;
        margin: 0 auto;
    }
    #tile-container {
        display: inline-flex;
        .tile-wrapper {
            width: 410px;
            height: 276px;
            .tile{
                width: 400px;
                height: 266px;
                &.clone {
                    width: 400px;
                    height: 266px;
                }
            }
        }
    }
    #clone-container{
        .tile.clone{
            width: 400px;
            height: 266px;
        }
        .tile.clone.dropped{
            width: 130px!important;
            height: 90px!important;
        }
    }
    #drop-panel, #drop-panel2{
        .tile-wrapper{
            width: 140px!important;
            height: 100px!important;
            .tile.dropped{
                width: 130px!important;
                height: 90px!important;
            }
        }
    }
    .tile-wrapper {
        width: 140px;
        height: 100px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .tile {
        background-color: mediumvioletred;
        background-size: cover!important;
        color: #fafafa;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        position: relative;
        cursor: move;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.5);
        overflow: hidden;

        &.clone {
            position: absolute;
            opacity: 0;
            visibility: hidden;
        }

        &.dropped {
            background: cornflowerblue;
        }
    }


</style>
