<template>
  <span style="display:flex;align-items:center"><img style="height:75px;width:120px;margin:2px;" :src="`/storage/Speech/articulation/${articulationName}/${im.name}`" :alt="im.name" v-for="im in media" :key="im.name"></span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

@Component({})
export default class DeleteCell extends Vue {
  params;

  get articulationName() {
    // return this.params.context.storageUrl + im;
    
    return this.params.context.componentParent.articulation.name;
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
