<template>
  <v-toolbar-items v-if="!isAuthenticated">
    <v-btn flat to="/login">Login</v-btn>
    <v-btn flat to="/register">Register</v-btn>
  </v-toolbar-items>

  <v-menu v-else :close-on-content-click="false" :nudge-width="200" offset-y>
    <v-avatar slot="activator" class="ml-4" size="40">
      <img v-if="currentUser.picture" :src="currentUser.picture">
      <img v-else src="http://www.gravatar.com/avatar/?d=identicon">
    </v-avatar>
    <v-card>
      <img v-if="currentUser.picture" :src="currentUser.picture" height="250px" aspect-ratio="2.5">
      <img
        v-else
        height="250px"
        aspect-ratio="2.5"
        src="http://www.gravatar.com/avatar/?d=identicon"
      >

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{currentUser.name}}</h3>
          <div v-if="currentUser && currentUser.verified">verified</div>
          <div v-else>not verified</div>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn flat color="orange" to="/profile">Profile</v-btn>
        <v-btn flat color="orange" @click="logout">Log out</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Auth, LOGOUT_ACCOUNT } from '@libs/auth-vue';

@Component({})
export default class LoginStatus extends Vue {
  @Auth.Action(LOGOUT_ACCOUNT) logoutAccount;

  @Auth.Getter('isAuthenticated') isAuthenticated;
  @Auth.Getter('currentUser') currentUser;

  constructor() {
    super();
  }

  logout() {
    this.logoutAccount();
  }
}
</script>
