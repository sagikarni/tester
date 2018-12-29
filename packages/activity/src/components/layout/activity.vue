<template>
  <section id="activity">
    <Cta :item="item"/>

    <v-btn :to="{ name: routeName }">start!</v-btn>

    <Gallery :images="thumbnails"/>
  </section>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import { DrawerItems } from "tera-core";
import dasherize from "dasherize";

@Component({
  components: {
    Cta: () => import(/* webpackChunkName: "cta" */ "../helpers/cta.vue"),
    Gallery: () =>
      import(/* webpackChunkName: "gallery" */ "../helpers/gallery.vue")
  }
})
export default class Activity extends Vue {
  routeName = "";

  item = {
    name: "learning-photo",
    title: "learning photo activity",
    description: "this is activvity of what in the picture...",
    thumbnails: ["istock-488951890", "istock-532348674", "istock-664350152"]
  };

  get thumbnails() {
    return this.item.thumbnails.map(i => ({
      pic: `/activities/learning-photo/thumbnails/${i}-l.jpg`,
      lazy: `/activities/learning-photo/thumbnails/${i}-m.jpg`
    }));
  }

  constructor() {
    super();
  }

  mounted() {
    const { category } = this.$route.params;

    this.routeName = `${category}/start`;
  }
}
</script>
