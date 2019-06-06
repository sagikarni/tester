<template>
  <div>
    <h3 class="mb-2 headline">{{title}}</h3>
    <div style="position:relative;">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, i) in items" :key="i">
          <slot v-bind:item="{ ...item, key: i }"></slot>
        </swiper-slide>
      </swiper>

      <section slot="button-prev">
        <v-btn
          class="swiper-button swiper-button-prev"
          :class="`swiper-button-prev-${this.unique}`"
          fab
          light
          small
          color="white"
        >
          <v-icon dark class="font-weight-bold">chevron_left</v-icon>
        </v-btn>
      </section>
      <section slot="button-next" class="wrap-next">
        <v-btn
          class="swiper-button swiper-button-next"
          :class="`swiper-button-next-${this.unique}`"
          fab
          light
          small
          color="white"
        >
          <v-icon dark class="font-weight-bold">chevron_right</v-icon>
        </v-btn>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Strip extends Vue {
  @Prop() title;
  @Prop() items;

  unique = Math.random()
    .toString(36)
    .substring(7);

  swiperOption = {
    slidesPerView: 'auto',
    spaceBetween: 10,
    speed: 500,
    navigation: {
      nextEl: `.swiper-button-next-${this.unique}`,
      prevEl: `.swiper-button-prev-${this.unique}`,
    },
  };
}
</script>


<style lang="scss" scoped>
.swiper-container {
  box-sizing: content-box;
  padding: 5px 0 15px 0;
}
.swiper-slide {
  width: 250px;
  // box-shadow: 0 5px 11px 0 #dcdcdc;
}
.wrap-next {
  position: absolute;
  z-index: 10;
  top: 0%;
  right: 0;
  height: 100%;
  width: 20px;
  // box-shadow: 5px 0 5px -5px #333;
  background-image: linear-gradient(
    to right,
    rgba(242, 242, 242, 0),
    rgba(242, 242, 242, 1)
  );
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
