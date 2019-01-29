<template>
  <Slides v-model="value.slides"></Slides>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';
import Slides from './slides.vue';

@Component({
  components: { Slides },
})
export default class WhatIsWrong extends Vue {
  @Prop() value;
}
</script>