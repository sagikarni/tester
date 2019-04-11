<template>
  <v-container fluid grid-list-lg>
    <v-layout justify-center wrap>
      <v-flex v-for="(feature, i) in features" :key="i" xs12 sm6 md3>
        <v-card>
          <v-img :alt="feature" :aspect-ratio="16/9" :src="`https://picsum.photos/200/300?r=${i}`">
            <v-layout pa-2 ma-0 column fill-height class="lightbox white--text">
              <v-spacer></v-spacer>
              <v-flex shrink>
                <div class="text-xs-center headline">{{feature}}</div>
              </v-flex>
            </v-layout>
          </v-img>

          <v-card-actions>
            <v-layout align-center justify-center :class="`pa-3 feature-bg-${i}`">
              <v-btn round>Start</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    images: [
      '50626c1b-9c5c-458b-a1d3-c2befef9a6ee.png',
      '50626c1b-9c5c-458b-a1d3-c2befef9a6ee.png',
      '50626c1b-9c5c-458b-a1d3-c2befef9a6ee.png',
      '50626c1b-9c5c-458b-a1d3-c2befef9a6ee.png',
    ],
  }),
  computed: {
    features() {
      return this.$t('Vuetify.Home.features');
    },
  },
};
</script>

<style lang="scss" scoped>
.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}

.headline {
  text-transform: uppercase;
  font-weight: bold;
}

.feature-bg-0 {
  background: #736fff;
}
.feature-bg-1 {
  background: #0f4d7b;
}
.feature-bg-2 {
  background: #17d6bc;
}
.feature-bg-3 {
  background: #122544;
}
</style>
