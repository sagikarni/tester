const load = require('@commitlint/load');
const lint = require('@commitlint/lint');
const fse = require('fs-extra');
const chalk = require('chalk');
const defaultConfig = require('./lint-commit-message');
const gitmojis = require('./gitmojis.json');

const args = process.env.HUSKY_GIT_PARAMS.split(' ');
const editMsgFile = args[0];

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

function updateMessageWithEmoji(msg) {
  const type = msg.match(/[^/(]*/i)[0];

  const { code } = gitmojis.gitmojis.find((g) => g.type && g.type === type);

  const msgWithEmoji = msg.replace(/[^/(]*/i, code + ' ' + type);

  fse.writeFileSync(editMsgFile, msgWithEmoji, { encoding: 'utf-8' });
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
