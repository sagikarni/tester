<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-container>
          <h1>this is cognition overview... all cognition activities is here...</h1>

          <v-card>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Puzzles</h3>
                <div>Puzzles...</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn
                flat
                color="orange"
                :to="{ name: 'category', params: { category: 'puzzles' }}"
              >activties</v-btn>
            </v-card-actions>
          </v-card>

          <router-view></router-view>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({})
export default class Overview extends Vue {}
</script>
