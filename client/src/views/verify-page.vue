<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>

        <v-container>
          <div v-if="verified">your email has been successfully verified. we transfer you to the homepage...</div>
          <div v-else>Verifies your account, Just a second...</div>

        </v-container>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script lang="ts">
import { Component, Watch, Prop } from 'vue-property-decorator';
import BaseComponent from '@/modules/common/components/baseComponent.vue';
import { VERIFY_ACCOUNT, Auth } from '@/modules/auth';

@Component({})
export default class VerifyPage extends BaseComponent {
  submitted = false;
  verified = false;

  @Auth.Action(VERIFY_ACCOUNT)
  verifyAccount: any;

  @Auth.Getter('isAuthenticated')
  public isAuthenticated: any;

  @Watch('isAuthenticated', { immediate: true, deep: true })
  onisAuthenticatedChanged(val: string, oldVal: string) {
    if (val && this.submitted) {
      this.verified = true;
      setTimeout(() => {
        this.$router.push('/');
      }, 3000);
    }
  }

  @Watch('$route', { immediate: true, deep: true })
  on$routeChanged(val: any, oldVal: any) {
    this.verify(val.query.t);
  }

  constructor() {
    super();
  }

  public verify(token: string) {
    this.submitted = true;
    this.verifyAccount(token);
  }
}
</script>

