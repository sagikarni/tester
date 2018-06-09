<template>
    <div>
        <section>
            <v-flex>
                <slide-show-menu-pane @click.native="activePaneChange"  :class="[changeOpacity ? 'top_pane_dark' : '', 'top_pane']"></slide-show-menu-pane>
            </v-flex>
            <side-navigations ref="sideNavigation" ></side-navigations>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import SlideShowMenuPane from '@/modules/common/components/slideShowMenuPane.vue';
    import SideNavigations from '@/modules/common/components/sideNavigations.vue';

    @Component({
        components: {
            SlideShowMenuPane,
            SideNavigations,
        },
    })
    export default class PremiumCollection extends BaseComponent {
        public changeOpacity: boolean = true;

        constructor() {
            super();
        }
        public created() {
            setTimeout(() => {
                this.changeOpacity = false;
            }, 3000);
        }
        public activePaneChange(): void {
            this.changeOpacity = true;
            setTimeout(() => {
                this.changeOpacity = false;
            }, 3000);
            const el: any = this.$refs.sideNavigation;
            el.hiddenAfterClick();
        }

    }
</script>

<style scoped lang="scss">
    .top_pane{
        /*background-color: rgba(255,255,255, 0.5);*/
        background-color: rgb(255,255,255);

    }
    .toolbar__content{
        background-color: rgba(33,33,33, 0.5);
    }


</style>
