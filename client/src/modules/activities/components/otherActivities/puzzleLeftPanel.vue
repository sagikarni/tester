<template>
    <div class="sllider-wrapper">
        <div v-for="image in images" :key="image.id">
            <div :class="['cell', image.id === 0 ? 'active' : '']" @click="changePuzzle($event)"
                 :style="`height: ${itemHeight}px`"
                 :data-count="image.media.partsCount" :data-url="image.media.photo" :data-id="image.id">
                <img :src="getImagePath(image.media.photo, getMediaTypes.Content)"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import { ImageType} from '@/modules/activities/store/types';
    import $ from 'jquery';
    import TimelineMax from 'gsap';
    const timeLineMax = TimelineMax as any;



    @Component
    export default class PuzzleLeftPanel extends BaseComponent {
        @Prop() public images?: object[];
        @Prop() public aspectRatio?: number;
        @Prop() public rigthOrentation?: boolean;

        public itemHeight: number = 0;

        get getMediaTypes(): any {
            return ImageType;
        }


        public mounted() {
            if (this.rigthOrentation) {
                this.initializePuzzleLeftPanel();
            }
        }

        public initializePuzzleLeftPanel() {
            const elem: any = document.querySelector('.cell');
            const width = elem && elem.offsetWidth;
            if (this.aspectRatio) {
                this.itemHeight = width / this.aspectRatio;
            }
        }

        public changePuzzle(event: any) {
            $('.sllider-wrapper').animate({
                scrollTop:$('.sllider-wrapper').scrollTop() + $(event.target).position().top
            },1000);
            if (!event.currentTarget.classList.contains('active')) {
                timeLineMax.set($('.active'), {
                    className: "-=active",
                    onComplete: () => {
                        timeLineMax.set(event.target, {className: "+=active"});
                        this.$emit('getPuzzleData', {
                            url: $(event.target).data('url'),
                            count: $(event.target).data('count'),
                            id: $(event.target).data('id'),
                        });
                    },
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .sllider-wrapper {
        height: calc(100vh - 60px);
        overflow-y: scroll;
        overflow-x: hidden;
        .cell {
            width: 90%;
            margin: 0px 15px 5px 15px;
            /*border: 1px solid #4c6cff;*/
            position: relative;
            &:after {
                content: "";
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.67);
            }
            img {
                height: 100%;
                width: 100%;
                object-fit: fill;
            }
            &.active {
                border: 1px solid transparent;
                &:after {
                    display: none;
                }
            }
        }
    }
</style>
