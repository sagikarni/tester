<template>
  <div>
    <el-form-item label="SlidesCategories">
      <Phrases v-model="value.slideCategories"/>
    </el-form-item>

    <Slides v-model="value.slides">
      <template slot-scope="slotProps">
        <el-form-item label="Select Category">
          <picker v-model="slotProps.slide.category" :options="some"/>
        </el-form-item>
      </template>
    </Slides>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';
import mediaIndex from './mediaIndex.vue';
import dropper from './dropper.vue';
import draggable from 'vuedraggable';
import picker from './picker.vue';
import Phrases from './phrases.vue';
import Slides from './slides.vue';

@Component({
  components: { mediaIndex, draggable, dropper, picker, Phrases, Slides },
})
export default class Categorization extends Vue {
  @Prop() value;
  some = ['N/A'];

  @Watch('value.slideCategories') onChange(n, o) {
    this.some = ['N/A', ...this.value.slideCategories];
  }
}
</script>