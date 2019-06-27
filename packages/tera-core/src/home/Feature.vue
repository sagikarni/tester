<template>
  <!-- <v-responsive class="text-xs-center"> -->
  <!-- <v-container grid-list-md fluid class="pa-0"> -->
  <v-layout wrap>
    <v-flex v-for="(feature, i) in features" :key="i" xs6 sm6 md6 lg6 xl3 d-flex>
      <v-card
        class="pa-0 card-x"
        style="position:relative;margin:1px;border-radius:0;"
        fill-height
        :to="`${feature.toLocaleLowerCase()}`"
      >
        <v-img
          width="100%"
          height="100%"
          :alt="feature"
          :aspect-ratio="1.3"
          :src="`/storage/${feature}/cover.jpg`"
        >
          <div class="hidden-xl-only cube" :class="[cubes[i], feature.toLocaleLowerCase()]"></div>

          <v-layout
            fill-height
            class="ma-0 lightbox white--text"
            style="position:relative;background-color:rgba(0,0,0,.55) !important;mask-image:linear-gradient(0deg,#000,#000 15%,transparent)"
          >
            <v-flex d-flex xs12 align-end flexbox style>
              <div
                class="title"
                style="display:flex;flex-direction:column;align-items:center;justify-content:center;"
              >
                <h3
                  :class="{ 'title': $vuetify.breakpoint.xsOnly, 'display-1': $vuetify.breakpoint.smAndUp }"
                  class="mb-3"
                >{{feature}}</h3>

                <v-btn
                  v-if="$vuetify.breakpoint.xlOnly"
                  round
                  outline
                  color="white"
                  class="my-3 text-capitalize"
                  :to="`${feature.toLocaleLowerCase()}`"
                >Start</v-btn>

                <div
                  v-if="$vuetify.breakpoint.xlOnly"
                  :class="feature.toLocaleLowerCase()"
                  style="height:10px;width:100%;"
                ></div>
              </div>
            </v-flex>
          </v-layout>
        </v-img>
      </v-card>
    </v-flex>
  </v-layout>
  <!-- </v-container> -->
  <!-- </v-responsive> -->
</template>

<script lang="ts">
export default {
  data: () => ({
    cubes: [
      ['right', 'bottom'],
      ['left', 'bottom'],
      ['right', 'top'],
      ['left', 'top'],
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

.cube {
  width: 16px;
  height: 16px;
  display: inline-block;
  z-index: 10;
  position: absolute;

  &.top {
    top: 0;
  }
  &.bottom {
    bottom: 0;
  }
  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }

  &.right.bottom {
    border-radius: 16px 0px 0px 0px;
  }

  &.left.bottom {
    border-radius: 0px 16px 0px 0px;
  }

&.right.top {
    border-radius: 0px 0px 0px 16px;
  }
  
&.left.top {
    border-radius: 0px 0 16px 0px;
  }

}

.card-x {
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
}
</style>
