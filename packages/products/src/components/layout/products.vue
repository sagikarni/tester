<template>
  <div id="overview">
    <v-content>
      <v-container grid-list-xl="grid-list-xl">
        <h2 class="text-xs-center headline mb-5 grey--text">
          <span>products</span>
        </h2>
    
      </v-container>
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import dasherize from 'dasherize';

@Component({})
export default class Products extends Vue {
  constructor() {
    super();
  }

}
</script>
