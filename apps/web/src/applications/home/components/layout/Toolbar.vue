<template>
  <v-toolbar app color="white" flat>
    <span class="vuetify">Vuetify</span>

    <v-spacer />

    <v-toolbar-items>
      <v-btn flat to="/getting-started/quick-start">
        Learn
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Toolbar extends Vue {
  constructor() {
    super();
  }
}
</script>

<style lang="stylus" scoped>
.vuetify {
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 400;
}
</style>