<template>
  <v-toolbar-items v-if="user">
    <v-menu offset-y open-on-hover transition="scale-transition" origin="center center">
      <template v-slot:activator="{ on }">
        <v-btn :ripple="false" flat v-on="on" class="pr-0">
          <v-avatar size="36">
            <img :src="user.picture || require('@/assets/user.png')" alt="avatar">
          </v-avatar>
          <span class="hidden-sm-and-down">&nbsp; {{ name }} &nbsp;</span>
          <v-icon class="hidden-sm-and-down">expand_more</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile @click="gotoBoards">My Boards</v-list-tile>
        <v-list-tile @click="gotoProfile">Profile</v-list-tile>
        <v-divider></v-divider>
        <v-list-tile @click="logout">Logout</v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar-items>

  <v-toolbar-items v-else>
    <v-menu v-if="$vuetify.breakpoint.smAndDown">
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on">
          <v-icon>fas fa-user</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile to="/login">
          <v-list-tile-title>{{ $t('Vuetify.AppToolbar.login') }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile to="/register">
          <v-list-tile-title>{{ $t('Vuetify.AppToolbar.register') }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <template v-else>
      <v-btn flat to="/login">{{ $t('Vuetify.AppToolbar.login') }}</v-btn>
      <v-btn flat to="/register">{{ $t('Vuetify.AppToolbar.register') }}</v-btn>
    </template>
  </v-toolbar-items>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AuthModule } from '../../store/auth-tera.module';

@Component
export default class LoginStatus extends Vue {
  get user() {
    return AuthModule.user;
  }

  logout() {
    AuthModule.logout();
  }

  gotoBoards(){
    this.$router.push(`/boards`);
  }

  gotoProfile(){
    this.$router.push(`/profile`);
  }
  get name() {
    const x = this.user.name.split(' ');
    if (x.length) {
      return x[0];
    }

    return this.user.name;
  }
}
</script>