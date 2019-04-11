<template>
  <div>
    <v-container fluid pa-0>
      <v-layout align-center justify-center wrap>
        <div :style="`flex: 1 1 ${$vuetify.breakpoint.mdAndDown ? '100%' : 'auto'}`">
          <h3
            :class="$vuetify.breakpoint.smAndDown && 'display-1' || 'display-3'"
            class="font-weight-normal mb-4 mx-3"
            v-html="$t('Vuetify.WhyUs.header')"
          />
        </div>
      </v-layout>
    </v-container>

    <v-layout justify-end align-center :column="$vuetify.breakpoint.xsOnly">
      <div>
        <v-layout :column="$vuetify.breakpoint.mdAndDown">
          <div class="f-feature purple">
            {{features.printable.text}}
            {{features.printable.description}}
          </div>
          <div class="f-feature blue">
            {{features.printable.text}}
            {{features.printable.description}}
          </div>
        </v-layout>
      </div>
      <div class="f-feature red">
        {{features.printable.text}}
        {{features.printable.description}}
      </div>
    </v-layout>

    <v-layout>
      <v-card v-for="domain in domains" :key="domain.text" xs4>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{domain.text}}</h3>
            <div>{{domain.description}}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Start</v-btn>
        </v-card-actions>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
      </v-card>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Hero extends Vue {
  get domains() {
    return this.$t('Vuetify.WhyUs.domains');
  }

  get features() {
    return this.$t('Vuetify.WhyUs.features');
  }
}
</script>

<style lang="scss" scoped>
.f-feature {
  width: 150px;
  height: 150px;
}
</style>
