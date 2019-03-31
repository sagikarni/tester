var tslint = require('tslint');
var fs = require('fs');
var path = require('path');

const { resolve } = require('path');
const { readdir, stat } = require('fs').promises;

async function* getFiles(dir) {
  const subdirs = await readdir(dir);
  for (const subdir of subdirs) {
    const res = resolve(dir, subdir);
    if ((await stat(res)).isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

(async () => {
  for await (const f of getFiles('.')) {
    const x = f.toLocaleLowerCase();

    if (x.endsWith('.vue')) {
      if (!/node_modules/gi.test(x)) {
        console.log({ x });

        // console.log(f);
        const fileContent = fs.readFileSync(f, 'utf-8');
        // /<script[\s\S]*?>[\s\S]*?<\/script>/gmi

        var matches = fileContent.match(
          /<script[\s\S]*?>[\s\S]*?<\/script>/gim
        );
        // console.log({ matches });
        if (matches) {
          let scriptString = matches[0];
          scriptString = scriptString.replace('<script lang="ts">', '');
          scriptString = scriptString.replace('</script>', '');
          //    console.log({ scriptString });
          var bakFile = f + '.ts';

          fs.writeFileSync(bakFile, scriptString);

          // console.log({ bakFile });

          linter(bakFile);

          let r = fs.readFileSync(bakFile, 'utf-8');
          r = `<script lang="ts">${r}</script>`;

          // console.log({ r });
          var con = fileContent.replace(
            /<script[\s\S]*?>[\s\S]*?<\/script>/gim,
            '__CONTENT__'
          );

          con = con.replace('__CONTENT__', r);
          // console.log({ con });

          fs.writeFileSync(f, con);

          // process.exit();
        }
      }
    }
  }
  console.log('done');
})();

function linter(fileName) {
  // var fileName = path.join(__dirname, './apps/admin-server/src/app.ts');

  let tslintPath = 'c:\\code\\tera\\apps\\admin-vue\\tslint.json';
  
  if (fileName.startsWith('c:\\code\\tera\\apps\\admin-vue\\')) {
    tslintPath = 'c:\\code\\tera\\apps\\admin-vue\\tslint.json';
  }

  if (fileName.startsWith('c:\\code\\tera\\apps\\admin-server\\')) {
    tslintPath = 'c:\\code\\tera\\apps\\admin-server\\tslint.json';
  }

  if (fileName.startsWith('c:\\code\\tera\\apps\\tera.com-server\\')) {
    tslintPath = 'c:\\code\\tera\\apps\\tera.com-server\\tslint.json';
  }

  if (fileName.startsWith('c:\\code\\tera\\apps\\tera.com-vue\\')) {
    tslintPath = 'c:\\code\\tera\\apps\\tera.com-vue\\tslint.json';
  }

  console.log({ tslintPath });
  var configurationFilename = tslintPath;
  
  // var configurationFilename = path.join(
  //   __dirname,
  //   './apps/admin-server/tslint.json'
  // );
  var options = {
    fix: true,
    formatter: 'json',
    // rulesDirectory: "customRules/",
    // formattersDirectory: "customFormatters/"
  };
  var fileContents = fs.readFileSync(fileName, 'utf8');
  var linter = new tslint.Linter(options);

  var configuration = tslint.Configuration.findConfiguration(
    configurationFilename,
    fileName
  ).results;

  //console.log({ configuration });

  // console.log({ fileContents });
  linter.lint(fileName, fileContents, configuration);

  var result = linter.getResult();

  // console.log({ result });
}
