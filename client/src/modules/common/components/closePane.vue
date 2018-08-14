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
                timeLineMax.from('.iconRes', 0.4,
                    {scale: 1.4, autoAlpha: 1, delay: 2.6});
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

<style scoped lang="scss">
    .closePane {
        top: 15px;
        left: 24px;
        position: absolute;
        z-index: 201;
        cursor: pointer;
    }

    .btn__content {
        min-width: 0;
    }

    .btn {
        min-width: 0;
    }

    .iconRes {
        opacity: 0.5;
        padding: 5px;
        background-color: #666666;
        border-radius: 50%;
        display: block;
        color: white !important;
        font-size: 16px;
    }

    .closeButton {
        background-color: rgba(0, 0, 0, 1) !important;
        box-shadow: none !important;
    }

</style>