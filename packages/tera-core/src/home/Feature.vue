<template>
  <v-responsive class="text-xs-center pb-4">
    <v-container grid-list-md fluid>
      <v-layout justify-center wrap>
        <v-flex v-for="(feature, i) in features" :key="i" xs6 sm6 md3>
          <v-card class="pa-2">
            <v-img
              width="100%"
              height="100px"
              :alt="feature"
              :src="`https://unsplash.it/300/300?image=${Math.floor(Math.random() * 100) + 1}`"
            >
              <!-- <v-layout
                fill-height
                class="ma-0 pa-2 lightbox white--text"
                style="background-image: linear-gradient(to top, #0a0a0a, rgba(104, 104, 104, 0));"
              >
                <v-flex d-flex xs12 align-end flexbox>
                  <div class="text-xs-center headline">{{feature}}</div>
                </v-flex>
              </v-layout>-->
            </v-img>

            <v-card-actions>
              <v-layout align-center justify-center class="ma-0 pa-2">
                <div class="text-none font-weight-medium text-xs-center subheading">{{feature}}</div>
                <!-- <v-btn round>{{$t('Vuetify.Feature.start')}}</v-btn> -->
              </v-layout>
            </v-card-actions>
            <div style="height:10px;margin:0 -8px -8px;" :class="`${feature.toLocaleLowerCase()}`"></div>
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
