<template>
    <v-container grid-list-md class="mt-5 pa-0">
        <h3>What's inside:</h3>
        <v-layout v-bind="binding" wrap>
            <v-flex sm4 v-for="i in 12" :key="i">
                <v-card>
                    <v-card-media src="https://thumb.ibb.co/ivFuRT/cover_Demo.png" height="200px" style="object-fit: contain"></v-card-media>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class ImageGallery extends Vue {
        get binding() {
            const binding = {};
            if (this.$vuetify.breakpoint.xsOnly) binding.column = true;
            return binding;
        }
    }
</script>
<style scoped>

</style>