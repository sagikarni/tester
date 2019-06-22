<template>
  <v-app v-cloak>
      
      <router-view/>


    <!-- <core-toolbar v-if="hasToolbar" />

    <core-drawer v-if="hasDrawer" />

    <core-footer v-if="hasFooter" /> -->
  </v-app>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { AppModule } from './store/app';

@Component({})
export default class Shell extends Vue {

  get hasToolbar() {
    return AppModule.hasToolbar;
  }
   get hasDrawer() {
    return AppModule.hasDrawer;
  }
   get hasFooter() {
    return AppModule.hasFooter;
  }
}
</script>
