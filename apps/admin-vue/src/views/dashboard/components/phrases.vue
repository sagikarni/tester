<template>
  <div style="border:1px dotted #999;margin-bottom:10px;padding:5px;">
    <div v-for="(phrase, index) in phrases" :key="phrase.id">
      <el-input placeholder="Please input" v-model="phrase.value" @change="dosome"></el-input>
      <el-button @click="removePhrase(index)" type="text">Remove Phrase</el-button>
    </div>
    <el-button @click="addPhrase" type="text">Add Phrase</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

@Component({})
export default class Phrases extends Vue {
  @Prop() value;

  phrases = [];

  mounted() {
    if (this.value && this.value.length)
      this.phrases = this.value.map((p) => ({ value: p }));
  }

  addPhrase() {
    this.phrases.push({ value: '' });
  }

  removePhrase(index) {
    this.phrases.splice(index, 1);
  }

  dosome() {
    this.$emit('input', this.phrases.map((p) => p.value));
  }
}
</script>