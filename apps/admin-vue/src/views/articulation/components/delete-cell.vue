<template>
  <span>
    <el-button
      size="mini"
      type="primary"
      icon="el-icon-edit"
      circle
      v-on:click="onEdit"
    ></el-button>
    <el-button
      size="mini"
      type="danger"
      icon="el-icon-delete"
      circle
      v-on:click="onDelete"
    ></el-button>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

@Component({})
export default class DeleteCell extends Vue {
  params;

  public onEdit() {
    this.params.context.componentParent.edit(
      this.params.node.data,
      this.params.context.source
    );
  }

  public onDelete() {
    this.params.context.componentParent.delete(
      this.params.node.data,
      this.params.context.source
    );
  }
}
</script>
