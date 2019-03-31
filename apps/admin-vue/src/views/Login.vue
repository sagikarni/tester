<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Via Admin Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="loginForm.username"
                  prepend-icon="person"
                  name="login"
                  label="Login"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="loginForm.password"
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login()">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { UserModule } from '../store/modules/user';

@Component
export default class Login extends Vue {
  private source = '';

  private drawer = null;

  private loginForm = {
    username: '',
    password: '',
  };

  get token() {
    return UserModule.token;
  }

  @Watch('token', { immediate: true, deep: true })
  public onisAuthenticatedChanged(val: string, oldVal: string) {
    console.log({ val });
    if (val) {
      this.$router.push('/dashboard/activities');
    }
  }

  public login() {
    UserModule.Login(this.loginForm);
  }
}
</script>
