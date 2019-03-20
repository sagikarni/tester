<template>
  <div>
    <draggable v-model="items" @end="dosome">
      <transition-group>
        <el-tag
          :key="tag"
          v-for="tag in items"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          <a target="_blank" :href="`/dashboard/${tag}`">{{tag}}</a>
        </el-tag>
      </transition-group>
    </draggable>
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
import draggable from 'vuedraggable';

@Component({
  components: { draggable },
})
export default class ActivityTags extends Vue {
  @Prop() value;
  @Prop() options;
  items = [];
  dosome() {
    this.$emit('input', this.items);
  }

  @Watch('value') onValue(n, o) {
    console.log('value!!!', n);

    // if (n !== this.items) {
    //   console.log('need update');
    //   this.items = n.map((v, i) => ({ ...v, id: i }));
    // } else {
    //   console.log('do need');
    // }
    // this.items = this.value.map((v, i) => ({ ...v, id: i }));
    // this.$emit('input', this.items);
  }

  @Watch('items') onItems(n, o) {
    console.log('somehap');
    this.$emit('input', this.items);
  }

  mounted() {
    if (this.value && this.value.length > 0) {
      this.items = this.value;//.map((v, i) => ({ ...v, id: i }));
    }
  }

  edit = false;
  radio3 = '';

  
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
    if (!this.items.includes(this.inputValue)) {
      if (ActivitiesModule.activities.find((a) => a._id === this.inputValue)) {
        this.items.push(this.inputValue);
        this.$emit('input', this.radio3);
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
