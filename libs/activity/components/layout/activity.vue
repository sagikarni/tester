<template>
  <section id="activity">
    <Cta/>

    <v-btn :to="{ name: 'start' }">start!</v-btn>
  </section>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Cta: () => import(/* webpackChunkName: "cta" */ '../helpers/cta.vue')
  }
})
export default class Activity extends Vue {}
</script>
