<template>
  <core-layout>
    <v-content>
      <div style="max-width:340px;margin:auto;" class="pa-3">
        <change-password-form-component :error="error" @submit="submit"></change-password-form-component>
      </div>
    </v-content>
  </core-layout>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';
import ChangePasswordFormComponent from './change-password-form.vue';
import { AuthModule } from 'tera-core/src/store/auth-tera.module';

@Component({
  components: { ChangePasswordFormComponent },
})
export default class ChangePasswordPage extends Vue {

  @Watch('submitted', { immediate: true, deep: true })
  onSubmittedChanged(val: string, oldVal: string) {
    if (val) {
      this.$router.push('/');
    }
  }

  get submitted() {
    return AuthModule.changePasswordSubmitted;
  }

  get error() {
    return AuthModule.error;
  }

  constructor() {
    super();
  }

  public submit(form: any) {
    AuthModule.changePassword({ token: this.$route.query.t, password: form.password });
  }

  destroyed() {
    AuthModule.clearErrors();
  }
}
</script>
