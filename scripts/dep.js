const fs = require('fs');
const lerna = require('lerna');
const path = require('path');
const tar = require('tar-fs');
const fse = require('fs-extra');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const projectDir = path.join(__dirname, '..');

const apps = ['admin-server', 'tera.com-server'];

asyncForEach(apps, async (app) => {
  await packApp({
    sourcePath: path.join(projectDir, `apps/${app}`),
    targetPath: path.join(projectDir, `dist/${app}`),
  });
});

async function packApp({ sourcePath, targetPath }) {
  const packageJson = require(`${sourcePath}/package.json`);
  const lernaPackages = await getLernaPackages();
  const dependencies = packageJson['dependencies'];

  fse.ensureDirSync(`${targetPath}/packages`);

  Object.keys(dependencies).forEach((name) => {
    lernaPackages.forEach((package) => {
      if (package.name === name) {
        packageJson['dependencies'][name] = `file:packages/${name}.tar`;
        tar
          .pack(`${projectDir}/packages/${name}`)
          .pipe(fs.createWriteStream(`${targetPath}/packages/${name}.tar`));
      }
    });
  });

  fs.writeFileSync(
    `${targetPath}/package.json`,
    JSON.stringify(packageJson, null, 2),
    'utf-8'
  );
}

async function getLernaPackages() {
  return new Promise((res, onRejected) => {
    const ls = new require('@lerna/list')({
      _: [],
      json: true,
      onRejected,
      onResolved() {
        //different version of lerna3 are well different.
        if (ls.filteredPackages) {
          res(ls.filteredPackages);
        } else if (ls.result) {
          res(JSON.parse(ls.result.text));
        } else {
          //throw?
          res([]);
        }
      },
    });
  });
}
