<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-carousel>
              <v-carousel-item>start</v-carousel-item>
              <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.pic"></v-carousel-item>
              <v-carousel-item>end</v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({})
export default class Start extends Vue {
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
