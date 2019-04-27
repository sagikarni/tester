var fs = require('fs');
const dasherize = require('dasherize');
const { startCase, lowerFirst } = require('lodash');

const undasherize = (str) => {
  if (str.indexOf('-') === -1) return str;
  return str
    .split('-')
    .map((s) => startCase(s))
    .join('');
};

const testFolder = '../packages';

var acts = fs
  .readdirSync(testFolder)
  .filter((file) => file.endsWith('-activity'));

var x = acts.reduce(
  (a, c) => {
    a.imports.push(
      `import { routes as ${lowerFirst(
        undasherize(c.replace('-activity', ''))
      )}Routes } from '${c}';`
    );
    a.exports.push(`${lowerFirst(undasherize(c.replace('-activity', '')))}`);
    return a;
  },
  { imports: [], exports: [] }
);

const importString = x.imports.join('\n');
const exportString = `export default [${x.exports
  .map((e) => `...${e}Routes`)
  .join(',\n')}]`;

fs.writeFileSync(
  '../apps/tera.com-vue/src/router/activities-routes.ts',
  importString + '\n' + exportString
);

var packages = [];
acts.forEach((e) => console.log(`"${e}": "^0.0.0",`));

// var packagejson = require('../apps/tera.com-vue/package.json');

// var noActivitiesPackages = Object.keys(packagejson.dependencies).filter(d => !d.endsWith('-activity'));

// x.exports.forEach(e => {
//     noActivitiesPackages[e.replace('...', '')] = "^0.0.0";
// })

// var y = JSON.stringify(noActivitiesPackages);

// console.log({ y });

console.log('done');
