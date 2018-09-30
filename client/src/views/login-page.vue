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
import { Component, Watch } from 'vue-property-decorator';
import BaseComponent from '@/modules/common/components/baseComponent.vue';
import { LoginFormComponent, Auth, LOGIN } from '@/modules/auth';

@Component({
  components: { LoginFormComponent }
})
export default class LoginPage extends BaseComponent {
  submitted = false;

  @Auth.Action(LOGIN)
  login: any;

  @Auth.Getter('error')
  error: any;

  @Auth.Getter('isAuthenticated')
  public isAuthenticated: any;

  @Watch('isAuthenticated', { immediate: true, deep: true })
  onisAuthenticatedChanged(val: string, oldVal: string) {
    if (val && this.submitted) this.$router.push('/');
  }

  constructor() {
    super();
  }

  public submit(form: any) {
    this.submitted = true;
    this.login(form);
  }
}
</script>
