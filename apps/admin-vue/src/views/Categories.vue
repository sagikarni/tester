<template>

        <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
                <h1>categories!!!</h1>
              <!-- <v-btn :href="source" icon large target="_blank" v-on="on">
                <v-icon large>code</v-icon>
              </v-btn> -->
            </template>
            <span>Source</span>
          </v-tooltip>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn icon large href="https://codepen.io/johnjleider/pen/EQOYVV" target="_blank" v-on="on">
                <v-icon large>mdi-codepen</v-icon>
              </v-btn>
            </template>
            <span><h1>categories!!!</h1></span>
          </v-tooltip>
        </v-layout>
      </v-container>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Dashboard extends Vue {

    private source = '';

      private dialog = false;
      private drawer = null;
      private items = [
        { icon: 'contacts', text: 'Activities', url: '/dashboard/activities' },
        { icon: 'history', text: 'Recommendations', url: '/dashboard/recommendations' },
        { icon: 'content_copy', text: 'Categories', url: '/dashboard/categories' },
      ];

}
</script>
