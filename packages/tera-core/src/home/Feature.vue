<template>
  <v-responsive class="text-xs-center pb-4">
    <v-container grid-list-xl fluid>
      <v-layout justify-center wrap>
        <v-flex v-for="(feature, i) in features" :key="i" xs12 sm6 lg3>
          <v-card class="elevation-6">
            <v-img
              width="100%"
              :aspect-ratio="1.6"
              :alt="feature"
              :src="`https://unsplash.it/300/300?image=${Math.floor(Math.random() * 100) + 1}`"
            >
              <v-layout
                fill-height
                class="ma-0 pa-0 lightbox white--text"
                style="background-image: linear-gradient(to top, #0a0a0a, rgba(104, 104, 104, 0));"
              >
                <v-flex d-flex xs12 align-end flexbox>
                  <div class="text-xs-center headline">{{feature}}</div>
                </v-flex>
              </v-layout>
            </v-img>

            <v-card-actions :class="`${feature.toLocaleLowerCase()}`">
              <v-layout align-center justify-center class="ma-0 pa-3">
                <v-btn round>{{$t('Vuetify.Feature.start')}}</v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-responsive>
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
</style>
