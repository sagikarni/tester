<template>
    <div >
        <v-navigation-drawer
                clipped
                temporary
                v-model="drawer"
                app
                color="red"
                @transitionend="menuStateChanged"
        >
            <v-list dense>
                <v-list-tile    class="menuItem" @click="">
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link to="/">   <v-list-tile-title>Home</v-list-tile-title></router-link>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile    class="menuItem" @click="">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link to="/about">   <v-list-tile-title>About</v-list-tile-title></router-link>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile    class="menuItem" @click="">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link to="/slideshow">   <v-list-tile-title>SlideShow</v-list-tile-title></router-link>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile    class="menuItem" @click="">
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link to="/">   <v-list-tile-title>Home</v-list-tile-title></router-link>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile    class="menuItem" @click="">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link to="/about">   <v-list-tile-title>About</v-list-tile-title></router-link>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile    class="menuItem" @click="">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link to="/slideshow">   <v-list-tile-title>SlideShow</v-list-tile-title></router-link>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile    class="menuItem" @click="">
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link to="/">   <v-list-tile-title>Home</v-list-tile-title></router-link>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile    class="menuItem" @click="">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link to="/about">   <v-list-tile-title>About</v-list-tile-title></router-link>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile    class="menuItem" @click="">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <router-link to="/slideshow">   <v-list-tile-title>SlideShow</v-list-tile-title></router-link>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left >
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container >
                <v-layout justify-center align-center>
                    <transition name="page" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer height="auto" >
            <v-layout justify-center align-center>
               this is the footer
                <br><br><br><br><br><br><br><br><br><br><br><br>
                footer
            </v-layout>
        </v-footer>
    </div>
</template>


<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';
    import TimelineMax from 'gsap';

    @Component
    export default class NormalView extends Vue {
        public drawer: boolean = false;


        @Prop()
        public source!: string;

        public menuStateChanged($event: any) {
            if ($event.propertyName === 'transform') {
                if (this.drawer) {
                    TweenMax.staggerFromTo('.menuItem', 1, {
                        x: '-200px',
                        opacity: 0,
                        ease: Expo.easeOut,
                        scale: '0.8',
                    }, {opacity: 1, x: '0', ease: Expo.easeOut, scale: '1'}, 0.1);
                } else {
                    TweenMax.set('.menuItem', {opacity: 0});
                }
            }

        }

    }
</script>


<style scoped>


</style>