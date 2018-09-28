<template>
  <div>
    <v-card-text>
      <v-form v-model="valid" ref="form">

        <v-text-field v-model="name" :rules="nameRules" prepend-icon="person" name="Name" label="What's your name?" required></v-text-field>
        <v-text-field v-model="email" :rules="emailRules" label="What's your email?" required type="email" prepend-icon="email"></v-text-field>
        <v-text-field v-model="password" :rules="passwordRules" prepend-icon="lock" label="New Password" type="password" required></v-text-field>
      </v-form>

      <small>
        By signing up, you agree to the Terms of Service and Privacy Policy, <br/>
                including Cookie Use. Others will be able to find you by email when provided.
            </small>

    </v-card-text>

    <v-card-actions class="pa-3">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="submit">Register</v-btn>

    </v-card-actions>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import BaseComponent from '@/modules/common/components/baseComponent.vue';

@Component({})
export default class RegisterFormComponent extends BaseComponent {
  public valid = false;

  public name = '';
  public email = '';
  public password = '';

  public nameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) => v.length <= 20 || 'Name must be less than 20 characters',
    (v: string) =>
      /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(
        v
      ) || 'Name must be alphabetical characters, for example: "Jon Doe"'
  ];

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

    const { name, email, password } = this;
    this.$emit('submit', { name, email, password });
  }
}
</script>

