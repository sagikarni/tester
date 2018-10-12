<template>
  <v-content>
    <router-view />
    <translation-bar v-if="isTranslating" />
  </v-content>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import NotFoundPage from '@/pages/general/404Page.vue';
import languages from '@/data/i18n/languages.json';

// import {Getter} from 'vuex-class';
import { Translation } from '../../store-trans';

@Component({})
export default class ViewComponent extends Vue {

//  isTranslating = false;
  @Translation.Getter('isTranslating') isTranslating: any;

}
</script>