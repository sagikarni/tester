<template>
  <div><h4>Facts</h4></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

@Component({})
export default class Facts extends Vue {
  @Prop() value;
}
</script>
