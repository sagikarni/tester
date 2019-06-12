<template>
  <el-form label-width="120px" v-if="articulation">
    <el-tabs value="syllable">
      <el-tab-pane label="Syllable" name="syllable">
        <el-dialog title="Add/Edit" :visible.sync="dialogSyllableVisible">
          <syllable-form
            v-if="dialogSyllableVisible"
            :syllable="syllable"
            :urlPrefix="`/storage/speech/articulation/${articulation.name}/__FILE__`"
            @discard="onSyllableDiscard"
            @submit="onSyllableSubmit"
          ></syllable-form>
        </el-dialog>

        <articulation-grid
          @add="addSyllable"
          @edit="editSyllable"
          @delete="deleteSyllable"
          :data="articulation.metadata.syllable"
          :columnDefs="syllableColumnDefs"
          :gridOptions="gridOptionsSyllable"
          :urlPrefix="`/storage/speech/articulation/${articulation.name}/__FILE__`"
        ></articulation-grid>
      </el-tab-pane>
      <el-tab-pane label="By Blend" name="blend">
        <el-dialog title="Add/Edit" :visible.sync="dialogBlendVisible">
          <blend-form
            v-if="dialogBlendVisible"
            :blend="blend"
            :items="items"
            :urlPrefix="`/storage/speech/articulation/${articulation.name}/__FILE__`"
            @discard="onBlendDiscard"
            @submit="onBlendSubmit"
          ></blend-form>
        </el-dialog>

        <articulation-grid
          @add="addBlend"
          @edit="editBlend"
          @delete="deleteBlend"
          :data="articulation.metadata.blend"
          :columnDefs="blendColumnDefs"
          :gridOptions="gridOptionsBlend"
          :urlPrefix="`/storage/speech/articulation/${articulation.name}/__FILE__`"
        ></articulation-grid>
      </el-tab-pane>
    </el-tabs>

    <el-form-item label="Storage">
      <span>{{ storageUrl }}</span>
    </el-form-item>

    <el-form-item label="Title">
      <el-input v-model="articulation.title"></el-input>
    </el-form-item>

    <el-form-item label="Description">
      <el-input type="textarea" v-model="articulation.description"></el-input>
    </el-form-item>

    <el-form-item label="Notes">
      <el-input type="textarea" v-model="articulation.notes"></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';
// import request from '../../../utils/request';
import draggable from 'vuedraggable';
// import {VueTransmit} from 'vue-transmit';
import dropper from './dropper.vue';
import { AgGridVue } from 'ag-grid-vue';

import { ActivitiesModule } from '../../../store/activities.module';
import { DomainsModule } from '../../../store/domains.module';
import { CategoriesModule } from '../../../store/categories.module';
import { StripsModule } from '../../../store/strips.module';
import { ArticulationsModule } from '../../../store/articulations.module';
import { AppModule } from '../../../store/app';

import DeleteCell from './delete-cell.vue';
import AudioCell from './cells/audio-cell.vue';
import ImageCell from './cells/image-cell.vue';
import ArticulationGrid from './articulation-grid.vue';
import SyllableForm from './syllable-form.vue';
import BlendForm from './blend-form.vue';
import { ObjectID } from 'bson';

@Component({
  components: {
    ImageCell,
    AudioCell,
    DeleteCell,
    AgGridVue,
    draggable,
    dropper,
    ArticulationGrid,
    SyllableForm,
    BlendForm,
  },
  filters: {
    json(value) {
      return JSON.stringify(value, null, 2);
    },
  },
})
export default class Modely extends Vue {
  @Prop() public articulation;

  get storageUrl() {
    return `E:/sagi-tera-files/speech/articulation/${this.articulation.name}`;
  }

  get items() {
    const a = this.all[this.articulation.name.toLocaleLowerCase()];

    return this.all[this.articulation.name.toLocaleLowerCase()];
  }

  public all = {
    s: [
      'sk',
      'sl',
      'sm',
      'sn',
      'sp',
      'st',
      'sw',
      'skw',
      'skr',
      'str',
      'spl',
      'spr',
    ],
    l: ['bl', 'cl', 'gl', 'fl', 'pl', 'sl'],
    r: [
      'br',
      'cr',
      'dr',
      'fr',
      'gr',
      'tr',
      'pr',
      'shr',
      'thr',
      'ar',
      'er',
      'air',
      'ire',
      'ear',
      'or',
    ],
    w: ['kw'],
  };

  public syllableColumnDefs = [
    { headerName: 'Text', field: 'text', suppressSizeToFit: true },
    { headerName: 'Emphasis', field: 'emphasis' },
    { headerName: 'Type', field: 'type', width: 90 },
    { headerName: 'Location', field: 'location', width: 90 },
    { headerName: 'Syllable', field: 'syllable', width: 90 },
    { headerName: 'Isolate', field: 'isolate', width: 90 },
    {
      headerName: 'Image',
      field: 'media',
      cellRenderer: 'imageCell',
      filter: false,
      sortable: false,
      resizable: false,
    },
    {
      headerName: 'Recording',
      field: 'audio',
      cellRenderer: 'audioCell',
      suppressSizeToFit: true,
      filter: false,
      sortable: false,
      resizable: false,
    },
    {
      cellRenderer: 'deleteCell',
      pinned: 'right',
      filter: false,
      sortable: false,
      resizable: false,
    },
  ];

  public blendColumnDefs = [
    { headerName: 'Text', field: 'text', suppressSizeToFit: true },
    { headerName: 'Emphasis', field: 'emphasis' },
    { headerName: 'Type', field: 'type', width: 90 },
    { headerName: 'Blend', field: 'blend', width: 90 },
    { headerName: 'Isolate', field: 'isolate', width: 90 },
    {
      headerName: 'Image',
      field: 'media',
      cellRenderer: 'imageCell',
      filter: false,
      sortable: false,
      resizable: false,
    },
    {
      headerName: 'Recording',
      field: 'audio',
      cellRenderer: 'audioCell',
      filter: false,
      sortable: false,
      resizable: false,
    },
    {
      cellRenderer: 'deleteCell',
      pinned: 'right',
      filter: false,
      sortable: false,
      resizable: false,
    },
  ];

  private gridOptionsSyllable = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
    },
  };

  private gridOptionsBlend = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: false,
    },
  };

  private dialogSyllableVisible = false;
  private dialogBlendVisible = false;
  private syllable = null;
  private blend = null;

  addSyllable() {
    this.syllable = null;
    this.dialogSyllableVisible = true;
  }

  onSyllableDiscard() {
    this.syllable = null;
    this.dialogSyllableVisible = false;
  }

  onSyllableSubmit({ form }) {
    this.dialogSyllableVisible = false;

    const i = this.articulation.metadata.syllable.findIndex(
      (s) => s._id === form._id
    );
    if (i > -1) {
      this.articulation.metadata.syllable = this.articulation.metadata.syllable.map(
        (s) => (s._id === form._id ? form : s)
      );
    } else {
      this.articulation.metadata.syllable.push({ ...form });
    }

    (this.gridOptionsSyllable as any).api.refreshCells();
  }

  deleteSyllable(syllable) {
    this.articulation.metadata.syllable = this.articulation.metadata.syllable.filter(
      (s) => s._id !== syllable._id
    );
    (this.gridOptionsSyllable as any).api.refreshCells();
  }

  editSyllable(syllable) {
    console.log({ syllable });
    this.syllable = JSON.parse(JSON.stringify(syllable));
    this.dialogSyllableVisible = true;
  }

  addBlend() {
    this.blend = null;
    this.dialogBlendVisible = true;
  }

  onBlendDiscard() {
    this.blend = null;
    this.dialogBlendVisible = false;
  }

  onBlendSubmit({ form }) {
    this.dialogBlendVisible = false;

    const i = this.articulation.metadata.blend.findIndex(
      (s) => s._id === form._id
    );
    if (i > -1) {
      this.articulation.metadata.blend = this.articulation.metadata.blend.map(
        (s) => (s._id === form._id ? form : s)
      );
    } else {
      this.articulation.metadata.blend.push({ ...form });
    }

    (this.gridOptionsBlend as any).api.refreshCells();
  }

  deleteBlend(blend) {
    this.articulation.metadata.blend = this.articulation.metadata.blend.filter(
      (s) => s._id !== blend._id
    );
    (this.gridOptionsBlend as any).api.refreshCells();
  }

  editBlend(blend) {
    console.log({ blend });
    this.blend = JSON.parse(JSON.stringify(blend));
    this.dialogBlendVisible = true;
  }
}
</script>


<style lang="scss">
.ag-theme-balham .ag-ltr .ag-cell {
  display: flex;
  align-items: center;
}
</style>