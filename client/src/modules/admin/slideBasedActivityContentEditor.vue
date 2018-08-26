<template>
 

</template>


<script lang="ts">
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';
    import {ActivityType} from '@/modules/activities/store/types';

    @Component
    export default class SlideBasedActivityContentEditor extends BaseComponent {
     @Prop() public activityType : ActivityType | undefined;

    }
</script>
