<template>
  <v-toolbar
    color="primary"
    dark
    id="app-toolbar"
    class="elevation-1"
    app
    clipped-left
    clipped-right
    fixed
    height="56"
    style="padding-left:0!important;"
    :extended="!!extension"
    :extension-height="expend"
  >
    <div
      style="position:fixed;top:0;left:0;width:22px;height:22px;background:#555;color:#fff;opacity:.5;"
    >{{$vuetify.breakpoint.name}} {{extension}}</div>

    <v-toolbar-side-icon @click.stop="toggleDrawer" />

    <slot slot="extension" name="extension"></slot>

    <v-spacer class="hidden-md-and-up" />

    <router-link to="/">
      <v-img
        alt="Tera Logo"
        :src="require(`@/assets/logo.svg`)"
        contain
        transition="scale-transition"
        width="143px"
      />
    </router-link>

    <v-toolbar-items class="hidden-md-and-down">
      <v-btn
        class="font-weight-light"
        v-for="link in linksLeft"
        :key="link"
        flat
        :to="`/${link}`"
      >{{ $t(`Vuetify.AppToolbar.${link}`) }}</v-btn>
    </v-toolbar-items>

    <v-spacer />

    <v-toolbar-items class="hidden-md-and-down">
      <v-btn
        class="font-weight-light"
        v-for="link in linksRight"
        :key="link"
        flat
        :to="`/${link}`"
      >{{ $t(`Vuetify.AppToolbar.${link}`) }}</v-btn>
    </v-toolbar-items>

    <v-divider vertical class="hidden-md-and-down"></v-divider>

    <core-login-status />

    <!-- <core-locales/> -->
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AppModule } from '../../store/app';

@Component
export default class Toolbar extends Vue {
  @Prop({ default: false }) extension;

  expend = 56;

  linksLeft = ['cognition', 'speech', 'communication', 'learning'];
  linksRight = ['products'];

  toggleDrawer() {
    AppModule.toggleDrawer(true);
  }

  // handleScroll(event) {
  //   this.$nextTick(() => {
  //     if (window.scrollY > 80) {
  //       this.expend = 60;
  //     } else {
  //       this.expend = 80;
  //     }
  //   });
  // }

  // created() {
  //   window.addEventListener('scroll', this.handleScroll);
  // }

  // destroyed() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // }
}
</script>

<style lang="scss">
.v-toolbar__extension {
  background: #eee;
  align-items: stretch;
  padding: 0;

  .col {
    // flex: 0 0 300px;

    > button {
      height: 100%;
      padding: 0;
      margin: 0;
      min-width: 60px;
      flex: 1;
      border-right: 1px solid #ccc;
    }
  }
}
</style>
