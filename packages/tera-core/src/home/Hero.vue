<template>
  <v-responsive class="black--text">
    <v-container fluid class="hero pa-0">
      <v-layout align-center justify-center row wrap fill-height>
        <v-flex xs12 lg4 xl3 class="text-xs-center intro " :class="{ 'xy0': $vuetify.breakpoint.lgAndUp }">
          <!-- <div class="logo mb-3"> -->
            <!-- <v-img
              class="logo-image"
              alt="Tera Logo"
              :src="require('@/assets/logo.svg')"
              height="28px"
              width="28px"
            /> -->

            <!-- <v-img class="logo-text" :src="require('@/assets/cognishine.svg')" width="83px"/> -->
          <!-- </div> -->

          <h1
            :class="$vuetify.breakpoint.smAndDown && 'headline' || 'display-1'"
            class="font-weight-regular mb-3 pa-1"
            v-html="$t('Vuetify.Home.callout')"
          />

          <h2 class="font-weight-regular">{{$t('Vuetify.Home.subcallout')}}</h2>
          
        </v-flex>
        <v-flex class="xy1" d-flex xs12 lg8 xl9 style="align-self:stretch">
          <!-- <v-card class="pa-0">
            <v-img
              width="100%"
              height="100%"
              :src="`https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100) + 1}`"
            >
              <v-layout
                fill-height
                class="ma-0 pa-2 lightbox white--text"
                style="background-image: linear-gradient(to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3), rgba(0,0,0,.7)"
              >
                <v-flex d-flex xs12 align-end flexbox>
                  <div class="text-xs-center title">feature</div>
                </v-flex>
              </v-layout>
            </v-img>
          </v-card>-->

          <feature/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-responsive>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Feature: () => import('./Feature.vue'),
  },
})
export default class Hero extends Vue {}
</script>

<style lang="scss" scoped>
.hero {
  // background: #010101;
  // background: linear-gradient(bottom right, #010101, #282828);
  background:#eee;
}

.logo {
  width: 129px;
  display: flex;
  flex: 0 0 auto;
  margin: auto;
  .logo-image {
    flex: 0 0 auto;
  }
  .logo-text {
    flex: 0 0 auto;
    margin-top: 4px;
    margin-left: 7px;
  }
}

.intro {
  padding: 20px 0;
&.xy0 {
    padding:179px 0;
  }

  // @media only screen and (min-width: 600px) {
  //   padding: 20px 0;
  // }

  // @media only screen and (min-width: 1000px) {
  //   padding: 179px 0;
  // }

}
  

</style>
