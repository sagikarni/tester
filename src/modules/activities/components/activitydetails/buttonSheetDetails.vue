<template>
    <v-app id="inspire">
        <div>
            <v-icon>lightbulb-on-outline</v-icon>
            <v-bottom-sheet inset>
                <v-btn
                        slot="activator"
                        color="red"
                        dark
                >
                <i class="lightbulb-on-outline"></i>
                </v-btn>
                <v-card tile>
                    <v-progress-linear
                            :value="50"
                            class="my-0"
                            height="3"
                    ></v-progress-linear>

                    <v-list>
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title>The Walker</v-list-tile-title>
                                <v-list-tile-sub-title>Fitz & The Trantrums</v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-spacer></v-spacer>

                            <v-list-tile-action>
                                <v-btn icon>
                                    <v-icon>fast_rewind</v-icon>
                                </v-btn>
                            </v-list-tile-action>

                            <v-list-tile-action :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
                                <v-btn icon>
                                    <v-icon>pause</v-icon>
                                </v-btn>
                            </v-list-tile-action>

                            <v-list-tile-action :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
                                <v-btn icon>
                                    <v-icon>fast_forward</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
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

    }
</script>

<style scoped lang="scss">
    #inspire{
        height: 0!important;
        .application--wrap{
            min-height: 0;
        }
    }

</style>
