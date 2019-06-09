<template>
  <v-layout column>
    <v-btn @click="loginWith('facebook', '/auth/facebook')" dark large color="blue darken-4">
      <v-icon left dark>fab fa-facebook-f</v-icon>Facebook
    </v-btn>
    <v-btn @click="loginWith('twitter', '/auth/twitter')" dark large color="blue lighten-3">
      <v-icon left dark>fab fa-twitter</v-icon>Twitter
    </v-btn>
    <v-btn @click="loginWith('google', '/auth/google')" dark large color="red darken-4">
      <v-icon left dark>fab fa-google-plus-g</v-icon>Google
    </v-btn>
    <v-btn @click="loginWith('linkedin', '/auth/linkedin')" dark large color="blue darken-1">
      <v-icon left dark>fab fa-linkedin-in</v-icon>Linkedin
    </v-btn>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AuthModule } from '../store';
import { connectWith } from '../services';

@Component({})
export default class SocialLoginComponent extends Vue {
  constructor() {
    super();
  }

  public loginWith(vendor: string, vendorUrl: string) {
    connectWith(vendor, vendorUrl)
      .then(({ accessToken, refreshToken, payload }: any) =>
        AuthModule.connectSocial({ accessToken, refreshToken, payload })
      )
      .then(() => this.$router.push('/'));
  }
}
</script>
