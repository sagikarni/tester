<template>
  <div>
    <el-select v-model="radio3" placeholder="Select" @change="onchange">
    <el-option label="2" value="2"></el-option>
    <el-option label="3" value="3"></el-option>
    <el-option label="4" value="4"></el-option>
    </el-option>
  </el-select>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

@Component({})
export default class PhotoAssembly extends Vue {
  @Prop() value;

radio3 = '';

mounted() {
  this.radio3 = this.value;
}

onchange() {
  
    this.$emit('input', this.radio3);

}

  // phrases = [];

  // mounted() {
  //   if (this.value && this.value.length)
  //     this.phrases = this.value.map((p) => ({ value: p }));
  // }

  // add() {
  //   this.phrases.push({ value: '' });
  // }
  // dosome() {
  //   this.$emit('input', this.phrases.map((p) => p.value));
  // }
}
</script>