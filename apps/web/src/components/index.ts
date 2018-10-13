import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

const requireComponent = require.context('@/components', true, /\.vue$/);

// Dynamically load all components
// and lazily load them
// https://vuejs.org/v2/guide/components-dynamic-async
requireComponent.keys().forEach((fileName: any) => {
  if (fileName.indexOf('core') < 0) {
    return;
  }

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
  );

  Vue.component(componentName, (resolve: any) => {
    const componentConfig = requireComponent(fileName);

    resolve(componentConfig.default || componentConfig);
  });
});
