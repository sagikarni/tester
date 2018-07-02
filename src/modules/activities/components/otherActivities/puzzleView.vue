<template>
<div class="puzzel-wrapper">
    <section class="container">

        <div class="list-item" id="alpha">
            <div class="item-content" style='background-image: url("/media/restricted/cognitive/photos/puzzles/puzzle-1/content/puzzle-1/parts/1.jpeg")'>
                <span class="order">1</span> Alpha
            </div>
        </div>

        <div class="list-item" id="bravo">
            <div class="item-content" style='background-image: url("/media/restricted/cognitive/photos/puzzles/puzzle-1/content/puzzle-1/parts/2.jpeg")'>
                <span class="order">2</span> Bravo
            </div>
        </div>

        <div class="list-item" id="charlie">
            <div class="item-content" style='background-image: url("/media/restricted/cognitive/photos/puzzles/puzzle-1/content/puzzle-1/parts/3.jpeg")'>
                <span class="order">3</span> Charlie
            </div>
        </div>

        <div class="list-item" id="delta">
            <div class="item-content" style='background-image: url("/media/restricted/cognitive/photos/puzzles/puzzle-1/content/puzzle-1/parts/4.jpeg")'>
                <span class="order">4</span> Delta
            </div>
        </div>

        <div class="list-item" id="echo">
            <div class="item-content" style='background-image: url("/media/restricted/cognitive/photos/puzzles/puzzle-1/content/puzzle-1/parts/5.jpeg")'>
                <span class="order">5</span> Echo
            </div>
        </div>

        <div class="list-item" id="foxtrot">
            <div class="item-content" style='background-image: url("/media/restricted/cognitive/photos/puzzles/puzzle-1/content/puzzle-1/parts/6.jpeg")'>
                <span class="order">6</span> Foxtrot
            </div>
        </div>

        <div class="list-item" id="gulf">
            <div class="item-content" style='background-image: url("/media/restricted/cognitive/photos/puzzles/puzzle-1/content/puzzle-1/parts/7.jpeg")'>
                <span class="order">7</span> Gulf
            </div>
        </div>

        <div class="list-item" id="hotel">
            <div class="item-content" style='background-image: url("/media/restricted/cognitive/photos/puzzles/puzzle-1/content/puzzle-1/parts/8.jpeg")'>
                <span class="order">8</span> Hotel
            </div>
        </div>

        <div class="list-item" id="india">
            <div class="item-content" style='background-image: url("/media/restricted/cognitive/photos/puzzles/puzzle-1/content/puzzle-1/parts/9.jpeg")'>
                <span class="order">9</span> India
            </div>
        </div>

    </section>
</div>

</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';

    @Component
    export default class PuzzleView extends BaseComponent {
        @Prop() public images?: object[];
     }
</script>

<style scoped lang="scss">

.puzzel-wrapper {
    padding: 15px 30px;
}


*, *:before, *:after {
    box-sizing: border-box;
}

.container {
    position: relative;
    /*top: 50%;*/
    /*left: 50%;*/
    width: 750px;
    height: 450px;
    opacity: 0;
    visibility: hidden;
    /*transform: translate(-50%, -50%);*/
    cursor: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/cursor.png),move;
    cursor: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/cursor.png) 32 32,move;
}

.list-item {
    position: absolute;
    top: 0;
    left: 0;
    height: 140px;
    width: 240px;
}

.item-content {
    background-size: cover;
    height: 100%;
    border: 0px solid rgba(123, 123, 123, 0.498039);
    border-radius: 4px;
    color: rgb(153, 153, 153);
    line-height: 140px;
    /*padding-left: 32px;*/
    font-size: 24px;
    font-weight: 400;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0,0,0,0.2) 0px 1px 2px 0px;
}



</style>

