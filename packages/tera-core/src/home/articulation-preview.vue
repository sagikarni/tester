<template>
  <div class="articulation-item display-3 elevation-4">
    <v-responsive :aspect-ratio="1.5">
      <i>{{articulation.sound}}</i>
      {{articulation.name}}
    </v-responsive>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ArticulationPreview extends Vue {
  @Prop() articulation;

  get sound() {
    return this.articulation.sound;
  }

  get name() {
    return this.articulation.name;
  }
}
</script>


<style lang="scss" scoped>
.articulation-item {
  background: #07395e;
  color: #fff;
  // min-height:130px;
  // max-height: 205px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid #888;

  i {
    position: absolute;
    color: #000;
    font-size: 20px;
    top: -1px;
    left: 4px;
    right: auto;
    z-index: 1;
    font-style: normal;
  }
  //   i {
  //     border-top: 27px solid #fff;
  //     border-right: 27px solid transparent;
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 14px;
  //   }
}
</style>

<style lang="scss">
.articulation-item .v-responsive__content {
  display: flex;
  align-items:center;
  justify-content: center;
}
</style>
