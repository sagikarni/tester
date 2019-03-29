<template>
    <div>
  <v-toolbar
      color="blue darken-3"
      dark
      app
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Via Admin</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <router-view/>
          <!-- <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn :href="source" icon large target="_blank" v-on="on">
                <v-icon large>code</v-icon>
              </v-btn>
            </template>
            <span>Source</span>
          </v-tooltip>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn icon large href="https://codepen.io/johnjleider/pen/EQOYVV" target="_blank" v-on="on">
                <v-icon large>mdi-codepen</v-icon>
              </v-btn>
            </template>
            <span>Codepen</span>
          </v-tooltip> -->
        </v-layout>
      </v-container>
    </v-content>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>


    </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component()
export default class Activities extends Vue {

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
