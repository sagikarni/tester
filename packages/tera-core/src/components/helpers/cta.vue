<template>
  <v-responsive
    class="white--text"
    style="background: linear-gradient(to bottom, #1867c0, #5CBBF6)"
  >
    <v-container my-3>
      <v-layout align-center justify-center wrap>
        <img
          alt="Logo"
          class="mx-3"
          height="256px"
          :src="require('@/assets/logo.png')"
          width="256px"
        />
        <v-flex shrink>
          <div
            class="display-3 font-weight-light"
            v-text="$t('Home.headline')"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-responsive>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Cta extends Vue {
  constructor() {
    super();
  }
}
</script>
