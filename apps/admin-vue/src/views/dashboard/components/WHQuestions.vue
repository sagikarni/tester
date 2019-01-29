<template>
  <Slides v-model="value.slides">
    <template slot-scope="slotProps">
      <Phrases v-model="slotProps.slide.phrases"/>
    </template>
  </Slides>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';
import Slides from './slides.vue';
import Phrases from './phrases.vue';

@Component({
  components: { Slides, Phrases },
})
export default class WHQuestions extends Vue {
  @Prop() value;
}
</script>