<template>
  <div>
    <cta/>

    <hero/>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Hero: () =>
      import(/* webpackChunkName: "hero" */ './components/helpers/hero.vue'),
    Cta: () =>
      import(/* webpackChunkName: "cta" */ './components/helpers/cta.vue')
  }
})
export default class Home extends Vue {}
</script>
