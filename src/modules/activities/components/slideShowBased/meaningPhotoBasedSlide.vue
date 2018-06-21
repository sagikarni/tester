<template>
    <div>
        <div v-if="isSinglePhotoSlide" class="full-height table">
            <div class="cell">
                <img style="width: 100%; background-color: white"  class="object-fit_contain" :src="parameter.media.photos[0]">
                <div v-if="phrase" class="phrases" @click="randomWord"> <span>{{phraseWord}}</span>
                    <i class="material-icons refresh_icon">
                    cached
                </i></div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {PremiumCollectionLayout} from '@/modules/activities/store/types';

    @Component
    export default class PremiumCollectionPhotoBasedSlide extends BaseComponent {
        @Prop() public parameter?: any;
        public phraseWord: string = '';
        public phrase: boolean = false;

        get isSinglePhotoSlide(): boolean {
            return (this.parameter.layout as PremiumCollectionLayout) === PremiumCollectionLayout.SingleMedia;
        }

        public created() {
            this.randomWord();
        }

        public randomWord() {
            if (this.parameter && this.parameter.media && this.parameter.media.phrases && this.parameter.media.phrases.length > 0) {
                this.phrase = true;
                const arrayLen = this.parameter.media.phrases.length;
                const randNum = Math.floor(Math.random() * arrayLen);
                this.phraseWord = this.parameter.media.phrases[randNum];
            }
        }
        public pauseAction(): void {
            // do nothing
        }
        public stopAction(): void {
            // do nothing
        }

    }
</script>

<style scoped lang="scss">
    .object-fit_contain { object-fit: contain }
    .full-height{
        height:100%;
        background:#F8F8F8;
    }
    .full-height.two{
        background:#ACACAC;
    }
    .full-height.three{
        background:#5E5E5E;
    }
    .table{
        display:table;
        width:100%;
        position:relative;
        background: transparent;
    }
    .cell {
        display: table-cell;
        vertical-align: middle;
        width: 100%;
        margin: 0 auto;
        height:100%;
        text-align: center;
    }
    .phrases{
        position: absolute;
        padding: 11px 35px;
        color: white;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        box-sizing: border-box;
        font-size: 18px;
        background-color: black;
        i{
          float: right;
            margin-left: 10px;
            line-height: 1.1;
            min-width: 150px;
        }
    }

</style>
