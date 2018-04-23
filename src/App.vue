<template>
  <div id="app">
    <v-app id="inspire" dark>
        <router-view></router-view>
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

</style>
