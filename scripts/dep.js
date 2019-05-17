const fs = require('fs');
const lerna = require('lerna');
const path = require('path');
const tar = require('tar-fs');
const fse = require('fs-extra');

const npm = null;

const projectDir = path.join(__dirname, '..');

const apps = [
  {
    sourcePath: path.join(projectDir, `apps/admin-server`),
    targetPath: path.join(projectDir, `dist/tera-admin`),
  },
  {
    sourcePath: path.join(projectDir, `apps/tera.com-server`),
    targetPath: path.join(projectDir, `dist/tera.com`),
  },
];

async function main() {
  this.npm = await createNpm();

  await asyncForEach(apps, async (app) => {
    await packApp(app);
  });
  // r[0].filename
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function createNpm() {
  return new Promise((res, req) => {
    const npm = require('npm');
    npm.load({}, (a) => {
      res(npm);
    });
  });
}

function npmPack(directory) {
  return new Promise((res, req) => {
    this.npm.pack(directory, (_, result) => {
      res(result);
    });
  });
}

function pack(sourceDirectory, targetDirectory) {
  return new Promise(async (res, req) => {
    const dir = process.cwd();
    try {
      process.chdir(targetDirectory);
      const result = await npmPack(sourceDirectory);
      process.chdir(dir);
      res(result);
    } finally {
      process.chdir(dir);
    }
  });
}

main();

// console.log('done');

// process.exit();

async function packApp({ sourcePath, targetPath }) {
  const packageJson = require(`${sourcePath}/package.json`);
  const lernaPackages = await getLernaPackages();
  const dependencies = packageJson['dependencies'];

  fse.ensureDirSync(`${targetPath}/packages`);

  await asyncForEach(Object.keys(dependencies), async (name) => {
    await asyncForEach(lernaPackages, async (package) => {
      if (package.name === name) {
        const r = await pack(
          `${projectDir}/packages/${name}`,
          `${targetPath}/packages`
        );

        packageJson['dependencies'][name] = `file:packages/${r[0].filename}`;
        // tar
        //   .pack(`${projectDir}/packages/${name}`)
        //   .pipe(fs.createWriteStream(`${targetPath}/packages/${name}.tar`));
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
