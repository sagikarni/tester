<template>
  <div>
    <el-select v-model="radio3" placeholder="Select" @change="onchange">
      <el-option v-for="option in options" :key="option" :label="option" :value="option"></el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

@Component({})
export default class Picker extends Vue {
  @Prop() value;
  @Prop() options;

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