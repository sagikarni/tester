<template>
  <div class="white">
    <v-container fluid style="max-width:1500px;">
      <strip :items="articulations" title="Speech Activities">

        <SpeechPreview :articulation="slotProps.item" slot-scope="slotProps"></SpeechPreview>
        <!-- <v-card class="display-4 pa-3 speech-feature" >
          <v-card-title class="inner">{{slotProps.item.name}}</v-card-title>
        </v-card> -->
      </strip>
      <v-layout class="my-2" column align-center justify-center>
        <v-flex>
          <v-btn round color="white" light large to="/articulation">View All</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ArticulationsModule } from '../store/articulations.module';

@Component({
  components: {
    Strip: () => import('./Strip.vue'),
    SpeechPreview: () => import('./speech-preview.vue'),
  },
})
export default class SpeechStrips extends Vue {
  public articulations = null;

  mounted() {
    this.load();
  }

  async load() {
    this.articulations = ArticulationsModule.articulation.all();
  }
}
</script>


<style lang="scss" scoped>
.swiper-slide {
  width: 250px;
  box-sizing: border-box;
}

.articulation-item {
  width:250px;
  height:180px;
}

.speech-feature {
  background: #0f4d7b;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.16);
  width: 250px;
  height: 180px;
}

.speech-feature .inner {
  box-sizing: border-box;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  border: 2px solid #77a6c7;
  border-radius: 10px;
  font-weight: bold;
}

.swiper-container {
}

.swiper-slide {
  width: 250px;
  // box-shadow: 0 5px 11px 0 #dcdcdc;
}

.swiper-button {
  position: absolute;
  z-index: 10;
  top: 50%;
  margin: 0;
  transform: translateY(-50%);
  background-image: none;
  cursor: pointer;
  &.swiper-button-prev {
    left: -21px;
  }
  &.swiper-button-next {
    right: -21px;
  }
  &:global(.swiper-button-disabled) {
    display: none;
  }
}
.swiper-button.swiper-button-prev.swiper-button-disabled {
  opacity: 0 !important;
}
.swiper-button.swiper-button-next.swiper-button-disabled {
  opacity: 0 !important;
}
</style>
