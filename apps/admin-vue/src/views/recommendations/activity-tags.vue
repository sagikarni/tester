<template>
  <div>
    <el-tag
      :key="tag"
      v-for="tag in value"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >{{tag}}</el-tag>
    <el-input
      class="input-new-tag"
      v-if="edit"
      v-model="inputValue"
      ref="saveTagInput"
      size="mini"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput()">+ Add Activity</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';
import { ActivitiesModule } from '../../store/modules/activities';

@Component({})
export default class ActivityTags extends Vue {
  @Prop() value;
  @Prop() options;

  edit = false;
  radio3 = '';

  mounted() {
    this.radio3 = this.value;
  }

  onchange() {
    this.$emit('input', this.radio3);
  }

  getActivity(id) {
    return ActivitiesModule.activities.find((a) => a._id === id);
  }

  inputVisible = false;
  inputValue = '';

  handleClose(tag) {
    console.log({ tag });
    this.value.splice(this.value.indexOf(tag), 1);
  }

  showInput(item) {
    this.edit = true;
    this.$nextTick(() => {
      this.$refs.saveTagInput.$refs.input.focus();
    });
  }

  handleInputConfirm() {
    console.log({ inputValue: this.inputValue });
    if (!this.value.includes(this.inputValue)) {
      if (ActivitiesModule.activities.find((a) => a._id === this.inputValue)) {
        this.value.push(this.inputValue);
      }
    }
    // this.$emit('input', );
    this.edit = false;
    // let inputValue = this.inputValue;
    // if (inputValue) {
    //   this.dynamicTags.push(inputValue);
    // }
    // this.inputVisible = false;
    this.inputValue = '';
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

<style rel="stylesheet/scss" lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
