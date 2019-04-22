<template>
  <div id="privacy">
    <v-content>
      <v-container fluid pa-0>
        privacy

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
export default class Privacy extends Vue {}
</script>

<style lang="scss" scoped>
#home {
  background: #f2f2f2;
}
</style>
