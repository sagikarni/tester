<template>
  <div id="home">
    in home page!

    <translation-translatable i18n="Vuetify.Home.getStarted">

      <div v-text="$t('Vuetify.Home.getStarted')"></div>

    </translation-translatable>

    <v-btn to="/getting-started/quick-start">go</v-btn>

    <v-btn to="/activities/premium-collection">Primuim collection</v-btn>

    <v-btn @click="fuck">http</v-btn>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class HomePage extends Vue {
  constructor() {
    super();
  }

  fuck() {
    this.$http.get('/auth/facebook').then(
      r => {
        console.log({ r });
      },
      e => {
        console.log({ e });
      }
    );
  }
}
</script>


