<template>
  <core-layout>
    <v-content>
      <div style="max-width:340px;margin:auto;" class="pa-3">
        <recover-account-form-component :submitted="submitted" :error="error" @submit="submit"></recover-account-form-component>
      </div>
    </v-content>
  </core-layout>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';
import RecoverAccountFormComponent from './recover-account-form.vue';
import { AuthModule } from 'tera-core/src/store/auth-tera.module';

@Component({
  components: { RecoverAccountFormComponent },
})
export default class RecoverAccountPage extends Vue {

  get submitted() {
    return AuthModule.recoverAccountSubmitted;
  }

  get error() {
    return AuthModule.error;
  }

  constructor() {
    super();
  }

  public submit(form: any) {
    AuthModule.recoverAccount({ email: form.email });
  }

   destroyed() {
    AuthModule.clearErrors();
  }
}
</script>
