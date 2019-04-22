<template>
  <div id="contactus">
    <v-content>
      <v-container fluid pa-0>
        contactus
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
export default class Contactus extends Vue {}
</script>

<style lang="scss" scoped>
#home {
  background: #f2f2f2;
}
</style>
