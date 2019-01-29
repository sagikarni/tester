<template>
  <Slides v-model="value.slides">
    <template slot-scope="slotProps">
      <mediaIndex v-model="slotProps.slide.mediaIndex"/>
    </template>
  </Slides>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';
import Slides from './slides.vue';
import mediaIndex from './mediaIndex.vue';

@Component({
  components: { mediaIndex, Slides },
})
export default class SpotTheDifference extends Vue {
  @Prop() value;
}
</script>