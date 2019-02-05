<template>
  <vue-dropzone
    ref="myVueDropzone"
    id="dropzone"
    style="margin:0 0 10px 0;"
    :options="dropzoneOptions"
    @vdropzone-file-added="onadd"
    @vdropzone-files-added="onadd"
    @vdropzone-removed-file="vremoved"
    @vdropzone-mounted="vmounted"
    
  ></vue-dropzone>
</template>

<script lang="ts">
import vue2Dropzone from 'vue2-dropzone';
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

@Component({
  components: {
    vueDropzone: vue2Dropzone,
  },
})
export default class Dropper extends Vue {
  @Prop() value;

  @Prop() blobs;

  files = [];

  onadd(file) {
    //debugger;
    // const files = this.$refs.myVueDropzone.getQueuedFiles();

    this.files.push(file.name);
    this.files = this.files.filter((f) => !!f);
    // file: file.name

    // console.log({ files });
    this.$emit('input', this.files);

    // this.slides[0]
  }

  vremoved(file, error, xhr) {
    this.files = this.files.filter((f) => f !== file.name);
    this.$emit('input', this.files);
  }

  vmounted() {
    if (!this.value) return;
    if (!this.value.length) return;
    if (!this.$refs.myVueDropzone) return;

    this.value.forEach((v, i) => {
      var file = { size: 0, name: v, type: 'image/png' };
      var url = `/api/v1/s3?fileKey=Learning/5c58a52a8a7b723d70f0c822/thumbnails/istock-488951890-m.jpg` //'https://via.placeholder.com/150';

      if (this.blobs) {
        url = this.blobs[i];
      }

      // var f = new File([""], "filename.png", { type: 'image/png' });

      (this.$refs.myVueDropzone as any).manuallyAddFile(file, url, null, null, {
        dontSubtractMaxFiles: false,
        addToFiles: true,
      });
    });

    console.log(this.value);
  }

  dropzoneOptions = {
    addRemoveLinks: true,
    url: '/',
    autoProcessQueue: false,
    //duplicateCheck: true
    // accept: (e, done) => {
    //   debugger;
    //   done('fick');
    //   // debugger;

    // }
  };
}
</script>
