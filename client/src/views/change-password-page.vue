<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>

        <v-container>
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Change Password</v-toolbar-title>
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

        </v-container>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script lang="ts">
import { Component, Watch, Prop } from 'vue-property-decorator';
import BaseComponent from '@/modules/common/components/baseComponent.vue';
import { State, Action, Getter, namespace } from 'vuex-class';
import { CHANGE_PASSWORD } from '@/modules/auth';
import { connectWith } from '@/shared/social.service';
import ApiService from '@/shared/api.service';

const Auth = namespace('auth');

@Component({})
export default class ChanagePasswordPage extends BaseComponent {
  public valid = false;

  @Auth.Action(CHANGE_PASSWORD)
  changePassword: any;

  public password = '';
  public oldPassword = '';

  public passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) => v.length >= 8 || ''
  ];

  constructor() {
    super();
  }

  public submit() {
    const { form }: any = this.$refs;

    if (!form.validate()) return;

    this.changePassword({
      oldPassword: this.oldPassword,
      password: this.password
    }).then(() => this.$router.push('/'));
  }
}
</script>