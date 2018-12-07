<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-container>
          <h1>this is activity page, {{ $route.params.id }}</h1>

          <v-btn :to="{ name: 'start' }">start!</v-btn>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({})
export default class Activity extends Vue {}
</script>
