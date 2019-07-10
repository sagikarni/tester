<template>
  <div class="mb-3 pa-3">
    <template v-if="!submitted">
      <v-img
        :src="require(`@/assets/forgot.png`)"
        style="clip-path:circle(118px at center);"
        class="mb-3"
      />
      <h1 class="display-1 mb-3">Forgot Password?</h1>
      <p class="mx-2" style="text-align:center;">
        Please provide the email address that you used when you signed up for
        your account. We will send you an email that will allow you to reset
        your password.
      </p>

      <v-form v-model="valid" ref="form" class="mb-3">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="What's your email?"
          required
          type="email"
        ></v-text-field>
      </v-form>

      <p v-if="error" style="color:red;">
        <span v-if="error === 'NOTEXIST'" v-html="$t('Vuetify.RecoverAccount.errors.notexist')"></span>
        <span v-else v-html="$t('Vuetify.RecoverAccount.errors.general')"></span>
      </p>
      <v-btn color="#0E4D7B" block @click="submit" dark>Send verification email</v-btn>
    </template>
    <template v-else>
      <div style="text-align:center;">
        <v-icon class="mb-3" dark size="130" color="#25AE88">check_circle</v-icon>
        <p class="headline">Please check your inbox to reset your account</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class RecoverAccountFormComponent extends Vue {
  @Prop()
  error!: string;

  @Prop() submitted: boolean;

  public valid = false;

  public email = '';

  public emailRules = [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => v.length <= 255 || 'E-mail must be less than 255 characters',
    (v: string) =>
      // tslint:disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      ) || 'E-mail must be valid',
  ];

  constructor() {
    super();
  }

  submit() {
    const { form }: any = this.$refs;
    if (!form.validate()) {
      return;
    }

    const { email } = this;
    this.$emit('submit', { email });
  }
}
</script>
