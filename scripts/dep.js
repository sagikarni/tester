const fs = require('fs');
const lerna = require('lerna');
const path = require('path');
const tar = require('tar');
const fse = require('fs-extra');

var fstream = require('fstream');

function pack({ path, target }) {
  fstream
    .Reader({ path, type: 'Directory' })
    .pipe(tar.Pack({ noProprietary: true }))
    .pipe(fs.createWriteStream(target));
}

const projectDir = path.join(__dirname, '..');

function main(input, output) {
  console.log({ input });

  const packageJson = require(`${input}/package.json`);
  const LsCommand = require('@lerna/list');

  const filteredPackages = new Promise((res, onRejected) => {
    const ls = new LsCommand({
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

  filteredPackages.then((r) => {
    const dependencies = packageJson['dependencies'];

    fse.ensureDirSync(`${output}/packages`);

    // path.join(__dirname, 'dist/tera-admin/packages'

    // console.log({ dependencies });
    Object.keys(dependencies).forEach((name) => {
      r.forEach((rr) => {
        if (rr.name === name) {
          console.log({ name });
          packageJson['dependencies'][name] = `file:packages/${name}.tar`;
          const p = {
            path: `${projectDir}/packages/${name}`, // path.join(__dirname, 'packages', name),
            target: `${output}/packages/${name}.tar`
          };
          console.log({ p });
          pack(p);
        }
      });
    });

    console.log(`aa::: ${output}/package.json`);

    fs.writeFileSync(
      `${output}/package.json`,
      JSON.stringify(packageJson, null, 2),
      'utf-8'
    );
  });
}

main(path.join(projectDir, 'apps/admin-server'), path.join(projectDir, 'dist/tera-admin'));
// main('./apps/tera.com-server', 'dist/tera.com');
