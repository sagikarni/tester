<template>
    <v-list>
        <v-list-tile>
            <v-list-tile-action>
                <v-switch :disabled="facebookLoading" @change="facebookChange" v-model="currentUser.facebook" color="purple"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Connect with facebook</v-list-tile-title>
            <v-progress-circular v-if="facebookLoading" :size="50" color="primary" indeterminate></v-progress-circular>
        </v-list-tile>

        <v-list-tile>
            <v-list-tile-action>
                <v-switch :disabled="twitterLoading" @change="twitterChange" v-model="currentUser.twitter" color="purple"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Connect with twitter</v-list-tile-title>
            <v-progress-circular v-if="twitterLoading" :size="50" color="primary" indeterminate></v-progress-circular>
        </v-list-tile>

        <v-list-tile>
            <v-list-tile-action>
                <v-switch :disabled="googleLoading" @change="googleChange" v-model="currentUser.google" color="purple"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Connect with google</v-list-tile-title>
            <v-progress-circular v-if="googleLoading" :size="50" color="primary" indeterminate></v-progress-circular>
        </v-list-tile>

        <v-list-tile>
            <v-list-tile-action>
                <v-switch :disabled="linkedinLoading" @change="linkedinChange" v-model="currentUser.linkedin" color="purple"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Connect with linkedin</v-list-tile-title>
            <v-progress-circular v-if="linkedinLoading" :size="50" color="primary" indeterminate></v-progress-circular>
        </v-list-tile>
    </v-list>
</template>


<script lang="ts">
import { Component, Watch, Prop } from 'vue-property-decorator';
import BaseComponent from '@/modules/common/components/baseComponent.vue';
import {
  CONNECT_SOCIAL,
  DISCONNECT_SOCIAL,
  connectWith,
  Auth
} from '../index';


@Component({})
export default class SocialConnectComponent extends BaseComponent {
  @Auth.Getter('currentUser')
  currentUser: any;

  @Auth.Action(CONNECT_SOCIAL)
  connectSocial: any;

  @Auth.Action(DISCONNECT_SOCIAL)
  disconnectSocial: any;

  facebookLoading = false;
  twitterLoading = false;
  googleLoading = false;
  linkedinLoading = false;

  constructor() {
    super();
  }

  facebookChange(e: any) {
    this.facebookLoading = true;

    if (e) {
      connectWith('facebook', '/auth/facebook')
        .then(({ token, payload }: any) =>
          this.connectSocial({ token, payload })
        )
        .then(() => {
          this.facebookLoading = false;
        });
    } else {
      this.disconnectSocial('facebook')
        .then((this.facebookLoading = false))
        .catch((error: any) => (this.facebookLoading = false));
    }
  }
  twitterChange(e: boolean) {
    this.twitterLoading = true;

    if (e) {
      connectWith('twitter', '/auth/twitter')
        .then(({ token, payload }: any) =>
          this.connectSocial({ token, payload })
        )
        .then(() => {
          this.twitterLoading = false;
        });
    } else {
      this.disconnectSocial('twitter')
        .then((this.twitterLoading = false))
        .catch((error: any) => (this.twitterLoading = false));
    }
    console.log('in twitterChange', e);
  }

  googleChange(e: boolean) {
    this.googleLoading = true;

    if (e) {
      connectWith('google', '/auth/google')
        .then(({ token, payload }: any) =>
          this.connectSocial({ token, payload })
        )
        .then(() => {
          this.googleLoading = false;
        });
    } else {
      this.disconnectSocial('google')
        .then((this.googleLoading = false))
        .catch((error: any) => (this.googleLoading = false));
    }
    console.log('in googleChange', e);
  }
  linkedinChange(e: boolean) {
    this.linkedinLoading = true;

    if (e) {
      connectWith('linkedin', '/auth/linkedin')
        .then(({ token, payload }: any) =>
          this.connectSocial({ token, payload })
        )
        .then(() => {
          this.linkedinLoading = false;
        });
    } else {
      this.disconnectSocial('linkedin')
        .then((this.linkedinLoading = false))
        .catch((error: any) => (this.linkedinLoading = false));
    }
    console.log('in linkedinChange', e);
  }
}
</script>

