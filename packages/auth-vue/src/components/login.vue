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
import { Component, Watch, Vue } from "vue-property-decorator";
import { Auth, LOGIN } from "../store";
import LoginFormComponent from "./login-form.vue";

@Component({ components: { LoginFormComponent } })
export default class Login extends Vue {
  submitted = false;

  @Auth.Action(LOGIN) login;

  @Auth.Getter("error") error;

  @Auth.Getter("isAuthenticated") isAuthenticated;

  @Watch("isAuthenticated", { immediate: true, deep: true })
  onisAuthenticatedChanged(val: string, oldVal: string) {
    if (val && this.submitted) {
      this.$router.push("/");
    }
  }

  public submit(form: any) {
    this.submitted = true;
    this.login(form);
  }
}
</script>
