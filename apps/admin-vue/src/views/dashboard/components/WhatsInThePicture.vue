<template>
  <div>
    {{value}}
    <br>

    {{phrases}}
    <div v-for="phrase in phrases" :key="phrase.id">
      <el-form-item label="phrase:">
        <el-input placeholder="Please input" v-model="phrase.value" @change="dosome"></el-input>
      </el-form-item>
    </div>
    <a @click="add">add</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

@Component({})
export default class WhatsInThePicture extends Vue {
  @Prop() value;

  phrases = [];

  mounted() {
    if (this.value && this.value.length)
      this.phrases = this.value.map((p) => ({ value: p }));
  }

  add() {
    this.phrases.push({ value: '' });
  }
  dosome() {
    this.$emit('input', this.phrases.map((p) => p.value));
  }
}
</script>