<template>
  <v-navigation-drawer app v-model="inputValue" :stateless="isFullscreen">
    <v-list dense expand>
      <template v-for="item in items">
        <v-list-group
          v-if="item.items"
          :group="item.group"
          :prepend-icon="item.icon"
          no-action
          :key="item.title"
        >
          <v-list-tile slot="activator" ripple>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <template v-for="(subItem, i) in item.items">
            <!--sub group-->
            <v-list-group v-if="subItem.items" :group="subItem.group" sub-group :key="subItem">
              <v-list-tile slot="activator" ripple="ripple">
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                v-for="(grand, i) in subItem.items"
                :key="i"
                :to="genChildTarget(item, grand)"
                :href="grand.href"
                ripple
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ grand.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-chip
                  class="white--text pa-0 v-chip--x-small"
                  v-if="grand.badge"
                  :color="grand.color || 'primary'"
                  disabled
                >{{ grand.badge }}</v-chip>
              </v-list-tile>
            </v-list-group>
            <!--child item-->
            <v-list-tile
              v-else
              :key="i"
              :to="genChildTarget(item, subItem)"
              :href="subItem.href"
              :disabled="subItem.disabled"
              :target="subItem.target"
              ripple
            >
              <v-list-tile-content>
                <v-list-tile-title>
                  <span>{{ subItem.title }}</span>
                </v-list-tile-title>
              </v-list-tile-content>
              <v-chip
                class="white--text pa-0 v-chip--x-small"
                v-if="subItem.badge"
                :color="subItem.color || 'primary'"
              >{{ subItem.badge }}</v-chip>
              <v-list-tile-action v-if="subItem.action">
                <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list-group>
        <v-subheader class="grey--text" v-else-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
        <v-divider v-else-if="item.divider" :key="item"></v-divider>
        <!--top-level link-->
        <v-list-tile
          v-else
          :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          ripple
          :disabled="item.disabled"
          :target="item.target"
          rel="noopener"
          :key="item.href"
        >
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-chip
            class="white--text pa-0 v-chip--x-small"
            v-if="item.badge"
            :color="item.color || 'primary'"
            disabled
          >{{ item.badge }}</v-chip>
          <v-list-tile-action v-if="item.subAction">
            <v-icon class="success--text">{{ item.subAction }}</v-icon>
          </v-list-tile-action>
          <v-chip
            class="caption blue lighten-2 white--text mx-0"
            v-else-if="item.chip"
            label
            small
          >{{ item.chip }}</v-chip>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import appDrawerItems from '../../data/app-drawer-items';
import { camelCase } from 'lodash';
import { TeraStore, DRAWER_TOGGLE, DRAWER } from '../../store';

@Component({})
export default class Toolbar extends Vue {
  get inputValue() {
    return this.appDrawer && !this.isFullscreen;
  }

  set inputValue(val) {
    this.drawer(val);
  }
  @TeraStore.Getter('appDrawer') appDrawer;
  @TeraStore.Getter('isFullscreen') isFullscreen;
  @TeraStore.Action(DRAWER) drawer;

  items = appDrawerItems;

  constructor() {
    super();
  }

  genChildTarget(item: any, subItem: any) {
    if (subItem.href) {
      return;
    }
    if (
      item.component &&
      // Quick and dirty fix
      subItem.name !== 'api-explorer'
    ) {
      return {
        name: item.component,
        params: {
          section: item.group,
          component: subItem.name
        }
      };
    }
    return { name: `${item.group}/${camelCase(subItem.name)}` };
  }
}
</script>
