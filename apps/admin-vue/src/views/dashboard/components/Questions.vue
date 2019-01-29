<template>
  <div>
    <h4>Questions</h4>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

@Component({})
export default class Questions extends Vue {
  @Prop() value;
}
</script>