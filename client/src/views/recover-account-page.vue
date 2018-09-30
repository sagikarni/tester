<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>

        <v-container>

          <recover-account-form-component :error="error" @submit="submit"></recover-account-form-component>

        </v-container>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script lang="ts">
import { Component, Watch, Prop } from 'vue-property-decorator';
import BaseComponent from '@/modules/common/components/baseComponent.vue';
import { State, Action, Getter, namespace } from 'vuex-class';
import ApiService from '@/shared/api.service';
import { RecoverAccountFormComponent, Auth } from '@/modules/auth';

@Component({
  components: { RecoverAccountFormComponent }
})
export default class RecoverAccountPage extends BaseComponent {
  submitted = false;

  @Auth.Getter('error')
  error: any;

  constructor() {
    super();
  }

  public submit(form: any) {
    this.submitted = true;

    ApiService.post('users/recover-account', {
      email: form.email
    });
  }
}
</script>