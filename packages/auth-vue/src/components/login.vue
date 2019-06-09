<template>
  <v-content>
    <v-container>
      <div style="max-width:800px;margin:0 auto;background:#fff;">
        <h2 class="text-xs-center mb-3">Login</h2>
        <v-layout wrap justify-center class="mb-3">
          <v-flex xs12 sm6 class="px-3">
            <v-subheader style="justify-content:center">Connect with:</v-subheader>
            <social-login-component></social-login-component>
          </v-flex>
          <v-flex xs12 sm6 class="px-3">
            <v-subheader style="justify-content:center">Login to yours account</v-subheader>
            <login-form-component :error="error" @submit="submit"></login-form-component>
          </v-flex>
        </v-layout>
        <v-layout class="pb-3">
          <v-flex class="text-xs-center">
            Need an account? &nbsp;
            <router-link to="/register">Register</router-link>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { AuthModule } from '../store';
import { getModule } from 'vuex-module-decorators';
import SocialLoginComponent from './social-login.vue';

import LoginFormComponent from './login-form.vue';

@Component({ components: { LoginFormComponent, SocialLoginComponent } })
export default class Login extends Vue {
  submitted = false;

  get error() {
    return AuthModule.error;
  }

  get isAuthenticated() {
    return !!AuthModule.token;
  }

  @Watch('isAuthenticated', { immediate: true, deep: true })
  onisAuthenticatedChanged(val: string, oldVal: string) {
    if (val && this.submitted) {
      this.$router.push('/');
    }
  }

  public submit(form: any) {
    this.submitted = true;
    AuthModule.login(form);
  }
}
</script>
