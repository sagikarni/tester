<template>
    <main>
        <section id="top-bar" drop-zone="main" data-sorted="true">
            <div id="clone-container" class="clone-container">
                <div id="scroll-box">
                    <div id="tile-container" class="letter-container">

                        <div class="tile-wrapper" v-for="slide in slides" :key="slide.id">
                            <div class="tile" :data-id="slide.media.categoryId" :style="`background-image: url( ${slide.media.photo}  )`"></div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        <div class="left-right-panel">
            <section class="content-puzzel-left left-pane">
                <div class="category-title">{{dropName}}</div>
                <div id="center-panel" drop-zone="center" :data-id="dropDataId">

                    <div class="clone-container">
                        <div class="letter-container"></div>
                    </div>
                </div>
            </section>

            <section class="right-pane" id="bottom-panel" drop-zone="bottom" data-sorted="true" :data-id="dropDataId1">
                <div class="category-title">{{dropName1}}</div>
                <div class="clone-container">
                    <div class="letter-container"></div>
                </div>
            </section>
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
        public margin: number = 30;
        public gutter: number = 10;

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


       public draggAndDrop(){
           this.$nextTick( () => {
               const threshold = "60%";
               const dropZones: any = {main: ''};
               const letters: any[]   = [];

               const bottomPanel = $('#bottom-panel');
               const centerPanel = $('#center-panel');
               const topBar      = $('#top-bar');

               (TimelineMax as any).set(bottomPanel, {height: window.innerHeight - 540});
               (TimelineMax as any).set(centerPanel, {height: window.innerHeight - 560});

               $("[drop-zone]").each(function(this: void) {

                   const self: any = this;
                   const zone: any = $(self);
                   const name = zone.attr("drop-zone");

                   dropZones[name] = {
                       element : zone,
                       name    : name,
                       sorted  : zone.data("sorted"),
                       clones  : zone.find(".clone-container"),
                       letters : zone.find(".letter-container")
                   };
               });

               $(".tile").each(function( this: any, index: number) {

                   const element: any = $(this);
                   const wrapper = element.parent();
                   const offset  = element.position();
                   const zone    = dropZones.main;
                   const scope = {
                       clone   : element.clone().attr("clone", "").prependTo(zone.clones),
                       element : element,
                       wrapper : wrapper,
                       width   : wrapper.outerWidth(),
                       height  : wrapper.outerHeight(),
                       moved   : false,
                       index   : index,
                       zone    : zone,
                       draggable: '',
                       get x() { return getPosition(wrapper, this.zone.clones, offset).x; },
                       get y() { return getPosition(wrapper, this.zone.clones, offset).y; },
                       get cloneX() { return getPosition(this.clone, this.zone.clones, null).x; },
                       get cloneY() { return getPosition(this.clone, this.zone.clones, null).y; },
                       get previous() { return getPrevious(this, this.zone); }
                   };

                   scope.draggable = createDraggable(scope);

                   // reversed order
                   letters.unshift(scope);

                   element.on("mousedown touchstart", scope, startDraggable);
               });



               // GET PREVIOUS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
               function getPrevious(letter: any, zone: any) {

                   if (!zone.sorted) {
                       return { target: zone.letters, insert: "appendTo"};
                   }

                   const values = letters.filter((value) => {
                       return value.zone === letter.zone && value.index < letter.index;
                   });

                   return {
                       target: values[0] ? values[0].wrapper : zone.letters,
                       insert: values[0] ? "insertAfter" : "prependTo"
                   };
               }


               // START DRAGGABLE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
               function startDraggable(event: any) {

                   const letter = event.data;

                   // Maak element onzichtbaar
                   // Maak kloon zichtbaar en verplaats deze naar de coordinaten van het element
                   (TimelineMax as any).set(letter.element, { autoAlpha: 0 });
                   (TimelineMax as any).set(letter.clone, { x: letter.x, y: letter.y, autoAlpha: 1 });

                   letter.draggable.startDrag(event.originalEvent);
               }


// CREATE DRAGGABLE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
               function createDraggable(letter: any) {

                   const clone   = letter.clone;
                   const wrapper = letter.wrapper;

                   letter.draggable = new Draggable(clone, {
                       onPress   : setActive,
                       onDrag    : collapseSpace,
                       onRelease : dropTile
                   });

                   return letter.draggable;
                   ///////

                   function setActive() {
                       (TimelineMax as any).to(clone, 0.15, { scale: Draggable.hitTest(clone, bottomPanel) || Draggable.hitTest(clone, centerPanel) ? 1 : 0.65, autoAlpha: 0.75 });
                   }

                   function collapseSpace(this: void) {
                       var self: any = this;
                       if (!letter.moved) {
                           if (!self.hitTest(wrapper)) {
                               letter.moved = true;
                               (TimelineMax as any).to(wrapper, 0.3, { width: 0, height: 0 });
                           }
                       }
                   }

                   function dropTile(this: void) {

                       var name = undefined;
                       const self: any = this;

                       $.each(dropZones, function(key: number, zone: any) {

                           if (self.hitTest(zone.element, threshold) && letter.zone !== zone) {

                               name = "tile " + zone.name;
                               letter.zone = zone;

                               // Get the previous element and the insert method
                               const previous = letter.previous;
                               wrapper[previous.insert](previous.target);

                               // Position the clone inside its new container
                               (TimelineMax as any).set(clone, { x: letter.cloneX, y: letter.cloneY });
                               zone.clones.prepend(clone);
                           }
                       });

                       moveBack(letter, name);
                   }
               }

// MOVE BACK ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
               function moveBack(letter: any, className: string | undefined) {

                   const clone   = letter.clone;
                   const element = letter.element;
                   const wrapper = letter.wrapper;

                   (TimelineMax as any).to(wrapper, 0.2, { width: letter.width, height: letter.height });

                   const scale = Draggable.hitTest(element, bottomPanel) || Draggable.hitTest(element, centerPanel) ? 1 : 1;

                   (TimelineMax as any).to(clone, 0.3, { scale: scale, autoAlpha: 1, x: letter.x, y: letter.y, onComplete: done, delay: 0.02 });

                   if (className){
                       (TimelineMax as any).to([element, clone], 0.3, { className: className });
                   }

                   function done() {
                       letter.moved = false;
                       (TimelineMax as any).set(clone, { autoAlpha: 0 });
                       (TimelineMax as any).set(element, { autoAlpha: 1 });
                   }
                   checkCategoryNew(letter);
               }

// GET POSITION :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
               function getPosition(target1: any, target2: any, offset: any) {

                   const position1 = target1.offset();
                   const position2 = target2.offset();

                   offset = offset || { left: 0, top: 0 };

                   return {
                       x: position1.left - position2.left + offset.left,
                       y: position1.top  - position2.top  + offset.top,
                   };
               }

               function checkCategoryNew(letter: any) {
                   // If different catigory border is red
                   if (Draggable.hitTest(letter.element, bottomPanel)) {
                       if (bottomPanel.data("id") === letter.element.data("id")) {
                           (TimelineMax as any).set([letter.element, letter.clone], {
                               border: "2px solid green",
                           });
                       } else {
                           (TimelineMax as any).set([letter.element, letter.clone], {
                               border: "2px solid red",
                           });
                       }
                   } else if (Draggable.hitTest(letter.element, centerPanel)) {
                       if (centerPanel.data("id") === letter.element.data("id")) {
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
    height: 100%;
    display: flex;
    flex-direction: column;
    user-select: none;
    margin-top: 60px;
}
.left-right-panel {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    .right-pane {
        min-height: 500px;
        max-width: 305px;
        min-width: 305px;
        position: relative;

    }
    .left-pane{
        max-width: 305px;
        min-width: 305px;
        min-height: 500px;
        background: white;
        padding: 10px;
        display: block;
        margin: 10px;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
        position: relative;
    }
    .category-title {
        position: absolute;
        background: black;
        color: #fff;
        font-size: 22px;
        left: 50%;
        top: -40px;
        transform: translateX(-50%);
    }
    .clone-container {
        padding-top: 10px;
    }
}
#clone-container {
    width: 410px;
    margin: 0 auto;
}
#top-bar {
    margin: 10px;
    padding: 10px;
    background-color: white;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
    min-height: 119px;
    .tile-wrapper {
        width: 410px!important;
        height: 256px!important;
    }
}

#center-panel {
    background: white;
    width: 100%;
    height: 100%;
    .tile-wrapper {
        width: 140px!important;
        height: 100px!important;
    }

}

.content-puzzel-left {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
}


#bottom-panel {
    background: white;
    padding: 10px;
    display: block;
    min-height: 180px;
    margin: 10px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
    .tile-wrapper {
        width: 140px!important;
        height: 100px!important;
    }
}

#scroll-box {
    min-height: 300px;
    white-space: nowrap;
    overflow-x: hidden;
}

#scroll-box .letter-container {
    display: inline-flex;
    flex-wrap: nowrap;
}

.letter-container {
    display: block;
    display: flex;
    flex-wrap: wrap;
}

.tile-wrapper {
    width: 410px;
    height: 256px;
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
    .tile.main {
        border: none!important;
    }
}

.tile {
    background-size: cover;
    color: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    position: relative;
    width: 400px;
    height: 266px;
    cursor: move;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.5);
    overflow: hidden;
}

.tile[clone] {
    background-size: cover;
    position: absolute;
    visibility: hidden;
    opacity: 0;
}

.tile.bottom {
    width: 130px!important;
    height: 90px!important;
    background-size: cover!important;
    background: cornflowerblue;
}

.tile.center {
    width: 130px!important;
    height: 90px!important;
    background-size: cover;
    background-color: seagreen;
}

</style>
