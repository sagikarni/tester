<template>
    <v-layout wrap style="height: 200px;">
   
        <v-container>
            <v-layout justify-center>
                   <search-test></search-test>
                   
                <v-btn dark color="pink" @click.stop="drawer = !drawer">Refine</v-btn>
            </v-layout>
        </v-container>
        <v-navigation-drawer
                v-model="drawer"
                temporary
                absolute
        >
            <v-list class="pa-1">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="https://randomuser.me/api/portraits/men/85.jpg" >
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>John Leider</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile v-for="item in items" :key="item.title" @click="">
                    <v-list-tile-action>
                     </v-list-tile-action>
                    <v-list-tile-content>
                     </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';
    import SearchComponent from '@/modules/search/components/searchComponent.vue'; // @ is an alias to /src

    @Component({
    components: {
        SearchComponent,
       },
    })
    export default class NormalView extends Vue {
        public drawer: boolean = false;



    }
</script>

<style scoped>

</style>