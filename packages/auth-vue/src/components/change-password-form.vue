<template>
  <div class="mb-3 pa-3">
    <template v-if="!submitted">
      <v-img
        :src="require(`@/assets/forgot.png`)"
        style="clip-path:circle(118px at center);"
        class="mb-3"
      />
      <h1 class="display-1 mb-3">Enter New Password</h1>

      <v-form v-model="valid" ref="form" class="mb-3">
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="What's your password?"
          type="password"
          required
        ></v-text-field>

        <v-text-field
          v-model="repassword"
          :rules="passwordRules"
          label="Again What's your password?"
          type="password"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="#0E4D7B" block @click="submit" dark>Reset password</v-btn>
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
export default class ChangePasswordFormComponent extends Vue {
  @Prop()
  error!: string;

  @Prop() submitted: boolean;

  public valid = false;
  public password;
  public repassword;

  passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) =>
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
      'password should contain at least one digit, one lower case, one upper case, and at least 8 from the mentioned characters',
  ];

  constructor() {
    super();
  }

  submit() {
    const { form }: any = this.$refs;
    if (!form.validate()) {
      return;
    }
    const { password } = this;
    this.$emit('submit', { password });
  }
}
</script>
