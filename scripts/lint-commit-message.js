// const fs = require('fs');

// const reset = '\x1b[0m';
// const red = '\x1b[31m';

// const x = process.env.HUSKY_GIT_PARAMS;

// const [messageFile] = process.env.HUSKY_GIT_PARAMS.split(' ');

// const y = process.env.GIT_PARAMS;

// const currentMessage = fs.readFileSync(messageFile, 'utf8'); //.replace(/^# ------------------------ >8 ------------------------[\s\S]*$|^#.*\n/gm, '')

// console.log({ currentMessage });

// // require('fs').writeFileSync(process.env.GIT_PARAMS, 'some message edited');

// process.exit(1);

// The hook is executed at project root directory.
const load = require('@commitlint/load');
const lint = require('@commitlint/lint');
const fse = require('fs-extra');
const chalk = require('chalk');

const emoji = require('./emoji');

const args = process.env.HUSKY_GIT_PARAMS.split(' ');
const editMsgFile = args[0];

const defaultConfig = {
  extends: ['@commitlint/config-conventional'],
  //   rules: {
  //     "subject-case": [0],
  //     "subject-max-length": [2, "always", 100],
  //     "type-enum": [2, "always", ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'chore', 'revert', 'wip']],
  //   }
};

function getCommitMsg() {
  const msg = fse.readFileSync(editMsgFile, { encoding: 'utf-8' });
  return msg.replace(/#(.*[\n\r])?/g, '');
}

function printLintResult(result) {
  const { errors, warnings } = result;
  [...errors, ...warnings].forEach((msg, i) => {
    const lvl = msg.level === 1 ? chalk.yellow('WARNING') : chalk.red('ERROR');
    console.log(`    ${lvl}\t`, msg.message, '\t', chalk.gray.bold(msg.name));
  });
}

function updateMessageWithEmoji() {
  console.log({ msg });

  process.exit(1);
  // emoji.types[]
}

async function run() {
  const config = await load(defaultConfig, {
    cwd: __dirname,
  });
  const msg = getCommitMsg();
  if (msg.trim()) {
    console.log(chalk.bold('start lint the commit msg'));
    const result = await lint(msg, config.rules);
    if (!result.valid) {
      console.log(
        '\nLint result of commit message. Please modify the commit message.\n'
      );
      printLintResult(result);
      process.exit(1);
    }

    console.log(chalk.green('lint passed.'));

    updateMessageWithEmoji(msg);
  }
  process.exit(0);
}

(async () => {
  try {
    await run();
  } catch (e) {
    console.log(e, e.stack);
    process.exit(2);
  }
})();
