<template>
  <v-app v-cloak>
    <core-toolbar/>

    <core-drawer/>

    <v-content>
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>
