<template>
  <div id="about">
    <v-content>
      <v-container fluid pa-0>
        about

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
export default class About extends Vue {}
</script>

<style lang="scss" scoped>
#home {
  background: #f2f2f2;
}
</style>
