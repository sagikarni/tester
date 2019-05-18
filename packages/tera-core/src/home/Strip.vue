<template>
  <div>
    <div v-if="activities" class="mb-4">
      <h3 class="text-uppercase mb-2 headline">{{title}}</h3>
      <div style="position:relative;">
        <swiper :options="swiperOption">
          <swiper-slide v-for="activity in activities" :key="activity._id">
      
            <v-card width="260"  class="card"
            style=""
      >
              <v-img
                :src="`/storage/${activity.type.domain.name}/${activity.type.name}/${activity._id}/cover-l.jpg`"
                class="white--text"
                height="205px"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3), rgba(0,0,0,.7)"
              >
                <v-card-title class="fill-height align-end" style="box-sizing: border-box;">
                  <div style="text-align:left">
                    <div class="subheading font-weight-bold">{{activity.name}}</div>
                    <div class>{{activity.type.name}}</div>
                  </div>
                </v-card-title>
              </v-img>
            </v-card>
            
          </swiper-slide>
        </swiper>

        <div slot="button-prev">
          <v-btn
            class="swiper-button swiper-button-prev"
            :class="getU('swiper-button-prev')"
            
            fab
            light
            small
            color="white"
          >
            <v-icon dark class="font-weight-bold">chevron_left</v-icon>
          </v-btn>
        </div>
        <div slot="button-next" class="wrap-next">
        <v-btn
          class="swiper-button swiper-button-next"
          :class="getU('swiper-button-next')"
          
          fab
          light
          small
          color="white"
        >
          <v-icon dark class="font-weight-bold">chevron_right</v-icon>
        </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Strip extends Vue {
  id = Math.random()
    .toString(36)
    .substring(7);

  swiperOption = {
    slidesPerView: 'auto',
    spaceBetween: 10,
    speed: 500,
    //  effect: 'fade',
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
    // pagination: {
    //   el: '.swiper-pagination',
    //   dynamicBullets: true,
    // },
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

  @Prop() title;
  @Prop() activities;

  getU(v) {
    return `${v}-${this.id}`;
  }

  // mounted() {
  // }

  // async load() {
  //   const res = await this.axios.get('/activity/collection');

  //   this.activities = res.data.activityCollection[0].items[0].activities;
  // }
}
</script>


<style lang="scss" scoped>
.swiper-container {
      box-sizing: content-box;
    padding: 5px 0 15px 0;

}
.card {
  box-shadow:0 1px 0 rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.15);
  // box-shadow:0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
border-radius:5px;
  &:hover {
transition:all .4s cubic-bezier(.25,.8,.25,1);
//  box-shadow:0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
  }
}
.swiper-slide {
  width: 250px;
  // box-shadow: 0 5px 11px 0 #dcdcdc;
}
.wrap-next {
  position: absolute;
  z-index: 10;
  top: 0%;
  right:0;
  height:100%;
  width:20px;
          // box-shadow: 5px 0 5px -5px #333;
            background-image: linear-gradient(to right,rgba(242, 242, 242, 0), rgba(242,242,242,1));


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

// .xx {
//   transition:all .4s cubic-bezier(.25,.8,.25,1);
//   box-shadow:0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12) ;
//   &:hover {
//     box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
//   }
// }
</style>
