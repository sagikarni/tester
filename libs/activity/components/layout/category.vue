<template>
  <section id="overview" class="mb-5">
    <v-container grid-list-xl="grid-list-xl">
      <h2 class="text-xs-center headline mb-5 grey--text">
        <span>{{ $t("Home.domains") }}</span>
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
              <v-btn flat color="orange" :to="{ name: 'activity', params: { id: feature.id }}">detail</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>


<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({})
export default class Category extends Vue {
  items = [
    { title: 'hands', id: '1' },
    { title: 'whats in the picturex', id: '2' },
    { title: 'whats in the picturey', id: '3' },
    { title: 'whats in the picturez', id: '4' }
  ];
}
</script>
