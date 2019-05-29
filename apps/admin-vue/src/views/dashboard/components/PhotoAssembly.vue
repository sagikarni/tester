<template>
  <Slides v-model="value.slides">
    <template slot-scope="slotProps">
      <el-form-item label="Parts:">
        <picker v-model="slotProps.slide.size" :options="[2, 3, 4]" />
      </el-form-item>
    </template>
  </Slides>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';
import Slides from './slides.vue';
import mediaIndex from './mediaIndex.vue';
import picker from './picker.vue';

@Component({
  components: { Slides, picker },
})
export default class PhotoAssembly extends Vue {
  @Prop() value;
}
</script>
