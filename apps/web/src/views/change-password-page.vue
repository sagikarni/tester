<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>

        <v-container>
          <template v-if="!verified">
            <v-card>

              <v-toolbar dark color="primary">
                <v-toolbar-title>Change Your Password</v-toolbar-title>
              </v-toolbar>

              <v-card-text>

                <v-form v-model="valid" ref="form">

                  <v-text-field v-model="oldPassword" :rules="passwordRules" prepend-icon="lock" label="Old Password" type="password" required></v-text-field>
                  <v-text-field v-model="password" :rules="passwordRules" prepend-icon="lock" label="Password" type="password" required></v-text-field>
                </v-form>

              </v-card-text>

              <v-card-actions class="pa-3">
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit">Change Password</v-btn>
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
import { CHANGE_PASSWORD, connectWith, ApiService, Auth } from '@libs/vue-auth';

@Component({})
export default class ChanagePasswordPage extends Vue {
  submitted = false;
  verified = false;

  public valid = false;
  public password = '';
  public oldPassword = '';

  @Auth.Action(CHANGE_PASSWORD)
  changePassword: any;

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

    this.changePassword({
      oldPassword: this.oldPassword,
      password: this.password
    });
  }
}
</script>