<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>

        <v-container>
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Profile</v-toolbar-title>
            </v-toolbar>

            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img v-if="currentUser.picture" :src="currentUser.picture">
                  <img v-else src="http://www.gravatar.com/avatar/?d=identicon">
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
import { State, Action, Getter, namespace } from 'vuex-class';
import {
  REGISTER,
  SET_AUTH_SOCIAL,
  DISCONNECT_AUTH_SOCIAL
} from '@/modules/auth';
import { connectWith } from '@/shared/social.service';

const Auth = namespace('auth');

@Component({})
export default class RegisterPage extends BaseComponent {
  @Auth.Getter('currentUser')
  currentUser: any;
  @Auth.Action(SET_AUTH_SOCIAL)
  setAuthSocial: any;

  @Auth.Action(DISCONNECT_AUTH_SOCIAL)
  disconnectAuthSocial: any;

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
          this.setAuthSocial({ token, payload })
        )
        .then(() => {
          this.facebookLoading = false;
        });
    } else {
      this.disconnectAuthSocial({ some: true })
        .then((this.facebookLoading = false))
        .catch((error: any) => (this.facebookLoading = false));
    }
  }
  twitterChange(e: boolean) {
    console.log('in twitterChange', e);
  }
  googleChange(e: boolean) {
    console.log('in googleChange', e);
  }
  linkedinChange(e: boolean) {
    console.log('in linkedinChange', e);
  }
}
</script>

