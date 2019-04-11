<template>
  <v-menu v-if="$vuetify.breakpoint.smAndDown">
    <template v-slot:activator="{ on }">
      <v-btn dark icon v-on="on">
        <v-icon>fas fa-user</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-tile>
        <v-list-tile-title>{{ $t('Vuetify.AppToolbar.login') }}</v-list-tile-title>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-title>{{ $t('Vuetify.AppToolbar.register') }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
  <v-toolbar-items v-else>
    <v-btn flat>{{ $t('Vuetify.AppToolbar.login') }}</v-btn>
    <v-btn flat>{{ $t('Vuetify.AppToolbar.register') }}</v-btn>
  </v-toolbar-items>
</template>