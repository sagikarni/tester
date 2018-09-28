<template>
  <div>
    <v-card-text>
      <v-form v-model="valid" ref="form">

        <v-text-field v-model="email" :rules="emailRules" label="What's your email?" required type="email" prepend-icon="person"></v-text-field>
        <v-text-field v-model="password" :rules="passwordRules" prepend-icon="lock" label="What's your password?" type="password" required></v-text-field>

      </v-form>

    </v-card-text>

    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-switch v-model="rememberMe" color="purple"></v-switch>
        </v-list-tile-action>
        <v-list-tile-title>Remember Me</v-list-tile-title>
      </v-list-tile>
    </v-list>

    <v-card-actions class="pa-3">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="submit">Login</v-btn>

    </v-card-actions>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import BaseComponent from '@/modules/common/components/baseComponent.vue';

@Component({})
export default class LoginFormComponent extends BaseComponent {
  public valid = false;
  public rememberMe = true;

  public email = '';
  public password = '';

  public emailRules = [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => v.length <= 255 || 'E-mail must be less than 255 characters',
    (v: string) =>
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      ) || 'E-mail must be valid'
  ];

  public passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) =>
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
      'password should contain at least one digit, one lower case, one upper case, and at least 8 from the mentioned characters'
  ];

  constructor() {
    super();
  }

  submit() {
    const { form }: any = this.$refs;
    if (!form.validate()) return;

    const { email, password, rememberMe } = this;
    this.$emit('submit', { email, password, rememberMe });
  }
}
</script>

