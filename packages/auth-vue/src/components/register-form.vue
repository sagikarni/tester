<template>
  <v-card class="elevation-0">
    <v-card-text>
      <v-form v-model="valid" ref="form">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          name="Name"
          label="What's your name?"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="What's your email?"
          required
          type="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="New Password"
          type="password"
          required
        ></v-text-field>
      </v-form>

      <small class="mb-2" style="display:block;">
        By registering, you agree to Cognishine's Terms of Service and Privacy
        Policy.
      </small>

      <p v-if="error" style="color:red;">
        <span v-if="error === 'EXIST'" v-html="$t('Vuetify.Register.errors.exist')"></span>
        <span v-else v-html="$t('Vuetify.Register.errors.general')"></span>
      </p>
    </v-card-text>

    <v-card-actions>
      <v-btn color="#0E4D7B" dark @click="submit" block class="v-btn-round">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SocialLoginComponent from './social-login.vue';

@Component({
  components: { SocialLoginComponent },
})
export default class RegisterFormComponent extends Vue {
  @Prop()
  error!: string;

  public valid = false;

  public name = 'shlomi levi';
  public email = 'wizardnet972@gmail.com';
  public password = 'Shlomi972';

  public nameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) => v.length <= 20 || 'Name must be less than 20 characters',
    (v: string) =>
      /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(
        v
      ) || 'Name must be alphabetical characters, for example: "Jon Doe"',
  ];

  public emailRules = [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => v.length <= 255 || 'E-mail must be less than 255 characters',
    (v: string) =>
      // tslint:disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      ) || 'E-mail must be valid',
  ];

  public passwordRules = [
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

    const { name, email, password } = this;
    this.$emit('submit', { name, email, password });
  }
}
</script>

<style lang="scss" scoped>
.v-btn-round {
  border-radius: 8px;
}
</style>
