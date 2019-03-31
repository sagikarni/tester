<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-container>
          <recover-account-form-component
            :error="error"
            @submit="submit"
          ></recover-account-form-component>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';
import RecoverAccountFormComponent from './recover-account-form.vue';
import { AuthModule } from '../store';

@Component({
  components: { RecoverAccountFormComponent },
})
export default class RecoverAccountPage extends Vue {
  submitted = false;

  get error() {
    return AuthModule.error;
  }

  constructor() {
    super();
  }

  public submit(form: any) {
    this.submitted = true;

    // ApiService.post('users/recover-account', {
    //   email: form.email
    // });
  }
}
</script>
