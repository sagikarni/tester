<template>
  <div class="pa-4 white">
    <v-container >
      <h3 class="text-uppercase mb-2 headline">SPEECH ACTIVITIES</h3>
      <div v-if="articulations">
        <swiper :options="swiperOption">
          <swiper-slide v-for="articulation in articulations" :key="articulation._id">
            <v-card class="display-4 pa-3 speech-feature" style>
              <v-card-title class="inner">{{articulation.name}}</v-card-title>
            </v-card>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <div class="text-xs-center">
          <v-btn round color="white" large>View All</v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class SpeechStrips extends Vue {
  public articulations = null;
  swiperOption = {
    slidesPerView: 'auto',
    spaceBetween: 20,
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
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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
</style>
