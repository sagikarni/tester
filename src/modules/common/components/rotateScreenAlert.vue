<template>
    <v-layout row justify-center>
        <!--<v-btn v-show="orientation" color="white" class="close_rotation_issue" flat @click.native="$router.go(-1)">-->
        <!--<v-icon>close</v-icon>-->
        <!--</v-btn>-->

        <close-pane v-show="orientation"></close-pane>
        <v-dialog v-model="orientation" persistent>
            <v-card>
                <v-card-title class="headline">
                    <div class="card_title" color="white">
                        {{ $locale.general.rotateScreenPopup }}
                    </div>
                    <div class="card_test">
                        <v-icon color="white">screen_rotation</v-icon>
                    </div>
                </v-card-title>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Prop} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import ClosePane from '@/modules/common/components/closePane.vue';

    @Component({
        components: {
            ClosePane,
        },
    })
    export default class RotateScreenAlert extends BaseComponent {
        @Prop() public orientation?: boolean;

        constructor() {
            super();
        }

    }
</script>

<style scoped lang="scss">
    .close_rotation_issue {
        z-index: 100000;
        right: 10px;
        top: 10px;
        position: absolute;
        min-width: auto;
        height: auto;
        padding: 2px;
        border-radius: 50%;
    }

    .rotation_icon {
        width: 15px;
        height: 15px;
        display: inline-block;
        background-image: url(/public/img/icons/screen_rotation_white.png);
        -webkit-background-size: contain;
        background-size: contain;
    }

    .card__title {
        display: block;
    }

    .card_title {
        font-size: 16px;
        margin: 0 auto;
        color: white;
        padding: 16px 0;
        text-align: center;

    }

    .card_test {
        margin: 0 auto;
        color: white;
        text-align: center;

    }

    .card_test i {
        font-size: 30px;
    }

    .theme--light .card {
        background: transparent !important;
    }
</style>
