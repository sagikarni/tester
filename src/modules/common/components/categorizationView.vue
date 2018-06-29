<template>
    <main>
        <div class="bounds"></div>
        <div class="pool_wrapper">
            <div id="pool" class="zone">
                <div v-for="slide in slides" :key="slide.id" class="tile image_wrapper"
                     :data-id="slide.media.categoryId" :style="`background-image: url( ${slide.media.photo}  )`">
                </div>
            </div>
        </div>

        <div class="wrap-els" style="width: 100%; padding: 25px 0 "></div>
        <div id="drop" class="zone" :data-id="dropDataId">
            <h3>{{dropName}}</h3>
        </div>
        <div id="drop1" class="zone" :data-id="dropDataId1">
            <h3>{{dropName1}}</h3>
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

        public tiles: any;
        public pool: any;
        public drop: any;
        public drop1: any;
        public height: number = 0;
        public width: number = 0;
        public margin: number = 50;
        public gutter: number = 15;

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

        public moveTile(index: number, tile: any, tween: any) {
            tile = $(tile);
            tile.data("index", index);

            if (tile.hasClass("dragging")) {
                this.checkCategory(tile);
                return;
            }
            tile.addClass("moving");
            const tileHeight = tile.outerHeight();
            const tileWidth = tile.outerWidth();
            const secontColIndex = index > 3 ? 4 : 0;

            (TimelineMax as any).to(tile, 0.25, {
                x: index > 3 ? 25 + tileWidth + this.gutter : 25,
                y: this.margin + (index - secontColIndex) * this.gutter + ((index - secontColIndex) * tileHeight),
                touchAction: 'none',
                userSelect: 'none',
                pointerEvents: 'auto',
                width: 130,
                height: 90,
                onComplete: () => {
                    tile.removeClass("moving");
                },
            });
        }

        public moveTilePool(index: number, tile: any, tween: any) {
            tile = $(tile);
            tile.data("index", index);

            if (tile.hasClass("dragging")) {
                return;
            }
            tile.addClass("moving");
            const yAxis = index === 0 ? this.margin + this.gutter : this.margin - this.gutter - this.height * index;

            (TimelineMax as any).to(tile, 0.25, {
                x: 25,
                y: yAxis,
                width: this.width,
                borderColor: 'none',
                display: 'block',
                pointerEvents: index !== 0 ? 'none' : 'auto',
                onComplete: () => {
                    (TimelineMax as any).to(tile, 0, {
                        height: index === 1 ?  this.height * 0.1 : this.height,
                    });
                    tile.removeClass("moving");
                },
            });
        }

        public changePosition(tile1: any, tile2: any) {
            tile1 = $(tile1);
            tile2 = $(tile2);

            // Changes tiles position on the DOM which is used to
            // index and find the position to move to
            tile1.data("index") > tile2.data("index")
                ? tile1.insertBefore(tile2)
                : tile1.insertAfter(tile2);
        }

        public reorderTiles(dragging: boolean) {
            const query = dragging ? ".tile:not(.dragging)" : ".tile";
            this.pool.children(query).each(this.moveTilePool);
            this.drop.children(query).each(this.moveTile);
            this.drop1.children(query).each(this.moveTile);
        }

        public hitTest(tile: any) {
            let target;

            // Hit test tiles that aren't moving or being dragged
            $(".tile:not(.dragging, .moving)").each( (i: number, element: any) => {
                if (Draggable.hitTest(tile, element)) {
                    target = element;
                    return false;
                }
            });

            if (target) {
                this.changePosition(tile, target);
            }
            return target;
        }

        public getZone(tile: any) {
            // Returns the zone the tile is in
            const zone = Draggable.hitTest(tile, this.pool)
                ? this.pool : Draggable.hitTest(tile, this.drop)
                    ? this.drop : Draggable.hitTest(tile, this.drop1)
                        ? this.drop1 : null;
            return zone;
        }

        public checkCategory(tile: any) {

            // If different catigory border is red
            if (Draggable.hitTest(tile, this.drop)) {
                if (this.drop.data("id") === tile.data("id")) {
                    (TimelineMax as any).set(tile, {
                        border: "2px solid green",
                    });
                } else {
                    (TimelineMax as any).set(tile, {
                        border: "2px solid red",
                    });
                }
            } else if (Draggable.hitTest(tile, this.drop1)) {
                if (this.drop1.data("id") === tile.data("id")) {
                    (TimelineMax as any).set(tile, {
                        border: "2px solid green",
                    });
                } else {
                    (TimelineMax as any).set(tile, {
                        border: "2px solid red",
                    });
                }
            }

        }

        public changeZone(tile: any, zone: any) {
            // Change tile's data for zone
            tile.data("zone", zone);

            // Find position of tile and zone
            const rect1 = tile[0].getBoundingClientRect();
            const rect2 = zone[0].getBoundingClientRect();

            zone.append(tile);

            // Update tile with new coords
            (TimelineMax as any).set(tile, {
                x: rect1.left - rect2.left,
                y: rect1.top - rect2.top,
            });
        }

        public created() {

            this.$nextTick(() => {
                this.tiles = $(".tile");
                this.pool = $("#pool");
                this.drop = $("#drop");
                this.drop1 = $("#drop1");

                this.height = 266;
                this.width = 400;
                const elem = this;

                (TimelineMax as any).set('#drop', {height: window.innerHeight - 460});
                (TimelineMax as any).set('#drop1', {height: window.innerHeight - 460});


                this.tiles.each((i: number, tile: any) => {

                    // Setup tiles with some data
                    tile = $(tile);
                    tile.data({index: i, zone: this.pool});

                    const yAxis = i === 0 ? this.margin + this.gutter : this.margin - this.gutter - this.height * i;
                    (TimelineMax as any).set(tile, {
                        x: 25,
                        y: yAxis,
                        height: i === 1 ?  this.height * 0.1 : this.height,
                        width: this.width,
                        display: i > 1 ? 'none' : 'bolck',
                        pointerEvents: i !== 0 ? 'none' : 'auto',
                    });
                });
               Draggable.create( this.tiles, {
                    bounds: "#app",
                    onDrag: function(event: any) {
                        const tile = $(this.target);
                        const zone = elem.getZone(tile);
                        // Tile is not in the zone it started from
                        if (zone && zone !== tile.data("zone")) {

                            // Stop the draggable so the position doesn't
                            // get messed up when appeneding tile to new zone
                            this.endDrag(event);
                            elem.changeZone(tile, zone);

                            // Change tile's data for zone
                            tile.data("zone", zone);

                            // Find position of tile and zone
                            const rect1 = tile[0].getBoundingClientRect();
                            const rect2 = zone[0].getBoundingClientRect();

                            zone.append(tile);

                            // Update tile with new coords
                            (TimelineMax as any).set(tile, {
                                x: rect1.left - rect2.left,
                                y: rect1.top - rect2.top,
                            });
                            this.startDrag(event);
                        }

                        // Reorder tiles. True parameter tells it to ignore
                        // tiles that are being dragged
                        if (!zone) {
                            elem.reorderTiles(true);
                        }
                        if (elem.hitTest(tile)) {
                             elem.reorderTiles(false);
                        }

                    },
                    onDragEnd: function() {
                        const tile = $(this.target);
                        const zone = elem.getZone(tile);

                        if (zone && zone !== tile.data("zone")) {
                            elem.changeZone(tile, zone);
                        }

                        $(this.target).removeClass("dragging");
                        elem.hitTest(this.target);
                        elem.reorderTiles(false);
                        elem.checkCategory(tile);
                    },
                    onDragStart: function() {
                        $(this.target).addClass("dragging");
                    },
                    onPress: function() {
                        (TimelineMax as any).to(this.target, 0.3, {opacity: 0.75, scale: 0.9});
                    },
                    onRelease: function() {
                        elem.hitTest(this.target);
                        elem.reorderTiles(false);
                        (TimelineMax as any).to(this.target, 0.3, {opacity: 1, scale: 1});
                    },
                });

            });
        }

    }
</script>


<style scoped lang="scss">

    body {
        overflow: hidden;
        background-color: #eee;
    }

    * {
        box-sizing: border-box;
    }

    .bounds {
        position: absolute;
        top: 0;
        left: 0;
        margin: 10px;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
    }

    main {
        height: 100vh;
        padding: 10px;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: flex-start;
        align-items: flex-start;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .zone {
        position: relative;
        background-color: #fafafa;
        min-width: 300px;
        height: 100%;
        border: 1px solid #aaa;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
    }

    #pool {
        /*overflow-x: scroll;*/
        flex: 1 1 auto;
        display: inline-block;
        width: 450px;
        height: 400px;
        border: none;
        box-shadow: none;
        background-color: white;
        /*margin-bottom: 50px;*/
        .image_wrapper {
            background-size: cover;
            &:nth-child(2) {
                /*height: 10%!important;*/
                top:unset;
                bottom: 112px;
            }
        }
    }

    #drop {
        max-width: 330px;
        min-width: 330px;
    }

    #drop1 {
        @extend #drop;
    }

    .tile {
        position: absolute;
        text-align: center;
        width: 130px;
        height: 90px;
        top: 0;
        left: 0;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.5);
        background-size: cover;
    }

    h3 {
        color: #ffffff;
        top:-40px;
        position: relative;
        z-index: 9999999;
        pointer-events: none;
    }
    .pool_wrapper{
        width: 100%;
        display: block;
        text-align: center;
        background-color: white;
    }

</style>
