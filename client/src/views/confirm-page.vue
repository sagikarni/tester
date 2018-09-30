<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>

        <v-container>
          <div v-if="confirmed">your email has been successfully verified. we transfer you to the homepage...</div>
          <div v-else>Confirm your account, Just a second...</div>

        </v-container>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script lang="ts">
import { Component, Watch, Prop } from 'vue-property-decorator';
import BaseComponent from '@/modules/common/components/baseComponent.vue';
import { CONFIRM_ACCOUNT, Auth } from '@/modules/auth';

@Component({})
export default class ConfirmPage extends BaseComponent {
  submitted = false;
  confirmed = false;

  @Auth.Action(CONFIRM_ACCOUNT)
  confirmAccount: any;

  @Auth.Getter('isAuthenticated')
  public isAuthenticated: any;

  @Watch('isAuthenticated', { immediate: true, deep: true })
  onisAuthenticatedChanged(val: string, oldVal: string) {
    if (val && this.submitted) {
      this.confirmed = true;
      setTimeout(() => {
        this.$router.push('/');
      }, 3000);
    }
  }

  @Watch('$route', { immediate: true, deep: true })
  on$routeChanged(val: any, oldVal: any) {
    this.confirm(val.query.t);
  }

  constructor() {
    super();
  }

  public confirm(token: string) {
    this.submitted = true;
    this.confirmAccount(token);
  }
}
</script>

