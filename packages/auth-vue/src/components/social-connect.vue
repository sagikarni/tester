<template>
  <v-list>
    <v-list-tile>
      <v-list-tile-action>
        <v-switch
          :disabled="facebookLoading"
          @change="facebookChange"
          v-model="currentUser.facebook"
          color="purple"
        ></v-switch>
      </v-list-tile-action>
      <v-list-tile-title>Connect with facebook</v-list-tile-title>
      <v-progress-circular
        v-if="facebookLoading"
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-list-tile>

    <v-list-tile>
      <v-list-tile-action>
        <v-switch
          :disabled="twitterLoading"
          @change="twitterChange"
          v-model="currentUser.twitter"
          color="purple"
        ></v-switch>
      </v-list-tile-action>
      <v-list-tile-title>Connect with twitter</v-list-tile-title>
      <v-progress-circular
        v-if="twitterLoading"
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-list-tile>

    <v-list-tile>
      <v-list-tile-action>
        <v-switch
          :disabled="googleLoading"
          @change="googleChange"
          v-model="currentUser.google"
          color="purple"
        ></v-switch>
      </v-list-tile-action>
      <v-list-tile-title>Connect with google</v-list-tile-title>
      <v-progress-circular
        v-if="googleLoading"
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-list-tile>

    <v-list-tile>
      <v-list-tile-action>
        <v-switch
          :disabled="linkedinLoading"
          @change="linkedinChange"
          v-model="currentUser.linkedin"
          color="purple"
        ></v-switch>
      </v-list-tile-action>
      <v-list-tile-title>Connect with linkedin</v-list-tile-title>
      <v-progress-circular
        v-if="linkedinLoading"
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-list-tile>
  </v-list>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import { AuthModule } from 'tera-core/src/store/auth-tera.module';
import { connectWith } from '../services';

@Component({})
export default class SocialConnectComponent extends Vue {
  get currentUser() {
    return AuthModule.user;
  }
  // @Auth.Getter('currentUser')
  // currentUser: any;

  // @Auth.Action(CONNECT_SOCIAL)
  // connectSocial: any;

  // @Auth.Action(DISCONNECT_SOCIAL)
  // disconnectSocial: any;

  facebookLoading = false;
  twitterLoading = false;
  googleLoading = false;
  linkedinLoading = false;

  constructor() {
    super();
  }

  facebookChange(e: any) {
    // this.facebookLoading = true;
    // if (e) {
    //   connectWith('facebook', '/auth/facebook')
    //     .then(({ accessToken, refreshToken, payload }: any) =>
    //       this.connectSocial({ accessToken, refreshToken, payload })
    //     )
    //     .then(() => {
    //       this.facebookLoading = false;
    //     });
    // } else {
    //   this.disconnectSocial('facebook')
    //     .then((this.facebookLoading = false))
    //     .catch((error: any) => (this.facebookLoading = false));
    // }
  }
  twitterChange(e: boolean) {
    // this.twitterLoading = true;
    // if (e) {
    //   connectWith('twitter', '/auth/twitter')
    //     .then(({ accessToken, refreshToken, payload }: any) =>
    //       this.connectSocial({ accessToken, refreshToken, payload })
    //     )
    //     .then(() => {
    //       this.twitterLoading = false;
    //     });
    // } else {
    //   this.disconnectSocial('twitter')
    //     .then((this.twitterLoading = false))
    //     .catch((error: any) => (this.twitterLoading = false));
    // }
    // console.log('in twitterChange', e);
  }

  googleChange(e: boolean) {
    // this.googleLoading = true;
    // if (e) {
    //   connectWith('google', '/auth/google')
    //     .then(({ accessToken, refreshToken, payload }: any) =>
    //       this.connectSocial({ accessToken, refreshToken, payload })
    //     )
    //     .then(() => {
    //       this.googleLoading = false;
    //     });
    // } else {
    //   this.disconnectSocial('google')
    //     .then((this.googleLoading = false))
    //     .catch((error: any) => (this.googleLoading = false));
    // }
    // console.log('in googleChange', e);
  }
  linkedinChange(e: boolean) {
    // this.linkedinLoading = true;
    // if (e) {
    //   connectWith('linkedin', '/auth/linkedin')
    //     .then(({ accessToken, refreshToken, payload }: any) =>
    //       this.connectSocial({ accessToken, refreshToken, payload })
    //     )
    //     .then(() => {
    //       this.linkedinLoading = false;
    //     });
    // } else {
    //   this.disconnectSocial('linkedin')
    //     .then((this.linkedinLoading = false))
    //     .catch((error: any) => (this.linkedinLoading = false));
    // }
    // console.log('in linkedinChange', e);
  }
}
</script>
