<template>
  <v-content>
    <v-alert dismissible :value="currentUser && !currentUser.verified" color="error" icon="new_releases">
      <div v-if="displayMessage">
        Please confirm your account. confirming your account will give you
        <b>full access</b> and all future notifications will be sent to this email address. Didn't receive the email? Please check your spam email folder,
        <a @click="sendConfirmEmail">resubmit the request</a> or contact our support team.
      </div>
      <div v-else>Please check your email.</div>
    </v-alert>
    <v-container>
      <transition name="page" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-container>
  </v-content>
</template>


<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { State, Action, namespace, Getter } from 'vuex-class';
import ApiService from '@/shared/api.service';

const auth = namespace('auth');

@Component({})
export default class NormalView extends Vue {
  @auth.Getter('currentUser')
  currentUser: any;

  private displayMessage = true;

  sendConfirmEmail() {
    this.displayMessage = false;
    ApiService.post('users/confirm', {}).then((response: any) => {
      console.log('sent');
    });
  }
}
</script>


<style scoped>
.bottomColor {
  border-bottom: solid 1px #7ea875;
}
.toolbarTitle {
  font-size: 13px;
}
</style>
