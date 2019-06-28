<template>
  <div class="articulation-item display-1 elevation-4">
    <i>{{articulation.sound}}</i>
    {{articulation.name}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class SpeechPreview extends Vue {
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
  height: 205px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid #888;

  i {
    position: absolute;
    color: #000;
    font-size: 20px;
    top: -6px;
    left: 3px;
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

