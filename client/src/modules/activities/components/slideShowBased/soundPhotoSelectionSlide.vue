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
            <audio :src="getImagePath(this.parameter.sound)" :id="`audio_id_${audioIndex}`"></audio>
            <v-icon class="sound-up" @click="playSound">volume_up</v-icon>
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
        public soundEnd: boolean = false;

        public mounted() {
            this.audioObj = document.querySelector(`#audio_id_${this.audioIndex}`);
            this.soundEnd = this.audioObj.ended;
        }

        get getMediaTypes(): any {
            return ImageType;
        }

        get audioIndex(): number | undefined {
            return this.slideIndex;
        }

        @Watch('soundEnd')
        public onPropertyChanged(value: boolean, oldValue: boolean) {
            if (value) {
                this.soundEnd = false;
                this.play = false;
            }
        }

        public playSound() {
            if (!this.play) {
                this.audioObj.play();
                this.ifSoundPlayed = true;
                this.play = true;
            } else {
                this.audioObj.pause();
                this.play = false;
            }
        }

        public stopSound() {
            this.audioObj.pause();
            this.audioObj.currentTime = 0;
            this.play = false;
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
        background-color: white;
        width: calc(50% - 60px);
        padding: 5px 5px 0px 5px;
        -webkit-filter: brightness(1);
        filter: brightness(1);
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
        border: solid 2px green;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .redBorder {
        border: solid 2px red;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .nonBorder {
        border: none;
    }

</style>
