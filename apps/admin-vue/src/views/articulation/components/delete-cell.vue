<template>
  <span>
    <el-button
      type="primary"
      icon="el-icon-edit"
      circle
      :click="editItem"
    ></el-button>
    <el-button
      type="danger"
      icon="el-icon-delete"
      circle
      :click="deleteItem"
    ></el-button>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

@Component({})
export default class DeleteCell extends Vue {
  params;

  public editItem() {
    debugger;
    this.params.context.componentParent.methodFromParent(
      `Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`
    );
  }

  public deleteItem() {
    debugger;
    this.params.context.componentParent.methodFromParent(
      `Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`
    );
  }
}
</script>
