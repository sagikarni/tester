<template>
  <v-card>
    <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">Cognition</h3>
        <div>Cognition...</div>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn
        flat
        color="orange"
        :to="{ name: 'overview', params: { overview: 'cognition' }}"
      >See all activites</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Hero extends Vue {}
</script>