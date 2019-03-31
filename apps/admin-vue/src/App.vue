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
@import '../../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
@import '../../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';
</style>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
