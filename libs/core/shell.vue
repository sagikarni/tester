<template>
  <v-app v-cloak>
    <toolbar/>
    <drawer/>

    <v-content>
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Toolbar: () => import('./components/layout/toolbar.vue'),
    Drawer: () => import('./components/layout/drawer.vue')
  }
})
export default class Shell extends Vue {}
</script>
