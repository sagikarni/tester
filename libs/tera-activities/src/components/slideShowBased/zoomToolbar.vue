<template>
    <div id="inspire" v-if="closeSheet">
        <v-bottom-sheet inset max-width="750px" hide-overlay v-model="buttonSheet">
            <v-btn slot="activator" v-show="!buttonSheet" class="button-lamp"></v-btn>
            <v-card tile>
                <v-list class="grey_transparent">
                    <div class="text-xs-center">
                        <v-btn @click="moveShapes">$locale.activities.moveShapes</v-btn>
                        <v-btn @click="addShape"> +$locale.activities.addShape</v-btn>
                        <v-btn @click="enlargeShape"> +$locale.activities.enlargeShape</v-btn>
                        <v-btn @click="revealPhoto"> $locale.activities.revealPhoto</v-btn>
                        <v-btn
                                @click="buttonSheet = false"
                                flat color="white"
                                class="close-lamp-button">
                            <v-icon class="pa-0">close</v-icon>
                        </v-btn>
                    </div>
                </v-list>
            </v-card>
        </v-bottom-sheet>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';

    @Component
    export default class ButtonSheetDetails extends BaseComponent {
        public buttonSheet: boolean = false;
        public closeSheet: boolean = true;

        public moveShapes() {
            this.$emit('moveShapes', true);
        }

        public addShape() {
            this.$emit('addShape', true);
        }

        public enlargeShape() {
            this.$emit('enlargeShape', true);
        }

        public revealPhoto() {
            this.$emit('revealPhoto', true);
            this.closeSheet = false;
        }

    }
</script>

<style scoped lang="scss">
    #inspire{
        height: 0!important;
        position: fixed;
        bottom: 70px;
        z-index: 10000000;
        .application--wrap{
            min-height: 0;
        }
        .grey_transparent{
            background-color: rgba(158, 158, 158, 0.3);
        }
        .button-lamp{
            background-image: url("~/src/assets/icons/lamp_icon.png");
            background-size: cover;
            background-color: transparent!important;
            box-shadow: none!important;
            height: 50px;
            width: 50px!important;
            min-width: auto;
        }

        .close-lamp-button{
            float: right;
            width: auto;
            min-width: auto;
        }

    }
</style>
