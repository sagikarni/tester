<template>
  <div>
    <v-navigation-drawer fixed app :value="drawer">
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot="activator">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="redirectTo(child)"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" :to="item.url">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-content> <router-view /> </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {AppModule} from '../store/modules/app';

@Component
export default class Dashboard extends Vue {
  private source = '';

  private dialog = false;

  private get drawer() {
    return AppModule.sidebar.opened;
  }

  private items = [
    { icon: 'contacts', text: 'Activities', url: '/dashboard/activities' },
    {
      icon: 'history',
      text: 'Recommendations',
      url: '/dashboard/recommendations',
    },
    { icon: 'content_copy', text: 'Categories', url: '/dashboard/categories' },
    {
      icon: 'content_copy',
      text: 'Articulation',
      url: '/dashboard/articulations',
    },
  ];
}
</script>
