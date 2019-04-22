<template>
  <div id="faq">
    <v-content>
      <v-container fluid pa-0>
        faq
      </v-container>
    </v-content>

    <home-footer/>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Faq extends Vue {}
</script>

<style lang="scss" scoped>
#home {
  background: #f2f2f2;
}
</style>
