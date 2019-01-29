<template>
  <Slides v-model="value.slides">
    <template slot-scope="slotProps">
      <mediaIndex v-model="slotProps.slide.mediaIndex"/>
      <dropper v-model="slotProps.slide.audio"></dropper>
    </template>
  </Slides>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';
import Slides from './slides.vue';
import mediaIndex from './mediaIndex.vue';
import dropper from './dropper.vue';

@Component({
  components: { mediaIndex, dropper, Slides },
})
export default class SoundOfLifePhoto extends Vue {
  @Prop() value;
}
</script>