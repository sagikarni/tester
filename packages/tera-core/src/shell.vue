<template>
  <div>
    <v-app v-cloak>
      <toolbar/>
      <drawer/>
      <v-content>
        <v-fade-transition mode="out-in">
          <router-view/>
        </v-fade-transition>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";

@Component({
  components: {
    Toolbar: () =>
      import(/* webpackChunkName: "toolbar" */ "./components/layout/toolbar.vue"),
    Drawer: () =>
      import(/* webpackChunkName: "drawer" */ "./components/layout/drawer.vue")
  }
})
export default class Shell extends Vue {}
</script>
