<template>
  <v-responsive class="white--text">
    <v-container fluid class="hero">
      <v-layout align-center justify-center wrap>
        <div
          class="text-xs-center"
          :style="`flex: 1 1 ${$vuetify.breakpoint.mdAndDown ? '100%' : 'auto'}`"
          style="min-height: 45vh;padding-bottom: 10vh;"
        >
          <h1
            :class="$vuetify.breakpoint.smAndDown && 'display-1' || 'display-1'"
            class="font-weight-regular mb-4 mx-3"
            v-html="$t('Vuetify.Home.callout')"
          />

          <h2
            class="font-weight-regular"
            :class="$vuetify.breakpoint.smAndDown && 'headline' || 'display-1'"
          >{{$t('Vuetify.Home.subcallout')}}</h2>
        </div>
      </v-layout>
    </v-container>
    <v-container>
      <feature style="margin-top:-25vh;"/>
    </v-container>
  </v-responsive>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Feature: () => import('./Feature.vue'),
  },
})
export default class Hero extends Vue {}
</script>

<style lang="scss" scoped>
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
    url('http://lorempixel.com/g/900/900/') no-repeat;
  background-size: cover;
}
</style>
