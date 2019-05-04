<template>
  <div class="pa-4 white">
    <v-container>
      <h3 class="text-uppercase mb-2 headline">SPEECH ACTIVITIES</h3>
      <div v-if="articulations" style="position:relative;">
        <swiper :options="swiperOption">
          <swiper-slide v-for="articulation in articulations" :key="articulation._id">
            <v-card class="display-4 pa-3 speech-feature" style>
              <v-card-title class="inner">{{articulation.name}}</v-card-title>
            </v-card>
          </swiper-slide>
        </swiper>

        <v-btn
          class="swiper-button swiper-button-prev"
          :class="getU('swiper-button-prev')"
          slot="button-prev"
          fab
          light
          small
          color="white"
        >
          <v-icon dark class="font-weight-bold">chevron_left</v-icon>
        </v-btn>
        <v-btn
          class="swiper-button swiper-button-next"
          :class="getU('swiper-button-next')"
          slot="button-next"
          fab
          light
          small
          color="white"
        >
          <v-icon dark class="font-weight-bold">chevron_right</v-icon>
        </v-btn>
      </div>

      <div class="text-xs-center">
        <v-btn round color="white" large>View All</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class SpeechStrips extends Vue {
  id = Math.random()
    .toString(36)
    .substring(7);

  getU(v) {
    return `${v}-${this.id}`;
  }

  public articulations = null;
  swiperOption = {
    slidesPerView: 'auto',
    spaceBetween: 10,
    // on: {
    //   beforeResize() {
    //     if (window.innerWidth >= 640) {
    //       swiper.slides.css('width', '');
    //     }
    //   },
    // },
    // centeredSlides: true,
    // spaceBetween: 30,
    // initialSlide: 0,
    // slidesPerView: 3,
    // spaceBetween: 30,
    // slidesPerView: 3,
    // spaceBetween: 30,
    // watchOverflow: true,

    // slidesPerView: 'auto',
    navigation: {
      nextEl: `.swiper-button-next-${this.id}`,
      prevEl: `.swiper-button-prev-${this.id}`,
    },

    // breakpoints: {
    //   1264: {
    //     slidesPerView: 3,
    //     spaceBetween: 30,
    //   },
    //   960: {
    //     slidesPerView: 2,
    //     spaceBetween: 10,
    //   },
    //   400: {
    //     slidesPerView: 1,
    //     spaceBetween: 0,
    //   },
    // },
  };

  mounted() {
    this.load();
  }

  async load() {
    const res = await this.axios.get(`/activity/articulations`);

    this.articulations = res.data.articulations;
  }
}
</script>


<style lang="scss" scoped>
.swiper-slide {
  width: 250px;
  box-sizing: border-box;
}

.speech-feature {
  background: #0f4d7b;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.16);
  width: 250px;
  height: 195px;
}

.speech-feature .inner {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  border: 2px solid #77a6c7;
  border-radius: 10px;
  font-weight: bold;
}

.swiper-container {
}

.swiper-slide {
  width: 250px;
  // box-shadow: 0 5px 11px 0 #dcdcdc;
}

.swiper-button {
  position: absolute;
  z-index: 10;
  top: 50%;
  margin: 0;
  transform: translateY(-50%);
  background-image: none;
  cursor: pointer;
  &.swiper-button-prev {
    left: -21px;
  }
  &.swiper-button-next {
    right: -21px;
  }
  &:global(.swiper-button-disabled) {
    display: none;
  }
}
.swiper-button.swiper-button-prev.swiper-button-disabled {
  opacity: 0 !important;
}
.swiper-button.swiper-button-next.swiper-button-disabled {
  opacity: 0 !important;
}
</style>
