<template>
  <v-content>
    <v-alert dismissible :value="currentUser && !currentUser.verified" color="error" icon="new_releases">
      <div v-if="displayMessage">
        You must verify your account <a @click="sendVerifyEmail">Resend Verification Email</a> or contact our support team.
      </div>
      <div v-else>we have sent you a new verification email, please check both your inbox and spam folder.</div>
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

  sendVerifyEmail() {
    this.displayMessage = false;
    ApiService.post('users/notify-verify', {}).then((response: any) => {
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
