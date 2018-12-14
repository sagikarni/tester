<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-container>
          <h1>home page!</h1>

          <hero/>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Hero: () =>
      import(/* webpackChunkName: "hero" */ './components/helpers/hero.vue')
  }
})
export default class Home extends Vue {}
</script>
