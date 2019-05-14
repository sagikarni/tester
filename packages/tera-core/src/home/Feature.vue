<template>
  <!-- <v-responsive class="text-xs-center"> -->
    <!-- <v-container grid-list-md fluid class="pa-0"> -->
      <v-layout wrap>
        <v-flex v-for="(feature, i) in features" :key="i" xs6 md6 lg3 d-flex>
          <v-card class="pa-0" fill-height :to="`${feature.toLocaleLowerCase()}`">
            <v-img
              width="100%"
              height="100%"
              :alt="feature"
              :aspect-ratio="1.3"
              :src="`https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100) + 1}`"
            >
              <v-layout
                fill-height
                class="ma-0 pa-2 lightbox white--text"
                xstyle="background-image: linear-gradient(to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3), rgba(0,0,0,.7)"
              >
                <v-flex d-flex xs12 align-end flexbox>
                  <div class="text-xs-center title">{{feature}}</div>
                </v-flex>
              </v-layout>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    <!-- </v-container> -->
  <!-- </v-responsive> -->
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

.featue-img {
  height: 100px;
}
</style>
