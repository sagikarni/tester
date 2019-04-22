<template>
  <div>
    <v-responsive class="primary--text py-2">
      <v-container>
        <v-layout align-center justify-center wrap>
          <div
            class="text-xs-center"
            :style="`flex: 1 1 ${$vuetify.breakpoint.mdAndDown ? '100%' : 'auto'}`"
          >
            <h3
              :class="$vuetify.breakpoint.smAndDown && 'display-1' || 'display-3'"
              class="font-weight-regular mb-4 mx-3"
              v-html="$t('Vuetify.Home.strips.header')"
            />
          </div>
        </v-layout>
      </v-container>

      <!-- 
    <strip group="homepage"/>

    <strip group="homepage"/>

      <strip group="homepage"/>-->
    </v-responsive>
    <v-container>
      <strip-group value="homepage" />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    StripGroup: () => import('./StripGroup.vue'),
  },
})
export default class Hero extends Vue {}
</script>

