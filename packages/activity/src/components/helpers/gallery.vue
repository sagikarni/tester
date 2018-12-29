<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-container grid-list-sm fluid>
          <v-layout row wrap>
            <v-flex v-for="(item,i) in items" :key="i" xs4 d-flex>
              <v-card flat tile class="d-flex" @click="dialog = true">
                <v-img
                  :src="item.pic"
                  :lazy-src="item.lazy"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-layout>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>

    <div class="text-xs-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>What in this activity</v-card-title>

          <v-card-text>
            <v-carousel>
              <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.pic"></v-carousel-item>
            </v-carousel>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-layout>
</template>


<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({})
export default class Gallery extends Vue {
  dialog = false;

  items;

  constructor() {
    super();
    this.items = [];

    for (let i = 0; i < 9; i++) {
      this.items.push({
        pic: `https://picsum.photos/500/300?image=${i * 5 + 10}`,
        lazy: `https://picsum.photos/10/6?image=${i * 5 + 10}`
      });
    }
  }
}
</script>
