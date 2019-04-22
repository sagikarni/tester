 <template>
  <div class="primary--text mb-3">
    <v-container >
      <v-layout align-center justify-center wrap>
        <div :style="`flex: 1 1 ${$vuetify.breakpoint.mdAndDown ? '100%' : 'auto'}`">
          <h3
            :class="$vuetify.breakpoint.smAndDown && 'display-1' || 'display-3'"
            class="font-weight-normal mb-4 mx-3"
            v-html="$t('Vuetify.Recommendations.header')"
          />
        </div>
      </v-layout>
    </v-container>
    <v-container>
    <swiper :options="swiperOption" :class="{ 'mx-4': $vuetify.breakpoint.smAndUp }">
      <swiper-slide v-for="(feedback, i) in feedbacks" :key="feedback.author">
        <v-card :color="slidesColors[i]" dark class="pa-3">
          <v-card-title class="px-3 py-0">
            <v-avatar :size="48" color="grey lighten-4">
              <img :src="feedback.avatar" alt="avatar">
            </v-avatar>
          </v-card-title>

          <v-card-text class="body-1" style="width:auto;">"{{feedback.text}}"</v-card-text>

          <v-card-actions>
            <v-list-tile class="grow">
              <v-list-tile-content v-html="feedback.author"/>

              <v-spacer></v-spacer>
              <v-rating v-model="feedback.rate" :readonly="true" color="white" small></v-rating>
            </v-list-tile>
          </v-card-actions>
        </v-card>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Recommendations extends Vue {
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
      600: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
  };

  slidesColors = ['#736eff', '#0e4d7b', '#17d6bc', 'red', 'pink', 'yellow'];

  get feedbacks() {
    return this.$t('Vuetify.Recommendations.feedbacks');
  }
}
</script>

