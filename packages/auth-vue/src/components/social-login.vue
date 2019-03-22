<template>
  <div>
    <v-btn @click="loginWith('facebook', '/auth/facebook')" flat icon color="blue darken-4">
      <v-icon large>fab fa-facebook</v-icon>
    </v-btn>
    <v-btn @click="loginWith('twitter', '/auth/twitter')" flat icon color="blue lighten-3">
      <v-icon large>fab fa-twitter</v-icon>
    </v-btn>
    <v-btn @click="loginWith('google', '/auth/google')" flat icon color="red darken-4">
      <v-icon large>fab fa-google</v-icon>
    </v-btn>
    <v-btn @click="loginWith('linkedin', '/auth/linkedin')" flat icon color="blue darken-1">
      <v-icon large>fab fa-linkedin</v-icon>
    </v-btn>
  </div>
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

