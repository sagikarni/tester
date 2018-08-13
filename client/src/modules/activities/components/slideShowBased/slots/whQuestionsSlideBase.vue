<template>
    <div>
        <div class="full-height table">
            <div class="cell">
                <div class="cell-content">
                    <slot></slot>
                    <div v-if="question" class="wh-question" @click="changeQuestion">
                        <div class="text_refresh_wrapper">
                            <span class="refresh_icon">
                                <i class="material-icons meaningRefresh"> cached </i>
                            </span>
                            <span class="spanFade meaningSpanFade">{{questionsArray[0]}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {PremiumCollectionLayout, ImageType} from '@/modules/activities/store/types';


    @Component
    export default class WHQuestionsSlideBase extends BaseComponent {

    }

</script>
