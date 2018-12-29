<template>
  <v-menu bottom offset-y left attach>
    <v-btn slot="activator" flat style="min-width: 48px">
      <img :src="require(`@/assets/${currentLanguage.country}.png`)" width="26px">
    </v-btn>
    <v-list light>
      <v-list-tile
        avatar
        v-for="language in languages"
        :key="language.locale"
        @click="translateI18n(language.locale)"
      >
        <v-list-tile-avatar tile size="24px">
          <img :src="require(`@/assets/${language.country}.png`)" width="24px">
        </v-list-tile-avatar>
        <v-list-tile-title>{{language.name}}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Trans } from '../../translation';

@Component({})
export default class LanguageSwitcher extends Vue {
  get currentLanguage() {
    return this.languages.find(l => l.locale === (this as any).$i18n.locale);
  }

  languages = Trans.supportedLanguages;

  constructor() {
    super();
  }

  translateI18n(lang: any) {
    const to = (this as any).$router.resolve({ params: { lang } });
    return Trans.changeLanguage(lang).then(() => {
      (this as any).$router.push(to.location);
    });
  }
}
</script>
