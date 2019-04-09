<template>
 <div style="display:none;">nav here</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import appDrawerItems from '../../data/app-drawer-items';
// import { camelCase } from 'lodash';
// import { TeraStoreModule } from '../../store';
// import dasherize from 'dasherize';

@Component({})
export default class Toolbar extends Vue {
  // get inputValue() {
  //   return this.appDrawer && !this.isFullscreen;
  // }

  // set inputValue(val) {
  //   TeraStoreModule.drawer(val);
  // }

  // get appDrawer() {
  //   return TeraStoreModule.appDrawer;
  // }

  // get isFullscreen() {
  //   return TeraStoreModule.isFullscreen;
  // }

  // items = appDrawerItems;

  // constructor() {
  //   super();
  // }

  // genChildTarget(item, subItem, grand) {
  //   if (!grand) {
  //     return {
  //       name: item.group,
  //       params: {
  //         overview: `${dasherize(item.name)}`,
  //         category: `${dasherize(subItem.name)}`,
  //       },
  //     };
  //   }

  //   if (grand.default) {
  //     return {
  //       name: subItem.group,
  //       params: {
  //         overview: `${dasherize(item.name)}`,
  //         category: `${dasherize(subItem.name)}`,
  //       },
  //     };
  //   }

  //   return {
  //     name: grand.group,
  //     params: {
  //       overview: `${dasherize(item.name)}`,
  //       category: `${dasherize(subItem.name)}`,
  //       id: `${dasherize(grand.name)}`,
  //     },
  //   };
  // }
}
</script>
