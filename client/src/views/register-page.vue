<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>

        <v-container>
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>

            <v-alert dismissible :value="error" color="error" icon="error">
              <div v-if="error === 'EMAIL_EXIST'">This email is already registered. Want to <router-link to="/login">login</router-link> or <router-link to="/reset-password">recover your password?</router-link>
              </div>
              <div v-else>Cannot register right now, try again later</div>
            </v-alert>

            <v-card-text>

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

              <register-form-component @submit="submit"></register-form-component>

            </v-card-text>
          </v-card>

        </v-container>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import BaseComponent from '@/modules/common/components/baseComponent.vue';
import { namespace } from 'vuex-class';
import { REGISTER } from '@/modules/auth';
import { SocialLoginComponent, RegisterFormComponent } from '@/modules/auth';

const Auth = namespace('auth');

@Component({
  components: { SocialLoginComponent, RegisterFormComponent }
})
export default class RegisterPage extends BaseComponent {
  @Auth.Action(REGISTER)
  register: any;

  @Auth.Getter('error')
  error: any;

  constructor() {
    super();
  }

  public submit(form: any) {
    this.register(form).then(() => this.$router.push('/'));
  }
}
</script>

