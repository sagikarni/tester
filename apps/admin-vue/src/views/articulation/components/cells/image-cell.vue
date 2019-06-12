<template>
  <span style="display:flex;align-items:center">
    <img
      style="height:75px;width:120px;margin:2px;"
      :src="getPath(im.name)"
      :alt="im.name"
      v-for="im in media"
      :key="im.name"
    >
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

@Component({})
export default class DeleteCell extends Vue {
  params;

  getPath(name) {
    const a = this.params.context.componentParent.urlPrefix.replace(
      '__FILE__',
      name
    );
    console.log({ a });
    return a;
  }

  get media() {
    if (!this.params) {
      return;
    }

    return this.params.node.data.media;
  }

  public onEdit() {
    this.params.context.componentParent.edit(
      this.params.node.data,
      this.params.context.storageUrl
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
