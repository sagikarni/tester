<template>
  <div>
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
        <dropper :path="urlPrefix" v-model="form.media" placeholder="Drop here image files"></dropper>
      </el-form-item>
      <el-form-item label="Audio:">
        <dropper v-model="form.audio" :path="urlPrefix" placeholder="Drop here audio files"></dropper>
      </el-form-item>
      <el-form-item label="Properties">
        <el-checkbox v-model="form.isolate">Isolate</el-checkbox>
      </el-form-item>
    </el-form>
    <span class="dialog-footer">
      <el-button @click="onCancel">Cancel</el-button>
      <el-button type="primary" @click="onSaveSyllable">Save</el-button>
    </span>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Model,
  Watch,
  Emit,
} from 'vue-property-decorator';
import dropper from './dropper.vue';
import { ObjectID } from 'bson';

@Component({
  components: {
    dropper,
  },
})
export default class SyllableForm extends Vue {
  form = {};

  @Prop() syllable;
  @Prop() urlPrefix;

  @Watch('syllable', { immediate: true, deep: true })
  onPersonChanged1(val: any, oldVal: any) {
    if (val) {
      this.form = val;
      return;
    }

    const form = {
      _id: new ObjectID().toString(),
      emphasis: null,
      text: null,
      isolate: false,
      audio: [],
      type: null,
      location: null,
      media: [],
      syllable: null,
    };

    this.form = form;
  }

  onSaveSyllable() {
    this.$emit('submit', { form: this.form });
  }

  onCancel() {
    this.$emit('discard');
  }
}
</script>


<style lang="scss">
</style>