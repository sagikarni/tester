<template>
  <el-form-item label="Slides">
    <draggable  v-model="items" @start="drag=true" @end="dosome">
      <div v-for="(slide, index) in value" :key="slide.id" class="draggabley">
        <dropper v-model="slide.media"></dropper>
         <slot v-bind:slide="slide"></slot>
        <el-button @click="removeSlide(index)" type="text">Remove Slide</el-button>
      </div>
    </draggable>
    <el-button @click="addSlide" type="text">Add Slide</el-button>
  </el-form-item>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';
import dropper from './dropper.vue';
import draggable from 'vuedraggable';
@Component({
  components: { draggable, dropper },
})
export default class Slides extends Vue {
  @Prop() value;
  items = [];

  mounted() {
    if (this.value) this.items = this.value;
  }

  removeSlide(index) {
    this.items.splice(index, 1);
    this.$emit('input', this.items);
  }

  addSlide() {
    this.items.push({
      media: [],
    });
    this.$emit('input', this.items);
  }

  dosome() {
    this.$emit('input', this.items);
  }
}
</script>

<style lang="scss">
.dropzone {
  padding: 10px;
  min-height: 80px;
}
.dropzone .dz-message {
  margin: 1em 0;
}
.draggabley {margin-bottom:10px;border:1px dotted #ccc; }
</style>
