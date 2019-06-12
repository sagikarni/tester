<template>
  <div>
    <el-form-item label="Slides">
      <div
        id="dropper-slides"
        @dragleave="endDrag"
        @dragend="endDrag"
        @dragover="onDrag"
        :class="{ drag: hover }"
        @drop="onDrop"
      >
        <span>Drop here all media</span>
      </div>

      <draggable v-model="items" @end="dosome">
        <transition-group>
          <div
            v-for="(slide, index) in items"
            :key="slide.id"
            style="background:#f9f9f9;border:1px solid #dcdfe6;padding:2px;margin-bottom:10px"
          >
            <dropper
              v-model="slide.media"
              :path="slide.path"
              placeholder="Drop here images"
              style="margin-bottom:10px;"
            ></dropper>

            <!-- <dropper v-model="slide.media" :blobs="slide._blobs" :path="slide.path"></dropper> -->
            <slot v-bind:slide="slide"></slot>
            <el-button @click="removeSlide(index)" type="text"
              >Remove Slide</el-button
            >
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

  dropzoneOptions = {
    url: '/',
    autoProcessQueue: false,
    myAwesomeDropzone: false,
    autoQueue: false,
  };

  hover = false;

  @Watch('value') onValue(n, o) {
    console.log('value!!!', n);

    if (n !== this.items) {
      console.log('need update');
      this.items = n.map((v, i) => ({ ...v, id: i }));
    } else {
      console.log('do need');
    }
    // this.items = this.value.map((v, i) => ({ ...v, id: i }));
    // this.$emit('input', this.items);
  }

  @Watch('items') onItems(n, o) {
    console.log('somehap');
    this.$emit('input', this.items);
  }

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
      id: this.items.length, // this.ii,
    });
    this.ii++;

    this.$emit('input', this.items);
  }

  dosome() {
    this.$emit('input', this.items);
  }

  onDrag(e) {
    e.stopPropagation();
    e.preventDefault();

    console.log('in drop');
    this.hover = true;
  }
  endDrag(e) {
    e.stopPropagation();
    e.preventDefault();

    console.log('in drop');
    this.hover = false;
  }

  onDrop(e) {
    this.hover = false;
    e.stopPropagation();
    e.preventDefault();

    this.add(e);
  }

  add(e) {
    if (!e.dataTransfer.files) {
      return;
    }
    if (!e.dataTransfer.files.length) {
      return;
    }

    const added = [];
    [...e.dataTransfer.files].forEach((f, i) => {
      const filename = f.name.replace(/(-l|-s|-m|-xs|hd|web-l|web-s|4k|retina)\./g, '.').toLocaleLowerCase();
      if (added.includes(filename)) {
        return;
      }
      added.push(filename);

      const img = window.URL.createObjectURL(f);

      this.items.push({
        media: [
          {
            name: filename,
            blob: img,
          },
        ],
        id: i,
      });
    });

    this.$emit('input', this.items);
  }
}
</script>

<style lang="scss">
#dropzone {
  border: 2px dashed #888;
  padding: 3.2em;
  min-height: 80px;
  color: #aaa;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  &.dz-drag-hover {
    border: 2px solid #888;
  }

  .dz-message {
    margin: 0;
  }
}

#dropper-slides {
  margin-bottom: 10px;
  span {
    display: block;
    border: 2px dashed #888;
    border-radius: 4px;
    color: #aaa;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 3.2em;
    background: beige;
  }
  &.drag {
    span {
      border: 2px solid #888;
    }
  }
}
</style>
