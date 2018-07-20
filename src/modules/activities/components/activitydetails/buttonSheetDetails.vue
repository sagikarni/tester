<template>
    <v-app id="inspire">
        <div>
            <v-bottom-sheet>
                <v-btn slot="activator" class="button-lamp"></v-btn>
                <v-card tile>
                    <v-progress-linear
                            :value="50"
                            class="my-0"
                            height="3"
                    ></v-progress-linear>

                    <v-list class="grey">
                        <div class="text-xs-center">
                            <v-btn @click="moveShapes">{{$locale.activities.moveShapes}}</v-btn>
                            <v-btn @click="addShape"> +{{$locale.activities.addShape}}</v-btn>
                            <v-btn @click="enlargeShape"> +{{$locale.activities.enlargeShape}}</v-btn>
                            <v-btn> Reveal photo{{$locale.activities.revealPhoto}}</v-btn>
                            <v-btn flat>
                                <v-icon>close</v-icon>
                            </v-btn>
                        </div>
                    </v-list>
                </v-card>
            </v-bottom-sheet>
        </div>
    </v-app>
</template>

<script lang="ts">
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';

    @Component
    export default class ButtonSheetDetails extends BaseComponent {
        public moveShapes() {
            this.$emit('moveShapes', true);
        }

        public addShape() {
            this.$emit('addShape', true);
        }

        public enlargeShape() {
            this.$emit('enlargeShape', true);
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
        .button-lamp{
            background-image: url("../../../../../public/img/icons/lamp_icon.png");
            background-size: cover;
            background-color: transparent!important;
            box-shadow: none!important;
            height: 50px;
            width: 50px!important;
            min-width: auto;
        }

    }
</style>
