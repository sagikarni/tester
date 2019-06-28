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
    <v-container fluid style="max-width:1500px;">
      <strip class="feedbacks" :items="feedbacks" title="What customers think about us">
        <v-card color="#0f4d7b" dark slot-scope="slotProps" class="feedback-card">
          <v-card-title>
            <v-avatar :size="80" color="grey lighten-4" class="mr-3">
              <img :src="slotProps.item.avatar" alt="avatar">
            </v-avatar>
            <div class="subheading">
              <div class="font-weight-bold text-uppercase mb-2">{{slotProps.item.author}}</div>
              <div>{{slotProps.item.location}}</div>
            </div>
          </v-card-title>

          <v-card-text class="text subheading mx-2" style="width:auto;">"{{slotProps.item.text}}"</v-card-text>

          <v-card-actions>
            <div style="display:flex;flex:1;justify-content:flex-end;">
              <v-rating v-model="slotProps.item.rate" :readonly="true" color="white" small></v-rating>
            </div>
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
  get feedbacks() {
    return this.$t('Vuetify.Recommendations.feedbacks');
  }
}
</script>

<style lang="scss">
.feedback-card {
  text-align: left;

  .text {
    line-height: 1.5;
  }
}
.feedbacks .swiper-slide {
  width: 400px !important;
}
</style>


