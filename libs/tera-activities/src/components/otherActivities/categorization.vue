<template>

    <main>
        <!--<v-btn color="white" class="category-back_button" flat @click.native="$router.go(-1)">-->
            <!--<v-icon>close</v-icon>-->
        <!--</v-btn>-->
        <section id="top-bar" >
            <div id="clone-container">
                <div id="scroll-box">
                    <div id="tile-container">
                        <div class="tile-wrapper" v-for="slide in slides" :key="slide.id">
                            <img  class="tile" :src="getImagePath(slide.media.photo, getMediaTypes.Content)" alt="" :data-id="slide.media.categoryId"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="content" ></section>
        <div  class="left-right-panel">
            <div class="droppane-container">
                <h3>{{dropName}}</h3>
                <div id="drop-panel" :data-id="dropDataId">
                </div>
            </div>
            <div class="droppane-container">
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
    import {ActivityType, MediaType, ImageType} from '@/modules/activities/store/types';
    const timelineMax = TimelineMax as any;

    const  category: string = 'category';

    @Component
    export default class CategorizationView extends BaseComponent {
        @Prop() public slides?: any[];
        @Prop() public categoryTypes?: any[];
        @Prop() public activityType?: number;
        @Prop() public mediaType?: number;
        @Prop() public rigthOrentation?: boolean;

        get dropName(): string {
            return this.categoryTypes && this.categoryTypes[0] && this.categoryTypes[0][category] && this.categoryTypes[0][category]['categoryName'];
        }

        get dropName1(): string {
            return this.categoryTypes && this.categoryTypes[1] && this.categoryTypes[1][category] && this.categoryTypes[1][category]['categoryName'];
        }

        get dropDataId(): number {
            return this.categoryTypes && this.categoryTypes[0] && this.categoryTypes[0][category] && this.categoryTypes[0][category]['categorId'];
        }

        get dropDataId1(): number {
            return this.categoryTypes && this.categoryTypes[0] && this.categoryTypes[0][category] && this.categoryTypes[1][category]['categorId'];
        }
        get getMediaTypes(): any {
            return ImageType;
        }

        public mounted() {
            // set up the layout only after the orientation of the activity is the correct one
            // since we are setting layout in px and not in % - if we will do it in the wrong orientation
            // the layout will be calculated on the wrong orientation...
            if (this.rigthOrentation) {
                this.initializeCategorization();
            }
        }

        public initializeCategorization() {
                const container = $("#clone-container");
                const scrollBox = $("#scroll-box");
                const droppaneContainer: any = document.querySelector('.droppane-container');
                const dropPanel = $("#drop-panel");
                const dropPanel2 = $("#drop-panel2");
                const tiles = $(".tile");
                const threshold = "50%";
                const wrapperOffset = 5;
                const breakpointSize = container && container.width() > 1280 ? 3 : 2;
                const aspectRatio = 1.5;

                // Set Dragge Zone images sizes

                // Get dropezone width
                const width = droppaneContainer ?  droppaneContainer.offsetWidth - 1 : 0;
                // Set element width 50% or 33%
                const wrapperWidth = Math.floor(width / breakpointSize);
                // Set element height relevance of width ratio ( width/height 1.5)
                const wrapperHeight = Math.floor(wrapperWidth / aspectRatio);

                const elementWidth = wrapperWidth - wrapperOffset;
                const elementHeight = wrapperHeight - wrapperOffset;

                // Set Top Pane images sizes

                const wrapperTopHeight = scrollBox.height();
                // Set element width relevance of height ratio ( width/height = 1.5)
                const wrapperTopWidth = wrapperTopHeight * aspectRatio;

                const elementTopHeight = wrapperTopHeight - wrapperOffset;
                const elementTopWidth = wrapperTopWidth - wrapperOffset;

                timelineMax.set("#scroll-box", {width: wrapperTopWidth});
                timelineMax.set(".tile-wrapper", {width: wrapperTopWidth, height: wrapperTopHeight});

                timelineMax.set([".tile-wrapper .tile", ".tile-wrapper .clone"], {width: elementTopWidth, height: elementTopHeight});

                ///////////////////////////////////////////////////////////////

                tiles.each(function(this: any) {

                    const element = $(this);
                    const wrapper = element.parent();
                    const offset = element.position();
                    const scope = {
                        clone: element.clone().addClass("clone").prependTo(container),
                        element,
                        wrapper,
                        width: wrapper.outerWidth(),
                        dropped: false,
                        moved: false,
                        draggable: '',
                        get x() {
                            return getPosition(wrapper, offset).x;
                        },
                        get y() {
                            return getPosition(wrapper, offset).y;
                        },
                    };

                    scope.draggable = createDraggable(scope);

                    element.on("mousedown touchstart", scope, startDraggable);
                });

// START DRAGGABLE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                function startDraggable(event: any) {
                    const tile = event.data;

                    timelineMax.set(tile.element, {autoAlpha: 0});
                    timelineMax.set(tile.clone, {x: tile.x, y: tile.y, autoAlpha: 1});

                    tile.draggable.startDrag(event.originalEvent);
                }

// CREATE DRAGGABLE ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                function createDraggable(tile: any) {
                    const clone = tile.clone;
                    const wrapper = tile.wrapper;

                    tile.draggable = new Draggable(clone, {
                        onPress: setActive,
                        onDrag: collapseSpace,
                        onRelease: dropTile,
                    });

                    return tile.draggable;

                    ///////

                    function setActive() {
                        if (Draggable.hitTest(clone, scrollBox)) {
                            timelineMax.to(clone, 0.15, {scale: 0.6, autoAlpha: 0.75});
                        } else {
                            timelineMax.to(clone, 0.15, {scale: 1.2, autoAlpha: 0.75});
                        }
                    }

                    function collapseSpace(this: any) {
                        if (this.hitTest(dropPanel, threshold)) {
                            timelineMax.set(dropPanel, {className: "+=highlight"});
                        } else if (this.hitTest(dropPanel2, threshold)) {
                            timelineMax.set(dropPanel2, {className: "+=highlight"});
                        } else {
                            timelineMax.set([dropPanel, dropPanel2], {className: "-=highlight"});
                        }

                        if (!tile.moved) {
                            if (!this.hitTest(wrapper)) {
                                tile.moved = true;
                                timelineMax.to(wrapper, 0.3, {width: 0});
                            }
                        }

                    }

                    function dropTile(this: any) {
                        let className;
                        if (this.hitTest(dropPanel, threshold)) {
                            dropPanel.append(wrapper);
                            tile.dropped = true;
                            className = "+=dropped";
                        }

                        if (this.hitTest(dropPanel2, threshold)) {
                            dropPanel2.append(wrapper);
                            tile.dropped = true;
                            className = "+=dropped";
                        }

                        moveBack(tile, className);
                        timelineMax.set([dropPanel, dropPanel2], {className: "-=highlight"});
                    }
                }

// MOVE BACK :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                function moveBack(tile: any, className: string | any) {
                    const clone = tile.clone;
                    const element = tile.element;
                    const wrapper = tile.wrapper;

                    if (className) {
                        timelineMax.set(wrapper, {width: wrapperWidth, height: wrapperHeight});
                        timelineMax.set(element, {autoAlpha: 0, width: 0, height: elementHeight});
                        setTimeout(() => {
                                timelineMax.to(clone, 0.3, {
                                    width: elementWidth,
                                    height: elementHeight,
                                    scale: 1,
                                    autoAlpha: 1,
                                    x: tile.x,
                                    y: tile.y,
                                    onComplete: done,
                                });

                                function done() {
                                    tile.moved = false;
                                    timelineMax.set(clone, {
                                        autoAlpha: 0,
                                        width: elementWidth,
                                        height: elementHeight,
                                    });
                                    timelineMax.set(element, {
                                        autoAlpha: 1,
                                        width: elementWidth,
                                        height: elementHeight,
                                    });
                                }
                            }
                            , 110);
                    } else {
                        timelineMax.to(wrapper, 0.1, {width: tile.dropped ? wrapperWidth :  tile.width});
                        setTimeout(() => {
                            timelineMax.to(clone, 0.3, {
                                scale: 1,
                                autoAlpha: 1,
                                x: tile.x,
                                y: tile.y,
                                onComplete: done,
                            });

                            function done() {
                                tile.moved = false;
                                timelineMax.set(clone, {autoAlpha: 0});
                                timelineMax.set(element, {autoAlpha: 1});
                            }
                        }, 110);
                    }

                    checkCategoryNew(tile);
                }

                function checkCategoryNew(letter: any) {
                    // If different catigory border is red
                    if (Draggable.hitTest(letter.element, dropPanel)) {
                        if (dropPanel.data("id") === letter.element.data("id")) {
                            timelineMax.set([letter.element, letter.clone], {className: "+=greenBorder"});
                            timelineMax.set([letter.element, letter.clone], {className: "-=redBorder"});

                        } else {
                            timelineMax.set([letter.element, letter.clone], {className: "+=redBorder"});
                            timelineMax.set([letter.element, letter.clone], {className: "-=greenBorder"});
                        }
                    } else if (Draggable.hitTest(letter.element, dropPanel2)) {
                        if (dropPanel2.data("id") === letter.element.data("id")) {
                            timelineMax.set([letter.element, letter.clone], {className: "+=greenBorder"});
                            timelineMax.set([letter.element, letter.clone], {className: "-=redBorder"});
                        } else {
                            timelineMax.set([letter.element, letter.clone], {className: "+=redBorder"});
                            timelineMax.set([letter.element, letter.clone], {className: "-=greenBorder"});
                        }
                    }
                }

// GET POSITION ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                function getPosition(wrapper: any, offset: any) {
                    const position1 = wrapper.offset();
                    const position2 = container.offset();

                    return {
                        x: position1.left - position2.left + offset.left,
                        y: position1.top - position2.top + offset.top,
                    };
                }

        }

    }
</script>


<style scoped lang="scss">

    main {
       height: 100vh;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        user-select: none;
        overflow: hidden;
        /*margin-top: 48px;*/
    }

    .clone-container {
        height:100%;
    }

    #top-bar {
        background-color: black;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
        min-height: 300px;
        max-height: 600px;
        height: 33vh;
    }

   .droppane-container{
        width:40%;
       min-width: 290px;
        max-width: 600px;
    }

    $right-left-panels-text-height: 34;
    $right-left-panels-text-vertical-margins: 8.5;
    $right-left-panels-calculated-height: $right-left-panels-text-height + $right-left-panels-text-vertical-margins + $right-left-panels-text-vertical-margins + px;

    .left-right-panel {
        height: calc(100% - 33%) ;
        display: flex;
        justify-content: space-between;
        padding: 0 5px 5px 5px;
        h3 {
            height : $right-left-panels-text-height  + px;
            margin: $right-left-panels-text-vertical-margins + px 10px;
            text-align: center;
            color: #fff;
            font-size: 22px;

        }
        #drop-panel, #drop-panel2 {
            height: calc(100% -  #{$right-left-panels-calculated-height} );
            width: 100%;
            max-width: 600px;
            min-width: 290px;
            background: white;
            box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
        }

    }

    .content {
        display: none;
    }

    #scroll-box {
        white-space: nowrap;
        overflow: hidden;
        min-height: 276px;
        height: 31vh;
        margin: 0 auto;
    }

    #tile-container {
        display: inline-flex;
    }

    .tile-wrapper {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .tile {
        background-size: cover;
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

    .greenBorder {
        border: solid 2px green;
    }

    .redBorder {
        border: solid 2px red;
    }

    .highlight{
        background: #cecece !important;
        -webkit-box-shadow: inset 0px 0px 17px 0px rgba(0,0,0,0.44)!important;
        -moz-box-shadow: inset 0px 0px 17px 0px rgba(0,0,0,0.44)!important;
        box-shadow: inset 0px 0px 17px 0px rgba(0,0,0,0.44)!important;
        transition: background-color 0.5s ease;
    }

    .category-back_button{
        z-index: 100000;
        right: 10px;
        top: 10px;
        position: absolute;
        min-width: auto;
        height: auto;
        padding: 2px;
        border-radius: 50%;
    }

</style>
