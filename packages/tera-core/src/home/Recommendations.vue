 <template>
  <div class="primary--text mb-3">
    <!-- <v-container >
      <v-layout align-center justify-center wrap>
        <div :style="`flex: 1 1 ${$vuetify.breakpoint.mdAndDown ? '100%' : 'auto'}`">
          <h3
            :class="$vuetify.breakpoint.smAndDown && 'display-1' || 'display-3'"
            class="font-weight-normal mb-4 mx-3"
            v-html="$t('Vuetify.Recommendations.header')"
          />
        </div>
      </v-layout>
    </v-container>-->
    <v-container :fluid="$vuetify.breakpoint.xlAndUp">
      <strip class="feedbacks" :items="feedbacks" title="What customers think about us">
        <v-card :color="slidesColors[slotProps.item.key]" dark slot-scope="slotProps">
          <v-card-title class="px-3 py-3">
            <v-avatar :size="48" color="grey lighten-4">
              <img :src="slotProps.item.avatar" alt="avatar">
            </v-avatar>
          </v-card-title>

          <v-card-text class="body-1" style="width:auto;">"{{slotProps.item.text}}"</v-card-text>

          <v-card-actions>
            <v-list-tile class="grow">
              <v-list-tile-content v-html="slotProps.item.author"/>

              <v-spacer></v-spacer>
              <v-rating v-model="slotProps.item.rate" :readonly="true" color="white" small></v-rating>
            </v-list-tile>
          </v-card-actions>
        </v-card>
      </strip>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Strip: () => import('./Strip.vue'),
  },
})
export default class Recommendations extends Vue {
  slidesColors = ['#736eff', '#0e4d7b', '#17d6bc', 'red', 'pink', 'yellow'];

  get feedbacks() {
    return this.$t('Vuetify.Recommendations.feedbacks');
  }
}
</script>

<style lang="scss">
.feedbacks .swiper-slide {
  width: 400px !important;
}
</style>


