<template>
  <div style="border:1px dotted #999;margin-bottom:10px;padding:5px;">
    <el-row
      type="flex"
      justify="space-between"
      v-for="(phrase, index) in phrases"
      :key="phrase.id"
      style="margin-bottom:5px;"
    >
      <el-col :span="21">
        <el-input
          style="width:100%"
          placeholder="Please input"
          v-model="phrase.value"
          @change="dosome"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button
          size="mini"
          @click="removePhrase(index)"
          type="danger"
          icon="el-icon-delete"
          circle
        ></el-button>
      </el-col>
    </el-row>
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
    this.$emit(
      'input',
      this.phrases.filter((p) => !!p.value).map((p) => p.value)
    );
  }

  dosome() {
    this.$emit(
      'input',
      this.phrases.filter((p) => !!p.value).map((p) => p.value)
    );
  }
}
</script>
