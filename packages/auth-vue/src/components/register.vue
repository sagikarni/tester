<template>
  <core-layout>
    <v-content>
      <div class="py-3">
        <div style="max-width: 800px;margin: 0 auto;background:#fff;padding:20px;">
          <header style="display:flex;justify-content:center;">
            <h2 class="headline" style="text-align:center;margin:0 10px;">
              <router-link style="text-decoration:none" to="/login">Login</router-link>
            </h2>
            <h2
              class="headline"
              style="text-align:center;margin:0 10px;border-bottom:2px solid darkblue;"
            >Register</h2>
          </header>
          <div class="login-grid" style="padding:20px 0;">
            <div style="padding:20px;">
              <div style="font-weight:bold;text-align:center;margin-bottom:20px;">Connect With</div>
              <social-login-component></social-login-component>
            </div>
            <div style="background:#888;" class="separator"></div>
            <div style="padding:20px;">
              <div
                style="font-weight:bold;text-align:center;margin-bottom:20px;"
              >Create a Cognishine account</div>
              <register-form-component :error="error" @submit="submit"></register-form-component>
            </div>
          </div>
          <div
            style="display:flex;align-items:center;justify-content:center;flex-direction:column;"
          >
            <div>Already have an account?</div>
            <router-link to="/login">Login</router-link>
          </div>
        </div>
      </div>
    </v-content>
  </core-layout>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { AuthModule } from 'tera-core/src/store/auth-tera.module';
import RegisterFormComponent from './register-form.vue';
import SocialLoginComponent from './social-login.vue';

@Component({
  components: { RegisterFormComponent, SocialLoginComponent },
})
export default class RegisterPage extends Vue {
  submitted = false;

  get error() {
    return AuthModule.error;
  }

  get isAuthenticated() {
    return !!AuthModule.token;
  }
  // @Auth.Action(REGISTER) register;
  // @Auth.Getter('error') error;
  // @Auth.Getter('isAuthenticated') isAuthenticated;

  constructor() {
    super();
  }

  @Watch('isAuthenticated', { immediate: true, deep: true })
  onisAuthenticatedChanged(val: string, oldVal: string) {
    if (val && this.submitted) {
      this.$router.push('/');
    }
  }

  public submit(form: any) {
    this.submitted = true;
    AuthModule.register(form);
  }

   destroyed() {
    AuthModule.clearErrors();
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