<template>
  <v-responsive class="primary--text py-2">
    <v-container>
      <v-layout wrap>
        <v-flex sm6 md7>
          <h3
            :class="$vuetify.breakpoint.smAndDown && 'display-1' || 'display-3'"
            class="font-weight-normal mb-4 ml-3"
            v-html="$t('Vuetify.WhyUs.header')"
          />
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid>
      <v-layout
        justify-center
        align-center
        :column="$vuetify.breakpoint.xsOnly"
        class="white--text"
      >
        <div class="f-feature feature-photos py-5 px-4">
          <div class="display-1 mb-2">{{features.photos.text}}</div>
          <div class="subheading">{{features.photos.description}}</div>
        </div>
        <div class="f-feature feature-printable py-5 px-4">
          <div class="display-1 mb-2">{{features.printable.text}}</div>
          <div class="subheading">{{features.printable.description}}</div>
        </div>
        <div class="f-feature feature-videos py-5 px-4">
          <div class="display-1 mb-2">{{features.videos.text}}</div>
          <div class="subheading">{{features.videos.description}}</div>
        </div>
      </v-layout>
    </v-container>

    <v-responsive class="text-xs-center pb-4">
      <v-container grid-list-xl>
        <v-layout justify-center wrap>
          <v-flex v-for="(domain, i) in domains" :key="i" xs12 sm6 lg3>
            <v-card class="elevation-6">
              <v-card-title>
                <v-layout column align-center justify-center>
                  <h3 class="display-1 font-weight-bold mb-0 pt-3 pb-2">{{domain.text}}</h3>
                  <div class="subheading pb-2">{{domain.description}}</div>
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
  width: 250px;
  height: 250px;
  box-sizing: border-box;
  box-shadow: 0 0 33px 0 rgba(0, 0, 0, 0.16);
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
