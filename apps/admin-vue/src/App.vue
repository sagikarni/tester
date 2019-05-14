<template>
  <Shell/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Shell from './views/Shell.vue';

@Component({
  components: {
    Shell,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import './style.scss';
</style>
