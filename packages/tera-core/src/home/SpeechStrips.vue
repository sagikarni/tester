<template>
  <div>
    <v-container fluid>
      <div v-if="articulations">
        <swiper :options="swiperOption">
          <!-- <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
          <swiper-slide>Slide 10</swiper-slide>-->
          <swiper-slide v-for="articulation in articulations" :key="articulation._id">
            <v-card
              class="display-2 white--text"
              style="display:flex;align-items:center;justify-content:center;height:300px;width:300px;background:#0f4d7b;color:#fff;"
            >{{articulation.name}}</v-card>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
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
}
</style>
