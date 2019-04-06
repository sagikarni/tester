<template>
  <v-responsive class="black--text py-5">
    <v-container>
      <v-layout align-center justify-center wrap>
        <div
          class="text-xs-center"
          :style="`flex: 1 1 ${$vuetify.breakpoint.mdAndDown ? '100%' : 'auto'}`"
        >
          <h1
            :class="$vuetify.breakpoint.smAndDown && 'display-1' || 'display-3'"
            class="font-weight-light mb-4 mx-3"
            v-html="$vuetify.breakpoint.smAndUp ? $t('Vuetify.Home.callout') : 'Tera'"
          />
        
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
    Feature: () => import('./Feature') 
  }
})
export default class Hero extends Vue { }

</script>