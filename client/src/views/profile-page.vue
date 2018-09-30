<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>

        <v-alert dismissible :value="currentUser && !currentUser.verified" color="error" icon="new_releases">
          <div v-if="displayMessage">
            You must verify your account <a @click="sendVerifyEmail">Resend Verification Email</a> or contact our support team.
          </div>
          <div v-else>we have sent you a new verification email, please check both your inbox and spam folder.</div>
        </v-alert>

        <v-container>

          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Profile</v-toolbar-title>
            </v-toolbar>

            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img v-if="currentUser.picture" :src="currentUser.picture" />
                  <img v-else src="http://www.gravatar.com/avatar/?d=identicon" />
                </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>{{currentUser.name}}</v-list-tile-title>
                    <v-list-tile-sub-title v-if="currentUser && currentUser.verified">verified</v-list-tile-sub-title>
                    <v-list-tile-sub-title v-else>not verified</v-list-tile-sub-title>
                  </v-list-tile-content>

              </v-list-tile>
            </v-list>

            <v-divider></v-divider>

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

            <router-link to="/password">Change Password</router-link>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn flat @click="menu = false">Cancel</v-btn>
              <v-btn color="primary" flat @click="menu = false">Save</v-btn>
            </v-card-actions>
            <v-divider></v-divider>

            <div>{{currentUser}}</div>
          </v-card>

        </v-container>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script lang="ts">
import { Component, Watch, Prop } from 'vue-property-decorator';
import BaseComponent from '@/modules/common/components/baseComponent.vue';
import {
  REGISTER,
  CONNECT_SOCIAL,
  DISCONNECT_SOCIAL,
  connectWith,
  Auth
  // SocialConnectComponent
} from '@/modules/auth';
import ApiService from '@/shared/api.service';

@Component({
  // components: { SocialConnectComponent }
})
export default class ProfilePage extends BaseComponent {
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

  private displayMessage = true;

  sendVerifyEmail() {
    this.displayMessage = false;
    ApiService.post('users/notify-verify', {}).then((response: any) => {
      console.log('sent');
    });
  }

  constructor() {
    super();
  }

  facebookChange(e: any) {
    this.facebookLoading = true;

    if (e) {
      connectWith('facebook', '/auth/facebook')
        .then(({ accessToken, refreshToken, payload }: any) =>
          this.connectSocial({ accessToken, refreshToken, payload })
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
        .then(({ accessToken, refreshToken, payload }: any) =>
          this.connectSocial({ accessToken, refreshToken, payload })
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
        .then(({ accessToken, refreshToken, payload }: any) =>
          this.connectSocial({ accessToken, refreshToken, payload })
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
        .then(({ accessToken, refreshToken, payload }: any) =>
          this.connectSocial({ accessToken, refreshToken, payload })
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

