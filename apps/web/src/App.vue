<template>
  <v-fade-transition appear>
    <core-documentation v-if="!examples" />

    <div id="app" v-else>
      <router-view />
    </div>
  </v-fade-transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';

@Component({
  // components: { Header }
})
export default class App extends Vue {
  
  get examples() {
    return !!this.$route.params.example;
  }

  constructor() {
    super();
  }
}
</script>

<style lang="stylus">
@import '~vuetify/src/stylus/settings/_variables.styl';
</style>

<style lang="scss">
@import './assets/css/styles.scss';
</style>
