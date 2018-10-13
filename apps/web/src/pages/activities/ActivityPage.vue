<template>

  <div>
    <div>in act page!!</div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NotFound from '@/pages/general/404Page.vue';
import { camel } from '@/util/helpers';
import {App} from '@libs/tera-store';

@Component({
  components: { NotFound }
  //   beforeRouteEnter: (to, from, next) => {
  //     let activity = camel(to.params.activity);
  //     activity = `${activity.substr(0, 1).toLowerCase()}${activity.slice(1)}`;
  //       debugger;
  //     // return import(/* webpackChunkName: "examples" */
  //     // /* webpackMode: "lazy-once" */
  //     // `../../examples/${example}.vue`)
  //     //   .catch(e => NotFound)
  //     //   .then(comp => {
  //     //     next(vm => {
  //     //       vm.component = comp.default;
  //     //     });
  //     //   });
  //   }
})
export default class ActivityPage extends Vue {
  component = null;

  @App.Getter('components') components: any;

  constructor() {
    super();
  }

  // computedComponents() {
  //   let component = this.components[this.component];

  //   // Temporary until all components are converted
  //   if (component) {
  //     return component.components;
  //   } else {
  //     // TODO: move out of translation files
  //     component = `${this.computedSection}.${
  //       this.computedComponent
  //     }.components`;
  //   }

  //   return this.$te(component)
  //     ? this.$t(component)
  //     : this.$te(component, 'en')
  //       ? this.$t(component, 'en')
  //       : [];
  // }

  // exists() {
  //   return (
  //     (this.computedComponents || []).length > 0 ||
  //     (this.examples || []).length > 0
  //   );
  // }
}
</script>

