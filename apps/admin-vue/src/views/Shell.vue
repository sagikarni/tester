<template>
  <v-app id="inspire"> <router-view /> </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Shell extends Vue {
  private source = '';

  private dialog = false;
  private drawer = null;
  private items = [
    { icon: 'contacts', text: 'Activities' },
    { icon: 'history', text: 'Recommendations' },
    { icon: 'content_copy', text: 'Categories' },
  ];
}
</script>
