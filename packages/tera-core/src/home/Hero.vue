<template>
  <v-responsive class="primary--text py-2">
    <v-container>
      <v-layout align-center justify-center wrap>
        <div
          class="text-xs-center"
          :style="`flex: 1 1 ${$vuetify.breakpoint.mdAndDown ? '100%' : 'auto'}`"
        >
          <h1
            :class="$vuetify.breakpoint.smAndDown && 'display-1' || 'display-3'"
            class="font-weight-bold mb-4 mx-3"
            v-html="$t('Vuetify.Home.callout')"
          />

          <h3 class="font-weight-regular">{{$t('Vuetify.Home.subcallout')}}</h3>
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

