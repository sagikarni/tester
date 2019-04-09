<template>
  <v-responsive class="black--text">
    <v-container fluid pa-0>
      <v-layout align-center justify-center wrap>
        <div
          class="text-xs-center"
          :style="`flex: 1 1 ${$vuetify.breakpoint.mdAndDown ? '100%' : 'auto'}`"
        >
          <h1
            :class="$vuetify.breakpoint.smAndDown && 'display-1' || 'display-3'"
            class="font-weight-light mb-4 mx-3"
            v-html="$t('Vuetify.Home.callout')"
          />

          <p>{{$t('Vuetify.Home.subcallout')}}</p>
        </div>
      </v-layout>
    </v-container>

    <feature/>
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