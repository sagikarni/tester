<template>
<div>
  
  <el-form-item label="Slides">
  
    <div
      id="map-Antananarivo"
      @dragover.prevent
      @drop="onDrop"
      style="border:1px dotted #ccc;background:#efefef;height:60px;margin-bottom:10px;line-height:60px;font-weight:bold;text-align:center"
    >Drop here all media</div>

    <draggable v-model="items" @end="dosome">
      <transition-group>
        <div v-for="(slide,index) in items" :key="slide.id" style="background:#f9f9f9;border:1px solid #dcdfe6;padding:2px;margin-bottom:10px">
          <dropper v-model="slide.media"></dropper>
          <slot v-bind:slide="slide"></slot>
          <el-button @click="removeSlide(index)" type="text">Remove Slide</el-button>
        </div>
      </transition-group>
    </draggable>
    <el-button @click="addSlide" type="text">Add Slide</el-button>
  </el-form-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';
import dropper from './dropper.vue';
import draggable from 'vuedraggable';
import vue2Dropzone from 'vue2-dropzone';

@Component({
  components: { dropper, draggable, vueDropzone: vue2Dropzone },
})
export default class Slides extends Vue {
  @Prop() value;
  items = [];
  ii = 0;

  mounted() {
    if (this.value && this.value.length > 0) {
      this.items = this.value.map((v, i) => ({ ...v, id: i }));
    }
  }

  removeSlide(index) {
    this.items.splice(index, 1);
    this.$emit('input', this.items);
  }
  addSlide() {
    this.items.push({
      media: [],
      id: this.ii,
    });
    this.ii++;

    this.$emit('input', this.items);
  }

  dosome() {
    console.log('in dosome', this.items);

    this.$emit('input', this.items);
  }

  dropzoneOptions = {
    url: '/',
    autoProcessQueue: false,
    myAwesomeDropzone: false,
    autoQueue: false,
  };

  onDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('ffffffff', e.dataTransfer.files);
    if (!e.dataTransfer.files) return;
    if (!e.dataTransfer.files.length) return;

    for (let uu = 0; uu < e.dataTransfer.files.length; uu++) {
      const f = e.dataTransfer.files[uu];

      this.items.push({
        media: [`${f.name}`],
        id: this.ii,
      });
      this.ii++;
    }

    this.$emit('input', this.items);
  }

}
</script>

<style lang="scss">
#drop_zone {
  border: 5px solid blue;
  width: 200px;
  height: 100px;
}

.dropzone {
  padding: 10px;
  min-height: 80px;
  margin-bottom: 10px;
}
.dropzone .dz-message {
  margin: 1em 0;
}
.draggabley {
  margin-bottom: 10px;
  padding: 5px;
  border: 1px dotted #ccc;
}
</style>
