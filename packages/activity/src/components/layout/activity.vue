<template>
  <section id="activity">
    <Cta/>

    <v-btn :to="{ name: routeName }">start!</v-btn>

    <gallery/>
  </section>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { DrawerItems } from 'tera-core';
import dasherize from 'dasherize';

@Component({
  components: {
    Cta: () => import(/* webpackChunkName: "cta" */ '../helpers/cta.vue'),
    Gallery: () =>
      import(/* webpackChunkName: "gallery" */ '../helpers/gallery.vue')
  }
})
export default class Activity extends Vue {
  routeName = '';

  constructor() {
    super();
  }

  mounted() {
    const { category } = (this as any).$route.params;

    this.routeName = `${category}/start`;
  }
}
</script>
