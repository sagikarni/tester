<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Register</v-toolbar-title>
    </v-toolbar>

    <v-alert dismissible :value="error" color="error" icon="error">
      <div v-if="error === 'EMAIL_EXIST'">This email is already registered. Want to
        <router-link to="/login">login</router-link>or
        <router-link to="/recover-account">recover your password?</router-link>
      </div>
      <div v-else>Cannot register right now, try again later</div>
    </v-alert>

    <v-subheader>With Your Social Account</v-subheader>

    <v-layout justify-space-around>
      <social-login-component></social-login-component>
    </v-layout>

    <v-divider></v-divider>

    <v-subheader>Or</v-subheader>

    <v-card-text>
      <v-form v-model="valid" ref="form">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          prepend-icon="person"
          name="Name"
          label="What's your name?"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="What's your email?"
          required
          type="email"
          prepend-icon="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          prepend-icon="lock"
          label="New Password"
          type="password"
          required
        ></v-text-field>
      </v-form>

      <v-list>
        <v-list-tile>
          <router-link to="/login">Already have an account?</router-link>
        </v-list-tile>
        <v-list-tile>
          <small>By registering, you agree to Discord's Terms of Service and Privacy Policy.</small>
        </v-list-tile>
      </v-list>
    </v-card-text>

    <v-card-actions class="pa-3">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="submit">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SocialLoginComponent from './social-login.vue';

@Component({
  components: { SocialLoginComponent }
})
export default class RegisterFormComponent extends Vue {
  @Prop()
  error!: string;

  public valid = false;

  public name = '';
  public email = '';
  public password = '';

  public nameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) => v.length <= 20 || 'Name must be less than 20 characters',
    (v: string) =>
      /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(
        v
      ) || 'Name must be alphabetical characters, for example: "Jon Doe"'
  ];

  public emailRules = [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => v.length <= 255 || 'E-mail must be less than 255 characters',
    (v: string) =>
      // tslint:disable-next-line
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
    if (!form.validate()) {
      return;
    }

    const { name, email, password } = this;
    this.$emit('submit', { name, email, password });
  }
}
</script>

