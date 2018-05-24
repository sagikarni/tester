<template>
    <v-container grid-list-md class="mt-5 pa-0">
        <h3>What's inside:</h3>
        <v-layout v-bind="addColumnProp" wrap>
            <v-flex sm6 md4 v-for="i in 12" :key="i">
                <v-card>
                    <img src="https://thumb.ibb.co/ivFuRT/cover_Demo.png" alt="img" width="100%" height="100%">
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class ImageGallery extends Vue {
        get addColumnProp() {
            const addColumnProp = {column: false};
            if (this.$vuetify.breakpoint.xsOnly) {
                addColumnProp.column = true;
            }
            return addColumnProp;
        }
    }
</script>
<style scoped>

</style>