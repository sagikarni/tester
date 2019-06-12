<template>
  <div>
    <header>
      <el-button icon="el-icon-plus" type="primary" @click="add">Add New</el-button>

      <div style="margin:0 20px;font-weight:bold;">{{rows}} Rows</div>
    </header>

    <ag-grid-vue
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="data"
      :context="context"
      :frameworkComponents="frameworkComponents"
      :enableCellChangeFlash="true"
      rowHeight="80"
      :gridOptions="gridOptions"
      @modelUpdated="onModelUpdated"
      :floatingFilter="true"
    ></ag-grid-vue>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch, Emit } from 'vue-property-decorator';
import DeleteCell from './delete-cell.vue';
import AudioCell from './cells/audio-cell.vue';
import ImageCell from './cells/image-cell.vue';
import { AgGridVue } from 'ag-grid-vue';

@Component({
  components: { AgGridVue },
})
export default class ArticulationGrid extends Vue {
  @Prop() columnDefs;
  @Prop() data;
  @Prop() gridOptions;
  @Prop() urlPrefix;

  context = { componentParent: this };
  rows = 0;

  private frameworkComponents = {
    deleteCell: DeleteCell,
    audioCell: AudioCell,
    imageCell: ImageCell,
  };

  add() { this.$emit('add'); };

  onModelUpdated(event) {
    this.rows = event.api.getDisplayedRowCount();
  }

  delete(e) {
    this.$emit('delete', e);
  }

  edit(e) {
    this.$emit('edit', e);
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ag-theme-balham {
  width: 100%;
  height: 500px;
  margin: 20px 0;
}
</style>
