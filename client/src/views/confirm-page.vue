<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>

        <v-container>
          Confirm your account... just a sec..

        </v-container>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script lang="ts">
import { Component, Watch, Prop } from 'vue-property-decorator';
import BaseComponent from '@/modules/common/components/baseComponent.vue';
import { State, Action, Getter, namespace } from 'vuex-class';
import { CONFIRM_ACCOUNT } from '@/modules/auth';

const Auth = namespace('auth');

@Component({})
export default class ConfirmPage extends BaseComponent {
  @Auth.Action(CONFIRM_ACCOUNT)
  confirmAccount: any;

  @Watch('$route', { immediate: true, deep: true })
  on$routeChanged(val: any, oldVal: any) {
    this.confirm(val.query.t);
  }

  constructor() {
    super();
  }

  confirm(token: string) {
    this.confirmAccount(token).then(() => this.$router.push('/'));
  }
}
</script>

