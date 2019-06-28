<template>
  <div>
    <v-responsive class="black--text mb-2">
      <v-container fluid class="pa-0">
        <v-layout align-center justify-center wrap>
          <div
            class="text-xs-center"
            :style="`flex: 1 1 ${$vuetify.breakpoint.mdAndDown ? '100%' : 'auto'}`"
          >
            <h3
              :class="$vuetify.breakpoint.smAndDown && 'headline' || 'headline'"
              class="font-weight-regular pa-3 ma-0" style="background:#eee;"
              
              v-html="$t('Vuetify.Home.strips.header')"
            />
          </div>
        </v-layout>
      </v-container>

    </v-responsive>
    <v-container fluid style="max-width:1500px;">
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

