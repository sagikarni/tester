<template>
  <v-menu v-if="$vuetify.breakpoint.smAndDown">
    <template v-slot:activator="{ on }">
      <v-btn dark icon v-on="on">
        <v-icon>fas fa-user</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-tile to="login">
        <v-list-tile-title>{{ $t('Vuetify.AppToolbar.login') }}</v-list-tile-title>
      </v-list-tile>
      <v-list-tile to="register">
        <v-list-tile-title>{{ $t('Vuetify.AppToolbar.register') }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
  <v-toolbar-items v-else>
    <v-btn flat to="login">{{ $t('Vuetify.AppToolbar.login') }}</v-btn>
    <v-btn flat to="register">{{ $t('Vuetify.AppToolbar.register') }}</v-btn>
  </v-toolbar-items>
</template>