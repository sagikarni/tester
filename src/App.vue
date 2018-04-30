<template>
  <div id="app">
    <v-app id="inspire">
        <transition name="page" mode="out-in">
         <router-view></router-view>
        </transition>
    </v-app>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    @Component
    export default class App extends Vue {

    }
</script>

<style lang="scss">
    @import "./assets/css/styles.scss";
</style>
