<template>
  <div>
    <div v-if="activities">
      <swiper :options="swiperOption" :class="{ 'mx-4': $vuetify.breakpoint.smAndUp }">
        <swiper-slide v-for="activity in activities" :key="activity._id">
          <v-card width="250" >
            <v-img
              :src="`/storage/${activity.type.domain.name}/${activity.type.name}/${activity._id}/cover-l.jpg`"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{activity.name}}</h3>
                <div>{{activity.type.name}}</div>
                <div>{{activity.audience}}</div>
                <div>{{activity.type.domain.name}}</div>
              </div>
            </v-card-title>
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
    initialSlide: 0,
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    watchOverflow: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1264: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      960: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      400: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
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

