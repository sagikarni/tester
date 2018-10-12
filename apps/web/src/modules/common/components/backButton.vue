<template>
    <v-btn flat icon color="dark" class="ml-0" @click="backClicked()">
        <i class="ex-back-arrow-icon"></i>
    </v-btn>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import BaseComponent from '@/modules/common/components/baseComponent.vue';

    @Component
    export default class BackButton extends BaseComponent {
        public backClicked() {
            if (window.history.length > 2) {
                this.$router.go(-1);
            } else {
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped lang="scss">


</style>