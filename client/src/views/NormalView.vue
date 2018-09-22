<template>
    <div>

        <v-content>
            <v-container>
                <transition name="page" mode="out-in">
                    <router-view></router-view>
                </transition>
            </v-container>
        </v-content>
        <!--<v-footer height="auto" >-->
        <!--<v-layout justify-center align-center>-->

        <!--</v-layout>-->
        <!--</v-footer>-->
    </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import TimelineMax from 'gsap';

@Component
export default class NormalView extends Vue {}
</script>


<style scoped>
.bottomColor {
  border-bottom: solid 1px #7ea875;
}
.toolbarTitle {
  font-size: 13px;
}
</style>
