<template>
    <div class="closePane" @click="resizButton($event)">
        <div ref="rez">
            <v-icon class="iconRes">close</v-icon>

        </div>
    </div>

</template>
<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import TimelineMax from 'gsap';

    const timeLineMax = TimelineMax as any;
    @Component
    export default class ClosePane extends BaseComponent {
        public isCloseBtn?: boolean = false;
        public setTime: any;

        public resizButton(e: object) {
            if (!this.isCloseBtn) {
                this.isCloseBtn = true;
                timeLineMax.from(this.$refs.rez, 0.2,
                    {css: {scale: 1.4, opacity: 1}, ease: Back.easeOut, delay: 2.6});
                this.setTime = setTimeout(() => {
                    this.isCloseBtn = false;
                }, 3000);
            } else {
                this.isCloseBtn = false;
                clearTimeout(this.setTime);
                this.$router.go(-1);
            }
        }
    }
</script>
s
<style scoped lang="scss">
    .closePane {

        top: 15px;
        left: 24px;
        position: absolute;
        z-index: 201;
        cursor: pointer;
        padding: 15px;
    }

    .btn__content {
        min-width: 0;
    }

    .btn {
        min-width: 0;
    }

    .iconRes {
        background-color: grey;
        display: block;
        border-radius: 50%;
        opacity: 0.5;
        cursor: pointer;
        color: white;
        font-size: 18px;
        margin: 3px;
        padding: 4px;

    }

    .closeButton {
        background-color: rgba(0, 0, 0, 1) !important;
        box-shadow: none !important;
    }

</style>