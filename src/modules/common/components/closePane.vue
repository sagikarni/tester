<template>
    <div class="closePane" @click="resizButton($event)">
        <v-icon class="iconRes">close</v-icon>
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
                timeLineMax.from('.iconRes', 0.3,
                    {css: {scale: 1.2, opacity: 1, padding: "4px"}, ease: Quad.easeInOut, delay: 2.7});
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

    }

    .closeButton {
        background-color: rgba(0, 0, 0, 1) !important;
        box-shadow: none !important;
    }

</style>