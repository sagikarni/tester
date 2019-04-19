<template>
  <div>
    <div v-if="activities">
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
        <swiper-slide v-for="activity in activities" :key="activity._id">
          <v-card width="250" class="elevation-8">
            <v-img
              :src="`/storage/${activity.type.domain.name}/${activity.type.name}/${activity._id}/cover-l.jpg`"
              class="white--text"
              height="250px"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title class="fill-height align-end" style="box-sizing: border-box;">
                <div style="text-align:left">
                  <div class="text-uppercase subheading font-weight-bold">{{activity.name}}</div>
                  <div class="">{{activity.type.name}}</div>
                </div>
              </v-card-title>
            </v-img>

            <!-- <v-img
              :src="`/storage/${activity.type.domain.name}/${activity.type.name}/${activity._id}/cover-l.jpg`"
              aspect-ratio="1.3"
            ></v-img>

            <v-card-title>
              
            </v-card-title>

            <v-card-actions
              style="justify-content:center"
              class="pa-1 white--text text-uppercase caption"
              :class="activity.type.domain.name.toLocaleLowerCase()"
            >{{activity.type.domain.name}}</v-card-actions>-->
          </v-card>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Strip extends Vue {
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

  public activities = null;

  mounted() {
    this.load();
  }

  async load() {
    const res = await this.axios.get('/activity/collection');

    this.activities = res.data.activityCollection[0].items[0].activities;
  }
}
</script>


<style lang="scss" scoped>
.swiper-slide {
  width: 250px;
}
</style>
