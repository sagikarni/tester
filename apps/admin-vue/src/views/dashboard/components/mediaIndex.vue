<template>
  <div>
   <el-radio-group v-model="radio3" @change="onchange">
      <el-radio-button label="1"></el-radio-button>
      <el-radio-button label="2"></el-radio-button>
      <el-radio-button label="3"></el-radio-button>
      <el-radio-button label="4"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

@Component({})
export default class MediaIndex extends Vue {
  @Prop() val;

radio3 = '';

mounted() {
  this.radio3 = this.val;
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