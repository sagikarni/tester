import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

function dasherize(str) {
  return str.replace(/[A-Z]/g, function(char, index) {
    return (index !== 0 ? '-' : '') + char.toLowerCase();
  });
}

const requireComponent = require.context('.', true, /\.vue$/);

requireComponent.keys().forEach((fileName) => {
  const componentName = dasherize(
    upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')))
  );

  Vue.component(componentName, (resolve) => {
    const componentConfig = requireComponent(fileName);

    resolve(componentConfig.default || componentConfig);
  });
});
