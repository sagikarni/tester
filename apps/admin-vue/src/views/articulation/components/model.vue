<template>
  <el-form :model="form" label-width="120px" v-if="articulation">
    <el-tabs value="syllable">
      <el-tab-pane label="Syllable" name="syllable">
        <div>
          <div style="display:flex;justify-content: space-between;align-items: center;">
            <el-button icon="el-icon-plus" type="primary" @click="addSyllable">Add Syllable</el-button>

            <div style="margin:0 20px;font-weight:bold;">{{syllableRows}} Rows</div>
          </div>

          <el-dialog title="Add/Edit" :visible.sync="dialogSyllableVisible">
            <el-form :model="form" label-width="120px">
              <el-form-item label="Type">
                <el-select v-model="form.type" placeholder="select...">
                  <el-option label="Word" value="Word"></el-option>
                  <el-option label="Phrase" value="Phrase"></el-option>
                  <el-option label="Sentence" value="Sentence"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Text">
                <el-input v-model="form.text" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Emphasis">
                <el-input v-model="form.emphasis" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Location">
                <el-select v-model="form.location" placeholder="select...">
                  <el-option label="Initial" value="Initial"></el-option>
                  <el-option label="Medial" value="Medial"></el-option>
                  <el-option label="Final" value="Final"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Syllable">
                <el-select v-model="form.syllable" placeholder="select...">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                  <el-option label="3" value="3"></el-option>
                  <el-option label="4" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Image:">
                <dropper
                  :path="`/storage/Speech/Articulation/${articulation.name}/__FILE__`"
                  v-model="form.media"
                  placeholder="Drop here image files"
                ></dropper>
              </el-form-item>
              <el-form-item label="Audio:">
                <dropper v-model="form.audio" placeholder="Drop here audio files"></dropper>
              </el-form-item>
              <el-form-item label="Properties">
                <el-checkbox v-model="form.isolate">Isolate</el-checkbox>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogSyllableVisible = false">Cancel</el-button>
              <el-button type="primary" @click="onSaveSyllable">Save</el-button>
            </span>
          </el-dialog>
        </div>

        <ag-grid-vue
          style="width: 100%;height: 500px;margin:20px 0;"
          class="ag-theme-balham"
          :columnDefs="syllableColumnDefs"
          :rowData="articulation.metadata.syllable"
          :context="syllableContext"
          :frameworkComponents="frameworkComponents"
          :enableCellChangeFlash="true"
          rowHeight="80"
          :gridOptions="gridOptionsSyllable"
          @modelUpdated="onSyllableModelUpdated"
          :floatingFilter="true"
        ></ag-grid-vue>
      </el-tab-pane>
      <el-tab-pane label="By Blend" name="blend" :disabled="!articulation.metadata.blend.length">
        <div>
          <div style="display:flex;justify-content: space-between;align-items: center;">
            <el-button icon="el-icon-plus" type="primary" @click="addBlend">Add Blend</el-button>

            <div style="margin:0 20px;font-weight:bold;">{{blendRows}} Rows</div>
          </div>

          <el-dialog title="Add/Edit" :visible.sync="dialogBlendVisible">
            <el-form :model="form">
              <el-form-item label="Type">
                <el-select v-model="form.type" placeholder="select...">
                  <el-option label="Word" value="Word"></el-option>
                  <el-option label="Phrase" value="Phrase"></el-option>
                  <el-option label="Sentence" value="Sentence"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Text" label-width="120px">
                <el-input v-model="form.text" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Emphasis" label-width="120px">
                <el-input v-model="form.emphasis" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Blend">
                <el-select v-model="form.blend" placeholder="select...">
                  <el-option v-for="item in getItems()" :label="item" :value="item" :key="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Image:">
                <dropper v-model="form.media" placeholder="Drop here image files"></dropper>
              </el-form-item>
              <el-form-item label="Audio:">
                <dropper v-model="form.audio" placeholder="Drop here audio files"></dropper>
              </el-form-item>
              <el-form-item label="Properties">
                <el-checkbox v-model="form.isolate">Isolate</el-checkbox>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogBlendVisible = false">Cancel</el-button>
              <el-button type="primary" @click="onSaveBlend">Save</el-button>
            </span>
          </el-dialog>
        </div>

        <ag-grid-vue
          style="width:100%;height:500px;margin:20px 0;"
          class="ag-theme-balham"
          :columnDefs="blendColumnDefs"
          :rowData="articulation.metadata.blend"
          :context="blendContext"
          :frameworkComponents="frameworkComponents"
          :enableCellChangeFlash="true"
          rowHeight="80"
          :gridOptions="gridOptionsBlend"
          @modelUpdated="onBlendModelUpdated"
          :floatingFilter="true"
        ></ag-grid-vue>
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

import { ActivitiesModule } from '../../../store/modules/activities';

import DeleteCell from './delete-cell.vue';
import AudioCell from './cells/audio-cell.vue';
import ImageCell from './cells/image-cell.vue';

const getObjectId = () => {
  const ObjectId = (
    m = Math,
    d = Date,
    h = 16,
    s = (s) => m.floor(s).toString(h)
  ) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
  return ObjectId;
};

@Component({
  components: {
    ImageCell,
    AudioCell,
    DeleteCell,
    AgGridVue,
    draggable,
    dropper,
  },
  filters: {
    json(value) {
      return JSON.stringify(value, null, 2);
    },
  },
})
export default class Modely extends Vue {
  get storageUrl() {
    return `E:/sagi-tera-files/Speech/Articulation/${this.articulation.name}`;
  }
  blendRows = 0;
  syllableRows = 0;
  gridOptionsBlend = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: false,
      //            filter: "agTextColumnFilter"
    },
  };
  gridOptionsSyllable = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true,
      //            filter: "agTextColumnFilter"
    },
  };

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

  public dialogSyllableVisible = false;
  public dialogBlendVisible = false;

  public blendContext;
  public syllableContext;
  public frameworkComponents;

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

  @Prop() public articulation;

  @Prop() public add;

  public conf = {
    WhatsInThePicture: ['phrases'],
    SpotTheDifference: ['mediaIndex'],
    PhotoAssembly: ['picker'],
  };

  public slides = [];
  public myArray = [];
  public d = 1;

  public form = {
    emphasis: null,
    text: null,
    isolate: false,
    audio: [],
    type: null,
    location: null,
    media: [],
    syllable: null,
  };

  onBlendModelUpdated(event) {
    this.blendRows = event.api.getDisplayedRowCount();
  }

  onSyllableModelUpdated(event) {
    this.syllableRows = event.api.getDisplayedRowCount();
  }

  getItems() {
    // this.articulation.name
    const a = this.all[this.articulation.name.toLocaleLowerCase()];

    return this.all[this.articulation.name.toLocaleLowerCase()];
  }

  public addSyllable() {
    this.form = this.createNewSyllable();
    this.dialogSyllableVisible = true;
  }

  public addBlend() {
    this.form = this.createNewBlend() as any;

    this.dialogBlendVisible = true;
  }

  public createNewSyllable() {
    const form = {
      emphasis: null,
      text: null,
      isolate: false,
      audio: [],
      type: null,
      location: null,
      media: [],
      syllable: null,
    };

    return { ...form };
  }

  public createNewBlend() {
    const form = {
      emphasis: null,
      text: null,
      isolate: false,
      audio: [],
      type: null,
      blend: null,
      media: [],
    };

    return { ...form };
  }

  public beforeMount() {
    this.blendContext = { componentParent: this, source: 'blend' };
    this.syllableContext = { componentParent: this, source: 'syllable' };

    this.frameworkComponents = {
      deleteCell: DeleteCell,
      audioCell: AudioCell,
      imageCell: ImageCell,
    };
  }

  onSaveSyllable() {
    const data = this.form as any;

    if (!data._id) {
      data._id = getObjectId();

      this.articulation.metadata.syllable.push(data);
      this.dialogSyllableVisible = false;

      (this.gridOptionsSyllable as any).api.refreshCells();
      return;
    }

    const it = this.articulation.metadata.syllable.find(
      (s) => s._id === data._id
    );

    it.emphasis = data.emphasis;
    it.text = data.text;
    it.isolate = data.isolate;
    it.audio = data.audio;
    it.type = data.type;
    it.location = data.location;
    it.media = data.media;
    it.syllable = data.syllable;
    // articulation.metadata.syllable
    this.dialogSyllableVisible = false;

    (this.gridOptionsSyllable as any).api.refreshCells();
  }

  onSaveBlend() {
    const data = this.form as any;

    if (!data._id) {
      data._id = getObjectId();

      this.articulation.metadata.blend.push(data);
      this.dialogBlendVisible = false;

      (this.gridOptionsBlend as any).api.refreshCells();
      return;
    }

    const it = this.articulation.metadata.blend.find((s) => s._id === data._id);

    it.emphasis = data.emphasis;
    it.text = data.text;
    it.type = data.type;
    it.blend = data.blend;
    it.audio = data.audio;
    it.media = data.media;
    // articulation.metadata.syllable
    this.dialogBlendVisible = false;

    (this.gridOptionsBlend as any).api.refreshCells();
  }

  edit(data, source) {
    if (source === 'blend') {
      this.editBlend(data);
      return;
    }

    this.editSyllable(data);
  }

  editBlend(data) {
    this.form = data;

    this.dialogBlendVisible = true;
  }

  editSyllable(data) {
    this.form = data;

    this.dialogSyllableVisible = true;
  }

  delete(data, source) {
    if (source === 'blend') {
      this.deleteBlend(data);
      return;
    }

    this.deleteSyllable(data);
  }

  deleteBlend(data) {
    this.articulation.metadata.blend = this.articulation.metadata.blend.filter(
      (s) => s._id !== data._id
    );

    this.dialogBlendVisible = false;

    (this.gridOptionsBlend as any).api.refreshCells();
  }

  deleteSyllable(data) {
    this.articulation.metadata.syllable = this.articulation.metadata.syllable.filter(
      (s) => s._id !== data._id
    );

    this.dialogSyllableVisible = false;

    (this.gridOptionsSyllable as any).api.refreshCells();
  }

  public some() {
    // const files = this.$refs.myVueDropzone[0].getQueuedFiles();

    // console.log({ files });

    const img = new Image();
    // img.src="
    // https://rowanwins.github.io/vue-dropzone/docs/dist/vue2-dropzone1.png?93d2bf4221b4c9873561d5644497b414';
    // const mockFile = {
    //   id: 'bla',
    //   uploaded: true,
    //   path: '',
    //   size: 0,
    // };
    const file = { size: 123, name: 'Icon', type: 'image/png' };
    const url =
      'https://rowanwins.github.io/vue-dropzone/docs/dist/vue2-dropzone1.png?93d2bf4221b4c9873561d5644497b414';

    // var f = new File([""], "filename.png", { type: 'image/png' });

    const fileUrl = img.src;
    this.$refs.myVueDropzone[0].manuallyAddFile(file, url, null, null, {
      dontSubtractMaxFiles: false,
      addToFiles: true,
    });
  }

  public onSubmit() {
    console.log('submit!');
  }
}
</script>


<style lang="scss">
.ag-theme-balham .ag-ltr .ag-cell {
  display: flex;
  align-items: center;
}
</style>