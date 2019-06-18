<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-container>
          <register-form-component :error="error" @submit="submit"></register-form-component>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { AuthModule } from 'tera-core/src/store/auth-tera.module';
import RegisterFormComponent from './register-form.vue';

@Component({
  components: { RegisterFormComponent },
})
export default class RegisterPage extends Vue {
  submitted = false;

  get error() {
    return '';
    // return AuthModule.error;
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
}
</script>
