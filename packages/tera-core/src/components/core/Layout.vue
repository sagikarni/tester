<template>
  <div>
    <core-toolbar v-if="hasToolbar">
      <template slot="extension">
        <slot name="extension"></slot>
      </template>
    </core-toolbar>

    <core-drawer v-if="hasDrawer"></core-drawer>

    <slot></slot>

    <core-footer v-if="hasFooter" :class="{ p: extension }"/>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from 'vue-property-decorator';
import { AppModule } from '../../store/app';

@Component({})
export default class Layout extends Vue {
  @Prop({ default: false }) extension;

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

<style lang="scss" scoped>
.p {
  padding-left: 300px !important;
}
</style>
