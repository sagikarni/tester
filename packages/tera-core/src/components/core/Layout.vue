<template>
  <div>
    <core-toolbar v-if="hasToolbar">
      <template slot="extension">
        <slot name="extension"></slot>
      </template>
    </core-toolbar>

    <core-drawer v-if="hasDrawer"></core-drawer>

    <slot></slot>

    <core-footer v-if="hasFooter" />
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { AppModule } from '../../store/app';

@Component({})
export default class Layout extends Vue {

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
