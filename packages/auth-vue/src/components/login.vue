<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-container>
          <login-form-component :error="error" @submit="submit"></login-form-component>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { AuthModule } from '../store';
import { getModule } from 'vuex-module-decorators';

import LoginFormComponent from './login-form.vue';

@Component({ components: { LoginFormComponent } })
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
