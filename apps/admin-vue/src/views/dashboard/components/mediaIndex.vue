<template>
  <el-radio-group v-model="radio3" @change="onchange" style="width:100%">
    <el-radio-button label="1" value="1"></el-radio-button>
    <el-radio-button label="2" value="2"></el-radio-button>
    <el-radio-button label="3" value="3"></el-radio-button>
    <el-radio-button label="4" value="4"></el-radio-button>
  </el-radio-group>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

@Component({})
export default class MediaIndex extends Vue {
  @Prop() value;

  radio3 = '';

  mounted() {
    this.radio3 = this.value;
  }

  onchange() {
    this.$emit('input', this.radio3);
  }
}
</script>