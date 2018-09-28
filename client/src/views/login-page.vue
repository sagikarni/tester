<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>

        <v-container>
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-layout justify-space-around>
                <v-btn @click="loginWithFacebook" flat icon color="lighten-2">
                  <v-icon large>fa fa-facebook</v-icon>
                </v-btn>
                <v-btn @click="loginWithTwitter" flat icon color="lighten-2">
                  <v-icon large>fa fa-twitter</v-icon>
                </v-btn>
                <v-btn @click="loginWithGoogle" flat icon color="lighten-2">
                  <v-icon large>fa fa-google</v-icon>
                </v-btn>
                <v-btn @click="loginWithLinkedin" flat icon color="lighten-2">
                  <v-icon large>fa fa-linkedin</v-icon>
                </v-btn>
              </v-layout>
              <br><br>
              <h3>Or with an account</h3>

              <v-form v-model="valid" ref="form">

                <v-text-field v-model="email" :rules="emailRules" label="Email" required type="email" prepend-icon="person"></v-text-field>
                <v-text-field v-model="password" :rules="passwordRules" prepend-icon="lock" label="Password" type="password" required></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="pa-3">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submit">Login</v-btn>

              <router-link to="/register" class="btn btn-link">Register</router-link>

              <v-divider></v-divider>
              <router-link to="/reset-password" class="btn btn-link">Forget your password?</router-link>

            </v-card-actions>

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
import { LOGIN, SET_AUTH_SOCIAL } from '@/modules/auth';
import { connectWith } from '@/shared/social.service';

const Auth = namespace('auth');

@Component({})
export default class RegisterPage extends BaseComponent {
  @Auth.Action(SET_AUTH_SOCIAL)
  setAuthSocial: any;
  @Auth.Action(LOGIN)
  login: any;

  public valid = false;

  public email = '';
  public password = '';

  public emailRules = [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+/.test(v) || 'E-mail must be valid'
  ];

  public passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) => v.length >= 8 || ''
  ];

  constructor() {
    super();
  }

  public submit() {
    const { form }: any = this.$refs;

    if (!form.validate()) return;

    this.login({
      email: this.email,
      password: this.password
    }).then(() => this.$router.push('/'));
  }

  public loginWithFacebook() {
    connectWith('facebook', '/auth/facebook')
      .then(({ token, payload }: any) => this.setAuthSocial({ token, payload }))
      .then(() => this.$router.push('/'));
  }
  public loginWithTwitter() {
    connectWith('twitter', '/auth/twitter')
      .then(({ token, payload }: any) => this.setAuthSocial({ token, payload }))
      .then(() => this.$router.push('/'));
  }
  public loginWithGoogle() {
    connectWith('google', '/auth/google')
      .then(({ token, payload }: any) => this.setAuthSocial({ token, payload }))
      .then(() => this.$router.push('/'));
  }
  public loginWithLinkedin() {
    connectWith('linkedin', '/auth/linkedin')
      .then(({ token, payload }: any) => this.setAuthSocial({ token, payload }))
      .then(() => this.$router.push('/'));
  }
}
</script>