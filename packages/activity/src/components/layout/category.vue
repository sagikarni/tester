<template>
  <div id="category">
    <v-content>
      <v-container grid-list-xl="grid-list-xl">
        <h2 class="text-xs-center headline mb-5 grey--text">
          <span>activities based on {{ name }}</span>
        </h2>
        <v-layout wrap="wrap">
          <v-flex v-for="(feature, i) in items" :key="i" xs12="xs12" sm6="sm6" md4="md4">
            <v-card>
              <v-img :src="`//picsum.photos/400/147?image=${i}`" aspect-ratio="2.75"></v-img>

              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{ feature.title }}</h3>
                  <div>{{ feature.title }}...</div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn
                  flat
                  color="orange"
                  :to="{ name: 'activity', params: { id: feature.name } }"
                >detail</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
// import { DrawerItems } from 'tera-core';
import dasherize from 'dasherize';

@Component({})
export default class Category extends Vue {

  items = [];
  name = '';

  constructor() {
    super();
  }

  mounted() {
    const { overview } = this.$route.params;
    this.name = overview;

    this.load();
  }

  async load() {
    const res = await this.axios.get(`/activity/category/${this.name}`);

    this.items = res.data.types.map((t) => ({
      name: t.name.toLocaleLowerCase(),
      title: t.name,
    }));
  }

  // items = [];
  // name = '';
  // constructor() {
  //   super();
  // }
  // mounted() {
  //   const { overview, category } = this.$route.params;
  //   this.name = category;
  //   const x = DrawerItems.find((d) => d.name === overview);
  //   if (x) {
  //     const d = x.items
  //       .filter((n) => !n.default)
  //       .map((n) => ({ ...n, name: dasherize(n.name) }));
  //     this.items = d
  //       .find((r) => r.name === category)
  //       .items.filter((r) => !r.default)
  //       .map((n) => ({ ...n, name: dasherize(n.name) }));
  //   }
  // }
}
</script>
