<template>
  <div id="nav-toolbar" style="display:flex;flex:1;">
    <div class="col col-l">
      <slot name="left"></slot>
    </div>
    <h2
      class="display-1 black--text"
      :class="{ 'subheading': $vuetify.breakpoint.xsOnly, 'display-1': $vuetify.breakpoint.smAndUp }"
      style="text-transform:capitalize;flex:1;text-align:center;display:flex;align-items:center;justify-content:center;"
    >
      <span>{{title}}</span>
    </h2>
    <slot name="right"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Nav extends Vue {
  @Prop() title;

  goBack() {
    window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
  }
}
</script>

<style lang="scss" scoped>
.col {
  display: flex;
  flex: 0;
  justify-content: space-evenly;
}

.col-l {
  max-width: 300px;
  flex: 1;
}
</style>
