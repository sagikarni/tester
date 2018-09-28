<template>
    <div>
        <v-btn @click="loginWith('facebook', '/auth/facebook')" flat icon color="blue darken-4">
            <v-icon large>fa fa-facebook</v-icon>
        </v-btn>
        <v-btn @click="loginWith('twitter', '/auth/twitter')" flat icon color="blue lighten-3">
            <v-icon large>fa fa-twitter</v-icon>
        </v-btn>
        <v-btn @click="loginWith('google', '/auth/google')" flat icon color="red darken-4">
            <v-icon large>fa fa-google</v-icon>
        </v-btn>
        <v-btn @click="loginWith('linkedin', '/auth/linkedin')" flat icon color="blue darken-1">
            <v-icon large>fa fa-linkedin</v-icon>
        </v-btn>
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BaseComponent from '@/modules/common/components/baseComponent.vue';
import { namespace } from 'vuex-class';
import { SET_AUTH_SOCIAL } from '@/modules/auth';
import { connectWith } from '@/shared/social.service';

const Auth = namespace('auth');

@Component({})
export default class SocialLoginComponent extends BaseComponent {
  @Auth.Action(SET_AUTH_SOCIAL)
  setAuthSocial: any;

  constructor() {
    super();
  }

  public loginWith(vendor: string, vendorUrl: string) {
    connectWith(vendor, vendorUrl)
      .then(({ token, payload }: any) => this.setAuthSocial({ token, payload }))
      .then(() => this.$router.push('/'));
  }
}
</script>

