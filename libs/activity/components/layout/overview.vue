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
              <v-btn
                flat
                color="orange"
                :to="{ name: 'category', params: { category: feature.group }}"
              >See all activites</v-btn>
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
export default class Overview extends Vue {
  items = [
    { title: 'Categorization', group: 'categorization' },
    { title: 'PhotoAssembly', group: 'photoassembly' },
    { title: 'Whats in the Picture', group: 'whatsinthepicture' },
    { title: 'SpotTheDifference', group: 'spotthedifference' },
    { title: 'SoundOfLfePhoto', group: 'soundoflfephoto' },
    { title: 'SoundOfLfeSound', group: 'soundoflfesound' },
    { title: 'Memory Cards', group: 'memorycards' },
    { title: 'Commonality', group: 'Commonality' }
  ];
}
</script>
