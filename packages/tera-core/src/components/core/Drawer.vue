<template>
  <v-navigation-drawer dark app :value="opened" absolute temporary>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.title" :to="item.url">
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AppModule } from '../../store/app';

@Component({})
export default class Drawer extends Vue {
  get opened() {
    return AppModule.sidebar.opened;
  }

  items = [
    { title: 'Cognition', url: '/cognition' },
    { title: 'Speech', url: '/speech' },
    { title: 'Communication', url: '/communication' },
    { title: 'Learning', url: '/learning' },
    { title: 'Home', url: '/' },
    { title: 'Pricing', url: '/products' },
    { title: 'Faq', url: '/faq' },
    { title: 'The Team', url: '/team' },
    { title: 'Contact', url: '/contact' },
    { title: 'Blog', url: '/blog' },
  ];
}
</script>
