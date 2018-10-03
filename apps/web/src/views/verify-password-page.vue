<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>

        <v-container>

          <template v-if="!verified">
            <v-card>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Choose New Password</v-toolbar-title>
              </v-toolbar>

              <v-card-text>

                <v-form v-model="valid" ref="form">

                  <v-text-field v-model="password" :rules="passwordRules" prepend-icon="lock" label="Password" type="password" required></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions class="pa-3">
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit">Next</v-btn>
              </v-card-actions>

            </v-card>
          </template>

          <template v-else>Your password has been successfully updated. We transfer you to the homepage...</template>

        </v-container>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';
// import BaseComponent from '@/modules/common/components/baseComponent.vue';
import { VERIFY_PASSWORD, Auth } from '@libs/vue-auth';

@Component({})
export default class VerifyPasswordPage extends Vue {
  public valid = false;
  public submitted = false;
  public verified = false;

  public token = '';
  public password = '';

  @Auth.Action(VERIFY_PASSWORD)
  verifyPassword: any;

  @Auth.Getter('isAuthenticated')
  public isAuthenticated: any;

  @Watch('isAuthenticated', { immediate: true, deep: true })
  onisAuthenticatedChanged(val: string, oldVal: string) {
    if (val && this.submitted) {
      this.verified = true;
      setTimeout(() => {
        this.$router.push('/');
      }, 3000);
    }
  }

  @Watch('$route', { immediate: true, deep: true })
  on$routeChanged(val: any, oldVal: any) {
    this.token = val.query.t;
  }

  public passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) =>
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
      'password should contain at least one digit, one lower case, one upper case, and at least 8 from the mentioned characters'
  ];

  constructor() {
    super();
  }

  public submit() {
    const { form }: any = this.$refs;

    if (!form.validate()) return;
    this.submitted = true;

    this.verifyPassword({
      resetPasswordToken: this.token,
      password: this.password
    });
  }
}
</script>