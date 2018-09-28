<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>

        <v-container>
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Forgot Password</v-toolbar-title>
            </v-toolbar>
            <v-card-text>

              <v-form v-model="valid" ref="form">

                <v-text-field v-model="email" :rules="emailRules" label="Email" required type="email" prepend-icon="person"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="pa-3">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submit">Reset</v-btn>

              <v-divider></v-divider>

              <router-link to="/register" class="btn btn-link">Register</router-link>
              <router-link to="/login" class="btn btn-link">Login</router-link>

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
import { LOGIN, SET_AUTH_SOCIAL } from '@/modules/auth';
import { connectWith } from '@/shared/social.service';
import ApiService from '@/shared/api.service';

const Auth = namespace('auth');

@Component({})
export default class RegisterPage extends BaseComponent {
  public valid = false;

  public email = '';

  public emailRules = [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+/.test(v) || 'E-mail must be valid'
  ];

  constructor() {
    super();
  }

  public submit() {
    const { form }: any = this.$refs;

    if (!form.validate()) return;

    ApiService.post('users/reset-password', {
      email: 'wizardnet972@gmail.com'
    });
    //.then(() => this.$router.push('/'));
  }
}
</script>