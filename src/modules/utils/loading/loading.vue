<template>
    <div ref="loadingOverlay" v-if ='isLoading' class = "tera-overlay"></div>

</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import TimelineMax from 'gsap';

    @Component
    export default class Loading extends Vue {
        public isLoading: boolean = false;



        public close (){
             (TimelineMax as any).to('.tera-overlay', 1, {opacity : 0 , onComplete: () => {
                    this.isLoading = false;

                } });
        }
        public show(): void {
            this.isLoading = true;
             setTimeout(() => {
                 (TimelineMax as any).to('.tera-overlay', 1, {opacity : 0.5 });
             } , 20);
        }



    }
</script>

<style scoped lang="scss">

    .tera-overlay
{
        opacity: 0;
        position: fixed; /* Sit on top of the page content */
        width: 100%; /* Full width (cover the whole page) */
        height: 100%; /* Full height (cover the whole page) */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: black;
        z-index: 2000;
    }
</style>