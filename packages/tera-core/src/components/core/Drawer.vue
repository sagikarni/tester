<template>
  <v-navigation-drawer class="primary" dark app v-model="drawer" fixed temporary>
    <v-list two-line>
      <template v-for="(item, index) in items">
        <v-list-tile :key="item.title" @click="goto(item.url)" class="tiler">
          <v-list-tile-content>
            <v-list-tile-title :class="item.class || 'subheading'">{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AppModule } from '../../store/app';

@Component({})
export default class Drawer extends Vue {
  get drawer() {
    return AppModule.sidebar.opened;
  }

  set drawer(val) {
    AppModule.toggleDrawer(val);
  }

  goto(url) {
    this.drawer = false;
    this.$router.push(url);
  }

  items = [
    { title: 'Cognition', url: '/cognition', class: 'title' },
    { title: 'Speech', url: '/speech', class: 'title' },
    { title: 'Communication', url: '/communication', class: 'title' },
    { title: 'Learning', url: '/learning', class: 'title' },
    { title: 'Home', url: '/' },
    { title: 'Pricing', url: '/products' },
    { title: 'Faq', url: '/faq' },
    { title: 'The Team', url: '/team' },
    { title: 'Contact', url: '/contact' },
    { title: 'Blog', url: '/blog' },
  ];
}
</script>

<style lang="scss">
.tiler .v-list__tile__title { height:auto;}
</style>
