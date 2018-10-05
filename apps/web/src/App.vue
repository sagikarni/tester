<template>
  <div id="app" class="theme-dark">
    <v-app>
      <Header></Header>
      <v-content>
        <v-container fluid>
          <transition name="page" mode="out-in">
            <router-view></router-view>
          </transition>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';

@Component({
  components: { Header }
})
export default class App extends Vue {
  constructor() {
    super();
  }
}
</script>

<style lang="scss">
@import './assets/css/styles.scss';
</style>
