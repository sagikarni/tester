<template>
  <v-card class="elevation-0">
        <v-card-text>
      <v-form v-model="valid" ref="form">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="What's your email?"
          required
          type="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="What's your password?"
          type="password"
          required
        ></v-text-field>
      </v-form>

      <v-switch v-model="rememberMe" color="purple" label="Keep me loggedin"></v-switch>
      <router-link to="/recover-account">Forgot your password?</router-link>

      <!-- <v-list-tile
          >Need an account? &nbsp;
          <router-link to="/register">Register</router-link>
      </v-list-tile>-->
    </v-card-text>

    <v-card-actions>
      <v-btn color="indigo darken-1" dark @click="submit" block class="v-btn-round">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SocialLoginComponent from './social-login.vue';

@Component({
  components: { SocialLoginComponent },
})
export default class LoginFormComponent extends Vue {
  @Prop()
  error!: string;

  valid = false;
  rememberMe = true;

  email = 'wizardnet972@gmail.com';
  password = 'Shlomi972';

  emailRules = [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => v.length <= 255 || 'E-mail must be less than 255 characters',
    (v: string) =>
      // tslint:disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      ) || 'E-mail must be valid',
  ];

  passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) =>
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
      'password should contain at least one digit, one lower case, one upper case, and at least 8 from the mentioned characters',
  ];

  constructor() {
    super();
  }

  submit() {
    const { form }: any = this.$refs;
    if (!form.validate()) {
      return;
    }

    const { email, password, rememberMe } = this;
    this.$emit('submit', { email, password, rememberMe });
  }
}
</script>

<style lang="scss" scoped>
.v-btn-round {
  border-radius: 8px;
}
</style>
