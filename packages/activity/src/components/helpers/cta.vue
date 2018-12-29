<template>
  <v-card class="elevation-8 mb-5" tile>
    <v-layout fill-height wrap>
      <v-flex md6 xs12>
        <v-card flat height="100%" tile>
          <v-img height="100%" :src="`//picsum.photos/700/334`"/>
        </v-card>
      </v-flex>

      <v-flex d-flex md6 xs12>
        <v-divider class="mr-4" vertical/>
        <div>
          <h3 class="headline font-weight-medium mb-2" v-text="item.title"/>
          <div class="grey--text mb-4" v-text="item.description"/>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({})
export default class Cta extends Vue {
  item = {
    title: 'hands',
    description: 'this is activvity of what in the picture...'
  };
}
</script>
