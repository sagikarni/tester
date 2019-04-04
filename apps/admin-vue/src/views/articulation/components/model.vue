<template>
  <el-form :model="form" label-width="120px" v-if="articulation">
    <el-tabs value="syllable">
      <el-tab-pane label="Syllable" name="syllable">
        <div>
          <el-button icon="el-icon-plus" type="primary" @click="addSyllable">Add Syllable</el-button>

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
                <dropper :path="`/storage/Speech/articulation/${articulation.name}/__FILE__`" v-model="form.media" placeholder="Drop here image files"></dropper>
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
          style="width: 700px;height: 500px;margin:20px 0;"
          class="ag-theme-balham"
          :columnDefs="syllableColumnDefs"
          :rowData="articulation.model.syllable"
          :context="syllableContext"
          :frameworkComponents="frameworkComponents"
          :enableCellChangeFlash="true"
          rowHeight="55"
          :gridOptions="gridOptionsSyllable"
        ></ag-grid-vue>
      </el-tab-pane>
      <el-tab-pane label="By Blend" name="blend" :disabled="!articulation.model.blend.length">
        <div>
          <el-button icon="el-icon-plus" type="primary" @click="addBlend">Add Blend</el-button>

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
          style="width:700px;height:500px;margin:20px 0;"
          class="ag-theme-balham"
          :columnDefs="blendColumnDefs"
          :rowData="articulation.model.blend"
          :context="blendContext"
          :frameworkComponents="frameworkComponents"
          :enableCellChangeFlash="true"
          rowHeight="55"
          :gridOptions="gridOptionsBlend"
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

@Component({
  components: {
    ImageCell,
    AudioCell,
    DeleteCell,
    AgGridVue,
    draggable,
    // "vue-transmit": VueTransmit
    dropper,
    // Plain,
    // Facts,
    // Questions,
    // Categorization,
    // PhotoAssembly,
    // WhatsInThePicture,
    // MemoryCards,
    // WhatIsWrong,
    // Zoom,
    // SpotTheDifference,
    // ISee,
    // Meaning,
    // WHQuestions,
    // GoodStory,
    // SoundOfLifePhoto,
    // WhatsInThePicture //() => import('./WhatsInThePicture.vue').then(d => d.default),
  },
  filters: {
    json(value) {
      return JSON.stringify(value, null, 2);
    },
  },
})
export default class Modely extends Vue {
  get storageUrl() {
    return `E:/sagi-tera-files/speech/articulation/${this.articulation.name}`;
  }
  gridOptionsBlend = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: false
      //            filter: "agTextColumnFilter"
    },
  };
  gridOptionsSyllable = {
    defaultColDef: {
      filter: true,
      sortable: true,
      resizable: true
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
    { headerName: 'Text', field: 'text' },
    { headerName: 'Emphasis', field: 'emphasis', width: 100 },
    { headerName: 'Type', field: 'type', width: 80 },
    { headerName: 'Location', field: 'location', width: 80 },
    { headerName: 'Syllable', field: 'syllable', width: 80 },
    { headerName: 'Isolate', field: 'isolate', width: 80 },

    { headerName: 'Image', field: 'media', cellRenderer: 'imageCell' },
    {
      headerName: 'Recording',
      field: 'audio',
      cellRenderer: 'audioCell',
    },
    {
      cellRenderer: 'deleteCell',
      pinned: 'right',
      width: 100,
    },
  ];

  public blendColumnDefs = [
    { headerName: 'Text', field: 'text' },
    { headerName: 'Emphasis', field: 'emphasis', width: 100 },
    { headerName: 'Type', field: 'type', width: 80 },
    { headerName: 'Blend', field: 'blend', width: 80 },
    { headerName: 'Image', field: 'media', cellRenderer: 'imageCell' },
    { headerName: 'Isolate', field: 'isolate', width: 80 },
     {
      headerName: 'Recording',
      field: 'audio',
      cellRenderer: 'audioCell',
    },
    {
      cellRenderer: 'deleteCell',

      pinned: 'right',
      width: 100,
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
      this.articulation.model.syllable.push(data);
      this.dialogSyllableVisible = false;

      (this.gridOptionsSyllable as any).api.refreshCells();
      return;
    }

    const it = this.articulation.model.syllable.find((s) => s._id === data._id);

    it.emphasis = data.emphasis;
    it.text = data.text;
    it.isolate = data.isolate;
    it.audio = data.audio;
    it.type = data.type;
    it.location = data.location;
    it.media = data.media;
    it.syllable = data.syllable;
    // articulation.model.syllable
    this.dialogSyllableVisible = false;

    (this.gridOptionsSyllable as any).api.refreshCells();
  }

  onSaveBlend() {
    const data = this.form as any;

    if (!data._id) {
      this.articulation.model.blend.push(data);
      this.dialogBlendVisible = false;

      (this.gridOptionsBlend as any).api.refreshCells();
      return;
    }

    const it = this.articulation.model.blend.find((s) => s._id === data._id);

    it.emphasis = data.emphasis;
    it.text = data.text;
    it.type = data.type;
    it.blend = data.blend;
    it.audio = data.audio;
    it.media = data.media;
    // articulation.model.syllable
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
    this.articulation.model.blend = this.articulation.model.blend.filter(
      (s) => s._id !== data._id
    );

    this.dialogBlendVisible = false;

    (this.gridOptionsBlend as any).api.refreshCells();
  }

  deleteSyllable(data) {
    this.articulation.model.syllable = this.articulation.model.syllable.filter(
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