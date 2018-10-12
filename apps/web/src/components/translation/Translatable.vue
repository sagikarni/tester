<template>
    <v-badge v-if="isTranslating" v-model="isTranslating" left :color="color" class="translatable">
        <v-icon dark slot="badge" @click.capture.prevent="translate(i18n)">mode_edit</v-icon>
        <slot />
    </v-badge>
    <div v-else>
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Translatable extends Vue {
  @Prop()
  i18n: any;
  isTranslating = false;

  constructor() {
    super();
  }
}
</script>



<style lang="stylus">
.translatable {
    cursor: pointer;
}
</style>
