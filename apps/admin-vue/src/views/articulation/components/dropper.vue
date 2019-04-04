<template>
  <div
    id="dropper"
    :class="{ drag: hover }"
    @dragleave="endDrag"
    @dragend="endDrag"
    @dragover="onDrag"
    @drop="onDrop"
    style="position:relative;"
  >
    <span id="dropper-text" style="text-align:center;display:block;">
      {{
      placeholder
      }}
    </span>

    <div style="display:flex;flex-wrap:wrap;">
      <el-card
        v-for="item in value"
        :key="item.image"
        :body-style="{ padding: '0px' }"
        style="width:200px;"
      >
        <img :src="getImage(item)" class="image">

        <div style="padding: 10px;display:flex;justify-content: space-between;">
          <span>{{ item.name }}</span>
          <el-button type="text" @click="remove(item)" icon="el-icon-delete"></el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import vue2Dropzone from 'vue2-dropzone';
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

@Component({
  components: {
    vueDropzone: vue2Dropzone,
  },
})
export default class Dropper extends Vue {
  @Prop() value;
  @Prop() path;
  @Prop() placeholder;

  hover = false;
  items = [];

  getImage(item) {
    if (!item) {
      return;
    }
    if (item.blob) {
      return item.blob;
    }

    if (this.path) {
      let name = item.name;
      const validImageTypes = ['gif', 'jpeg', 'png', 'jpg'];

      if (!validImageTypes.some((a) => item.name.endsWith(a))) {
        name = item.name + '.jpg';
      }

      return this.path.replace('__FILE__', name);
    }
    return item.name;
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

  remove(item) {
    console.log({ item });
    const i = this.items.indexOf(item);
    this.items.splice(i, 1);

    this.$emit('input', this.items);
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
      const filename = f.name.replace(/(-l|-s|-m|-xs)\./g, '.');

      if (added.includes(filename)) {
        return;
      }
      added.push(filename);

      const img = window.URL.createObjectURL(f);

      this.items.push({
        name: filename,
        blob: img,
      });
    });

    this.$emit('input', this.items);
  }
}
</script>

<style lang="scss" scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

#dropper {
  display: block;
  border: 2px dashed #aaa;
  border-radius: 4px;
  min-height: 100px;
  background: #eee;

  #dropper-text {
    color: #aaa;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 1.2em;
  }

  &.drag {
    border: 2px solid #aaa;
  }
}
</style>
