<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-container>
          <h1>list of activities of puzzles</h1>

          <v-card>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Find the missing peace</h3>
                <div>Find the missing peace...</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="orange" :to="{ name: 'activity', params: { id: 123 }}">detail</v-btn>
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
export default class Puzzle extends Vue {}
</script>
