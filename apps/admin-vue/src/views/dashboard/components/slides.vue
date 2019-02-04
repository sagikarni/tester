<template>
  <div>
    <el-form-item label="Slides">
      <div
        id="map-Antananarivo"
        @dragover.prevent
        @drop="onDrop"
        style="border:1px solid #ccc;margin-bottom:10px;padding:3px;text-align:center;"
      >
        <span
          style="display:block;border:2px dashed #aaa;height:60px;line-height:60px;color:#777;"
        >Drop here all media</span>
      </div>

      <draggable v-model="items" @end="dosome">
        <transition-group>
          <div
            v-for="(slide,index) in items"
            :key="slide.id"
            style="background:#f9f9f9;border:1px solid #dcdfe6;padding:2px;margin-bottom:10px"
          >
            <dropper v-model="slide.media" :blobs="slide._blobs"></dropper>
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
import { uniqBy } from 'lodash';

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
    if (!e.dataTransfer.files) return;
    if (!e.dataTransfer.files.length) return;

    const added = [];

    [...e.dataTransfer.files].forEach((f, i) => {
      const filename = f.name.replace(/(-l|-m|-xs)\./g, '.');

      if (added.includes(filename)) return; 
      added.push(filename);

      const img = window.URL.createObjectURL(f);
      this.items.push({
        media: [`${filename}`],
        _blobs: [img],
        id: i
      });
    });

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
