<template>

  <v-card>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Account Recovery</v-toolbar-title>
    </v-toolbar>

    <v-alert dismissible :value="error" color="error" icon="error">
      <div v-if="error === 'EMAIL_EXIST'">This email is already registered. Want to <router-link to="/login">login</router-link> or <router-link to="/recover-account">recover your password?</router-link>
      </div>
      <div v-else>Cannot recover your account right now, try again later</div>
    </v-alert>

    <v-subheader>
      Recover your Account
    </v-subheader>

    <template v-if="!submitted">
      <v-card-text>
        Please provide the email address that you used when you signed up for your account.
        We will send you an email that will allow you to reset your password.

        <v-spacer></v-spacer>

        <v-form v-model="valid" ref="form">

          <v-text-field v-model="email" :rules="emailRules" label="What's your email?" required type="email" prepend-icon="person"></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-3">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="submit">Send verification email</v-btn>

      </v-card-actions>

    </template>

    <template v-else>

      <v-card-text>
        Please check your inbox to reset your account.
      </v-card-text>
    </template>

  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import BaseComponent from '@/modules/common/components/baseComponent.vue';

@Component({})
export default class RecoverAccountFormComponent extends BaseComponent {
  @Prop()
  error!: string;

  public valid = false;
  public submitted = false;

  public email = '';

  public emailRules = [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => v.length <= 255 || 'E-mail must be less than 255 characters',
    (v: string) =>
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      ) || 'E-mail must be valid'
  ];

  constructor() {
    super();
  }

  submit() {
    const { form }: any = this.$refs;
    if (!form.validate()) return;

    this.submitted = true;
    const { email } = this;
    this.$emit('submit', { email });
  }
}
</script>

