<template>
    <div>
        <section>
            <v-flex>
                <slide-show-menu-pane></slide-show-menu-pane>
            </v-flex>
            <side-navigations></side-navigations>
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

    }
</script>

<style scoped lang="scss">

</style>
