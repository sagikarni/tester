<template>
  <v-responsive class="primary--text py-2">
    <!-- <v-container>
      <v-layout wrap>
        <v-flex sm6 md7>
          <h3
            :class="$vuetify.breakpoint.smAndDown && 'display-1' || 'display-3'"
            class="font-weight-normal mb-4 ml-3"
            v-html="$t('Vuetify.WhyUs.header')"
          />
        </v-flex>
      </v-layout>
    </v-container>-->

    <v-container :fluid="$vuetify.breakpoint.xlAndUp">
      <v-layout wrap class="white--text text-xs-center">
        <v-flex xs12 sm4 class="f-feature feature-printable elevation-4">
          <v-icon color="white" size="85">card_giftcard</v-icon>
          <h3 class="display-1 my-3">{{features.printable.text}}</h3>
          <div class="headline">{{features.printable.description}}</div>
        </v-flex>

        <v-flex xs12 sm4 class="f-feature feature-photos elevation-4">
          <v-icon color="white" size="85">camera_alt</v-icon>
          <h3 class="display-1 my-3">{{features.photos.text}}</h3>
          <div class="headline">{{features.photos.description}}</div>
        </v-flex>

        <v-flex xs12 sm4 class="f-feature feature-videos elevation-4">
          <v-icon color="white" size="85">play_circle_outline</v-icon>
          <h3 class="display-1 my-3">{{features.videos.text}}</h3>
          <div class="headline">{{features.videos.description}}</div>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-xl :fluid="$vuetify.breakpoint.xlAndUp">
      <v-layout justify-center wrap>
        <v-flex v-for="(domain, i) in domains" :key="i" xs12 sm3>
          <v-card class="elevation-4">
            <v-card-title>
              <v-layout column align-center justify-center>
                <h3 class="display-1 font-weight-bold mb-0 pt-3 pb-2">{{domain.text}}</h3>
                <div class="subheading px-3 pb-2">{{domain.description}}</div>
              </v-layout>
            </v-card-title>
            <v-card-actions>
              <v-layout align-center justify-center class="ma-0 pa-0">
                <v-btn
                  dark
                  :class="`${domain.text.toLocaleLowerCase()}`"
                  round
                >{{$t('Vuetify.Feature.start')}}</v-btn>
              </v-layout>
            </v-card-actions>
            <v-img :src="`/storage/${domain.text}/cover.jpg`" :aspect-ratio="1.6"></v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-responsive>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Hero extends Vue {
  get domains() {
    return this.$t('Vuetify.WhyUs.domains');
  }

  get features() {
    return this.$t('Vuetify.WhyUs.features');
  }
}
</script>

<style lang="scss" scoped>
.f-feature {
  box-sizing: border-box;
  box-shadow: 0 0 33px 0 rgba(0, 0, 0, 0.16);
  padding: 20px;

  .headline {
    margin-bottom: 60px;
  }
}

.feature-photos {
  background-color: #736eff;
}

.feature-printable {
  background-color: #0e4d7b;
}

.feature-videos {
  background-color: #132643;
}
</style>
