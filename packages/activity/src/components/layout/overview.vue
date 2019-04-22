<template>
  <div id="overview">
    <v-content>
      <v-container grid-list-xl="grid-list-xl">
        <h2 class="text-xs-center headline mb-5 grey--text">
          <span>{{ name }}</span>
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
                  :to="{ name: 'category', params: { category: feature.name } }"
                >See all activites</v-btn>
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
import dasherize from 'dasherize';

@Component({})
export default class Overview extends Vue {
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
    const res = await this.axios.get(`/activity/types/${this.name}`);

    this.items = res.data.types.map((t) => ({
      name: t.name.toLocaleLowerCase(),
      title: t.name,
    }));
  }
}
</script>
