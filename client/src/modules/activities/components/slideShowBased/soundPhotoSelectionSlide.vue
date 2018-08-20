<template>
    <div>
        <div class="full-height table">
            <div class="row">
                <div class="cell">
                    <img class="object-fit_contain fourCell" data-id='1' @click="checkIndex($event)"
                         :src="getImagePath(parameter.photos[0], getMediaTypes.Content )"/>
                    <img class="object-fit_contain fourCell" data-id='2' @click="checkIndex($event)"
                         :src="getImagePath(parameter.photos[1], getMediaTypes.Content )"/>
                </div>
            </div>
            <audio :src="getImagePath(this.parameter.sound)" :ref="`audio_id_${audioIndex}`"></audio>
            <div class="speaker-container">
                <div class="speaker-wrapper"><div @click="playSound" class="speaker stop"></div></div>
            </div>
            <div class="row">
                <div class=" cell">
                    <img class="object-fit_contain fourCell" data-id='3' @click="checkIndex($event)"
                         :src="getImagePath(parameter.photos[2], getMediaTypes.Content )"/>
                    <img class="object-fit_contain fourCell" data-id='4' @click="checkIndex($event)"
                         :src="getImagePath(parameter.photos[3], getMediaTypes.Content )"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Watch} from 'vue-property-decorator';
    import SlideBase from '@/modules/activities/components/slideShowBased/slideBase.vue';
    import {PremiumCollectionLayout, ImageType} from '@/modules/activities/store/types';
    import TimelineMax from 'gsap';

    const timeLineMax = TimelineMax as any;

    @Component
    export default class SoundPhotoSelectionSlide extends SlideBase {
        @Prop() public parameter?: any;
        @Prop() public slideIndex?: number;
        public audioObj: any;
        public ifSoundPlayed: boolean = false;
        public play: boolean = false;
        public setTime: any;

        public mounted() {
            const name = `audio_id_${this.audioIndex}`;
            this.audioObj = this.$refs[name];
        }

        get getMediaTypes(): any {
            return ImageType;
        }

        get audioIndex(): number | undefined {
            return this.slideIndex;
        }

        public playSound() {
            if (!this.play) {
                this.audioObj.play();
                this.ifSoundPlayed = true;
                this.play = true;
                timeLineMax.set('.speaker', { className: "-=stop"});
                const duration = (this.audioObj.duration - this.audioObj.currentTime) * 1000;
                this.setTime = setTimeout(() => {
                    this.play = false;
                    timeLineMax.set('.speaker', { className: "+=stop"});
                }, duration);
            } else {
                this.audioObj.pause();
                this.play = false;
                timeLineMax.set('.speaker', { className: "+=stop"});
                clearTimeout(this.setTime);
            }
        }

        public stopSound() {
            this.audioObj.pause();
            this.audioObj.currentTime = 0;
            this.play = false;
            timeLineMax.set('.speaker', { className: "+=stop"});
            clearTimeout(this.setTime);
        }

        public checkIndex(event: any) {
            if (this.ifSoundPlayed) {
                if (event.target.classList.contains("clicked")) {
                    timeLineMax.to('.fourCell', 0.2, {filter: 'brightness(1)', className: "-=clicked"});
                } else {
                    timeLineMax.to('.fourCell', 0.2, {filter: 'brightness(0.5)', className: "-=clicked"});
                    timeLineMax.to(event.target, 0.2, {filter: 'brightness(1)', className: "+=clicked"});
                }
            }

            if (this.parameter.correctPhotoIndex === Number(event.target.getAttribute('data-id')) ) {
                timeLineMax.set('.fourCell', { className: "object-fit_contain fourCell"});
                timeLineMax.set(event.target, { className: "+=greenBorder"});
            } else {
                timeLineMax.set('.fourCell', { className: "object-fit_contain fourCell"});
                timeLineMax.set(event.target, { className: "+=redBorder"});
            }

        }

    }
</script>

<style scoped lang="scss">
    .object-fit_contain {
        object-fit: contain
    }

    .full-height {
        height: 100%;
        background: #F8F8F8;
    }

    .full-height.two {
        background: #ACACAC;
    }

    .full-height.three {
        background: #5E5E5E;
    }

    .table {
        display: table;
        width: 100%;
        position: relative;
        background: transparent !important;
    }

    .cell {
        display: table-cell;
        vertical-align: middle;
        width: 100%;
        margin: 0 auto;
        height: 100%;
        text-align: center;
    }

    .row {
        display: table-row;
        width: auto;
    }

    .fourCell {
        width: calc(50% - 60px);
        margin: 5px 5px 0 5px;
        background-color: white;
        border: solid 2px transparent;
        -webkit-filter: brightness(1);
        filter: brightness(1);
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        transition: all 0.3s ease;
        -webkit-transition: all 0.3s ease;
    }

    .twoCell {
        background-color: white;
        width: calc(100% - 40px);
        margin: 5px 5px
    }

    .sound-up {
        color: white !important;
        position: absolute;
        z-index: 9999;
        font-size: 150px;
        cursor: pointer;
        padding: 10px;
        border-radius: 50%;
        background-color: black;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .snack-bar {
        z-index: 9999;
    }

    .greenBorder {
        border: solid 2px green!important;
    }

    .redBorder {
        border: solid 2px red!important;
    }

    .nonBorder {
        border: none;
    }

    .speaker-container {
        position: absolute;
        width: 140px;
        height: 140px;
        background-color: #000000;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
    }
    .speaker-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .speaker {
        border-width: 15px 26px 15px 0;
        height: 50px;
        position: relative;
        border-top-right-radius: 10px 50px;
        border-bottom-right-radius: 10px 50px;
    }
    .speaker, .speaker:before, .speaker:after {
        border-color: transparent #ffffff transparent transparent;
    }
    .speaker, .speaker:before {
        border-style: solid;
        width: 0;
    }
    .speaker:before, .speaker:after {
        content: "";
        position: absolute;
    }
    .speaker:before {
        right: 0;
        bottom: 0;
        height: 40px;
        border-width: 5px 40px 5px 0;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }
    .speaker:after {
        height: 50px;
        width: 30px;
        left: -7px;
        top: -20px;
        border-radius: 50%;
        border-style: double;
        border-width: 20px;
        -webkit-animation: play 0.3s infinite alternate linear;
        -moz-animation: play 0.3s infinite alternate linear;
        animation: play 0.3s infinite alternate linear;
    }


    .stop:after {
        @extend .speaker:after;
        -webkit-animation: play 0.9s 1 alternate linear;
        -moz-animation: play 0.9s 1 alternate linear;
        animation: play 0.9s 1 alternate linear;
    }


    @-webkit-keyframes play {
        from {
            -webkit-transform: scale(1);
        }
        to {
            -webkit-transform: scale(1.1);
        }
    }
    @-moz-keyframes play {
        from {
            -moz-transform: scale(1);
        }
        to {
            -moz-transform: scale(1.1);
        }
    }
    @keyframes play {
        from {
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
        to {
            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
            -ms-transform: scale(1.1);
            -o-transform: scale(1.1);
            transform: scale(1.1);
        }
    }
</style>
