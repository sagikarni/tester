<template>
   <div id="activity">
    <v-content>
      activity details page!
     <!-- <Cta :item="item" />

    <v-btn :to="{ name: routeName }">start!</v-btn>

    <Gallery :images="thumbnails" /> -->
    </v-content>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
// import { DrawerItems } from 'tera-core';
import dasherize from 'dasherize';

// import { activities } from 'tera-core';

@Component({
  components: {
    Cta: () => import(/* webpackChunkName: "cta" */ '../helpers/cta.vue'),
    Gallery: () =>
      import(/* webpackChunkName: "gallery" */ '../helpers/gallery.vue'),
  },
})
export default class Activity extends Vue {
  // routeName = '';
  // item = null;

  // get thumbnails() {
  //   return (
  //     (this.item &&
  //       this.item.thumbnails.map((thumbnail) => ({
  //         pic: `/activities/${this.item.name}/thumbnails/${thumbnail}-l.jpg`,
  //         lazy: `/activities/${this.item.name}/thumbnails/${thumbnail}-m.jpg`,
  //       }))) ||
  //     []
  //   );
  // }

  // constructor() {
  //   super();
  // }

  // mounted() {
  //   const { category, id } = this.$route.params;
  //   this.item = activities.find((i) => i.name === id);
  //   this.routeName = `${category}/start`;
  // }
}
</script>
