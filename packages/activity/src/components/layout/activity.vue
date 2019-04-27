<template>
  <div id="activity">
    <v-content>
      <Cta :item="item" v-if="item" :baseUrl="`/storage/${overview}/${category}/${id}/cover-l.jpg`" />

      <v-btn :to="{ name: routeName }">start!</v-btn>

      <Gallery :images="thumbnails" v-if="thumbnails"/>
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
// import { DrawerItems } from 'tera-core';
import dasherize from 'dasherize';
import { startCase } from 'lodash';

// import { activities } from 'tera-core';
const undasherize = (str) => {
  if (str.indexOf('-') === -1) return str;
  return str
    .split('-')
    .map((s) => startCase(s))
    .join('');
};

@Component({
  components: {
    Cta: () => import(/* webpackChunkName: "cta" */ '../helpers/cta.vue'),
    Gallery: () =>
      import(/* webpackChunkName: "gallery" */ '../helpers/gallery.vue'),
  },
})
export default class Activity extends Vue {
  category = '';
  id = '';
  routeName = '';
  item = null;
  overview = '';

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
  get thumbnails() {
    return null;
  }

  constructor() {
    super();
  }

  mounted() {
    const { overview, category, id } = this.$route.params;
    this.overview = startCase(overview);
    this.category = undasherize(category); // startCase(category);
    this.id = id;

    // this.item = activities.find((i) => i.name === id);
    this.routeName = `${category}/start`;

console.log('route: ', this.routeName);

    this.load();
  }

  async load() {
    const res = await this.axios.get(`/activity/activities/${this.category}`);

    this.item = res.data.activities.find((a) => a._id === this.id);
    // this.items = res.data.activities.map((t) => ({
    //       name: t.name.toLocaleLowerCase(),
    //       title: t.name,
    //       _id: t._id
    //     }));
  }
}
</script>
