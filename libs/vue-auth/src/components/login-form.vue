<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>

    <v-alert dismissible :value="error" color="error" icon="error">
      <div v-if="error === 'PASSWORD' || error === 'NOT_EXIST'">Invalid Credentials</div>
      <div v-else>Cannot login right now, try again later</div>
    </v-alert>

    <v-subheader>
      With Your Social Account
    </v-subheader>

    <v-layout justify-space-around>
      <social-login-component></social-login-component>
    </v-layout>

    <v-divider></v-divider>

    <v-subheader>
      Or
    </v-subheader>

    <v-card-text>
      <v-form v-model="valid" ref="form">

        <v-text-field v-model="email" :rules="emailRules" label="What's your email?" required type="email" prepend-icon="person"></v-text-field>
        <v-text-field v-model="password" :rules="passwordRules" prepend-icon="lock" label="What's your password?" type="password" required></v-text-field>

      </v-form>

      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-switch v-model="rememberMe" color="purple"></v-switch>
          </v-list-tile-action>
          <v-list-tile-title>Remember Me</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <router-link to="/recover-account">Forgot your password?</router-link>
        </v-list-tile>
        <v-list-tile>
          Need an account? &nbsp;<router-link to="/register">Register</router-link>
        </v-list-tile>
      </v-list>
    </v-card-text>

    <v-card-actions class="pa-3">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="submit">Login</v-btn>

    </v-card-actions>

  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SocialLoginComponent from './social-login.vue';

@Component({
  components: { SocialLoginComponent }
})
export default class LoginFormComponent extends Vue {
  @Prop()
  error!: string;

  public valid = false;
  public rememberMe = true;

  public email = '';
  public password = '';

  public emailRules = [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => v.length <= 255 || 'E-mail must be less than 255 characters',
    (v: string) =>
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      ) || 'E-mail must be valid'
  ];

  public passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) =>
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
      'password should contain at least one digit, one lower case, one upper case, and at least 8 from the mentioned characters'
  ];

  constructor() {
    super();
  }

  submit() {
    const { form }: any = this.$refs;
    if (!form.validate()) return;

    const { email, password, rememberMe } = this;
    this.$emit('submit', { email, password, rememberMe });
  }
}
</script>

