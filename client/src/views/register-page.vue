<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>

        <v-container>
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-layout justify-space-around>
                <v-btn @click="loginWithFacebook" flat icon color="red lighten-2">
                  <v-icon large>fa fa-facebook</v-icon>
                </v-btn>

                <v-btn flat icon color="red lighten-2">
                  <v-icon large>fa fa-twitter</v-icon>
                </v-btn>
              </v-layout>

              <v-form v-model="valid" ref="form">

                <v-text-field v-model="name" :rules="nameRules" prepend-icon="person" name="Name" label="Name" required></v-text-field>
                <v-text-field v-model="email" :rules="emailRules" label="Email" required type="email" prepend-icon="person"></v-text-field>
                <v-text-field v-model="password" :rules="passwordRules" prepend-icon="lock" label="Password" type="password" required></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="pa-3">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submit">Register</v-btn>

              <router-link to="/login" class="btn btn-link">Login</router-link>
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
import { REGISTER, SET_AUTH_SOCIAL } from '@/modules/auth';
import { connectWith } from '@/shared/social.service';

const Auth = namespace('auth');

@Component({})
export default class RegisterPage extends BaseComponent {
  @Auth.Action(SET_AUTH_SOCIAL) setAuthSocial: any;
  @Auth.Action(REGISTER) register: any;

  public valid = false;

  public name = '';
  public email = '';
  public password = '';

  public nameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) => v.length <= 20 || 'Name must be less than 20 characters'
  ];

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

    this.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).then(() => this.$router.push({ name: 'NormalView' }));
  }

  public loginWithFacebook() {
    connectWith('facebook', '/auth/facebook')
      .then(({ token, payload }: any) => this.setAuthSocial({ token, payload }))
      .then(() => this.$router.push({ name: 'NormalView' }));
  }
}
</script>

