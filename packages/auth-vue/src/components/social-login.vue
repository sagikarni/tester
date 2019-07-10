<template>
  <v-layout column>
    <v-btn
      @click="loginWith('facebook')"
      dark
      large
      color="blue darken-4"
      class="pa-0 text-capitalize btn-r"
    >
      <v-icon left class="lf">fab fa-facebook-f</v-icon>Facebook
    </v-btn>
    <v-btn
      @click="loginWith('twitter')"
      dark
      large
      color="blue lighten-3"
      class="pa-0 text-capitalize btn-r"
    >
      <v-icon left dark class="lf">fab fa-twitter</v-icon>Twitter
    </v-btn>
    <v-btn
      @click="loginWith('google')"
      dark
      large
      color="red darken-4"
      class="pa-0 text-capitalize btn-r"
    >
      <v-icon left dark class="lf">fab fa-google-plus-g</v-icon>Google
    </v-btn>
    <v-btn
      @click="loginWith('linkedin')"
      dark
      large
      color="blue darken-1"
      class="pa-0 text-capitalize btn-r"
    >
      <v-icon left dark class="lf">fab fa-linkedin-in</v-icon>Linkedin
    </v-btn>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AuthModule } from 'tera-core/src/store/auth-tera.module';
// import { connectWith } from '../services';

@Component({})
export default class SocialLoginComponent extends Vue {
  constructor() {
    super();
  }

  public loginWith(vendor: string) {
    (window as any).location = `/access/${vendor}`;
    // connectWith(vendor, vendorUrl)
    //   .then(({ accessToken, refreshToken, payload }: any) =>
    //     AuthModule.connectSocial({ accessToken, refreshToken, payload })
    //   )
    //   .then(() => this.$router.push('/'));
  }
}
</script>

<style lang="scss" scoped>
.lf {
  left: 21px;
  position: absolute;
}

.btn-r {
  border-radius: 8px;
  max-width: 400px;
  margin: auto;
  width:100%;margin-bottom:10px;
}
</style>
