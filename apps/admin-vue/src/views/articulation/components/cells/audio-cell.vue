<template>
  <div>
    <div v-for="im in audio" :key="im.name" style="display:flex;align-items:center;">
      <audio controls style="width:150px;">
        <source
          :src="`/storage/Speech/Articulation/${articulationName}/${im.name}`"
          type="audio/mpeg"
        >Your browser does not support the audio element.
      </audio>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

@Component({})
export default class AudioCell extends Vue {
  params;

  get articulationName() {
    // return this.params.context.storageUrl + im;

    return this.params.context.componentParent.articulation.name;
  }

  get audio() {
    if (!this.params) {
      return;
    }

    return this.params.node.data.audio;
  }

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
