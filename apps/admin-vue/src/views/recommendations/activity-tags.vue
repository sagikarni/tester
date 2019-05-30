<template>
  <div>
    <draggable v-model="items" @end="onDraggableEnd">
      <transition-group>
        <el-tag
          :key="tag"
          v-for="tag in items"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          <a target="_blank" :href="`/dashboard/activities/${tag}`">{{ tag }}</a>
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

import { ActivitiesModule } from '../../store/activities.module';
import { DomainsModule } from '../../store/domains.module';
import { CategoriesModule } from '../../store/categories.module';
import { StripsModule } from '../../store/strips.module';
import { ArticulationsModule } from '../../store/articulations.module';
import { AppModule } from '../../store/app';

import draggable from 'vuedraggable';

@Component({
  components: { draggable },
})
export default class ActivityTags extends Vue {
  @Prop() ids;

  @Prop() value;
  items = [];

  edit = false;
  // radio3 = '';

  inputValue = '';

  onDraggableEnd() {
    this.$emit('input', this.items);
  }

  @Watch('items') onItems(n, o) {
    this.$emit('input', this.items);
  }

  mounted() {
    if (this.value && this.value.length > 0) {
      this.items = this.value; // .map((v, i) => ({ ...v, id: i }));
    }
  }

  handleClose(tag) {
    console.log({ tag });
    this.value.splice(this.value.indexOf(tag), 1);
  }

  showInput(item) {
    this.edit = true;
    this.$nextTick(() => {
      (this.$refs.saveTagInput as any).$refs.input.focus();
    });
  }

  handleInputConfirm() {
    console.log({ inputValue: this.inputValue });
    if (!this.items.includes(this.inputValue)) {
      if (this.ids.indexOf(this.inputValue) > -1) {
        this.items.push(this.inputValue);
      }
    }
    this.edit = false;
    this.inputValue = '';
  }
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
