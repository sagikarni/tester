<template>
    <v-toolbar flat dense app fixed clipped-left>
        <v-btn absolute right outline color="white" class="close_activity mr-0-xs" @click="$router.go(-1)">Close</v-btn>
    </v-toolbar>
</template>

<script lang="ts">
    import { Component } from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';

    @Component
    export default class SlideShowMenuPane extends BaseComponent {

    }
</script>

<style scoped lang="scss">
    .close_activity{
        margin-right: 100px!important;
    }
        @media only screen and (max-width: 600px) {
            .close_activity.mr-0-xs{
            margin-right: 0!important;
        }
    }
</style>
