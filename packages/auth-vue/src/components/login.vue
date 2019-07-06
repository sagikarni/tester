<template>
  <core-layout>
    <v-content>
      <div style="max-width: 800px;margin: 0 auto;background:#fff;padding:20px;">
        <h2 style="text-align:center">Login</h2>
        <div class="login-grid" style="padding:20px 0;">
          <div style="padding:20px;">
            <div style="font-weight:bold;text-align:center;margin-bottom:20px;">Connect With</div>
            <social-login-component></social-login-component>
          </div>
          <div style="background:#888;" class="separator"></div>
          <div style="padding:20px;">
            <div style="font-weight:bold;text-align:center;margin-bottom:20px;">Use your Cognishine account</div>
            <login-form-component :error="error" @submit="submit"></login-form-component>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;flex-direction:column;">
          <div>Need an account?</div>
          <router-link to="/register">Register</router-link>
        </div>
      </div>
    </v-content>
  </core-layout>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { AuthModule } from 'tera-core/src/store/auth-tera.module';
import { getModule } from 'vuex-module-decorators';
import SocialLoginComponent from './social-login.vue';

import LoginFormComponent from './login-form.vue';

@Component({ components: { LoginFormComponent, SocialLoginComponent } })
export default class Login extends Vue {
  submitted = false;

  get error() {
    return '';
    // return AuthModule.error;
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

<style lang="scss" scoped>
.login-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
 
}
.separator {
  height: 1px;
  position: relative;
}

.separator:before {
  content: 'or';
  z-index: 2;
  left: 44%;
  top: -12px;
  position: absolute;
  background: #fff;
  width: 55px;
  display: flex;
  justify-content: center;
}

@media only screen and (min-width: 768px) {
  .login-grid {
    grid-template-columns: 1fr 1px 1fr;
  }
  .separator {
    height: auto;
  }

  .separator:before {
    content: 'or';
    z-index: 2;
    left: -5px;
    top: 38%;
    position: absolute;
    background: #fff;
    height: 55px;
    display: flex;
    width: auto;
    align-items: center;
  }
}
</style>
