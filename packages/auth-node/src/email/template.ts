import * as fsSync from 'fs';
import * as path from 'path';
import { all, promisifyAll } from 'bluebird';
// import * as handlebars from 'handlebars';
import handlebars from 'handlebars/dist/cjs/handlebars';

const emailDefaultSender = process.env.EMAIL_DEFAULT_SENDER;
const app = process.env.EMAIL_APP;

export { load, compile, emailDefaultSender, app };

export let templates = [];

function setTemplates(newTemplates: any) {
  templates = newTemplates;
}

const fs: any = promisifyAll(fsSync);

async function load(directory) {
  console.log(`Loading email templates from ${directory}...`);
  setTemplates(await loadTemplates(directory));
}

async function loadTemplates(directory) {
  const system = await fs.readdirAsync(directory);

  const promises = [];
  for (const folder of system) {
    const stat = await fs.statAsync(path.resolve(__dirname, directory, folder));

    if (stat.isDirectory()) {
      promises.push(readTemplateFolder(directory, folder));
    }
  }

  return await all(promises);
}

async function readTemplateFolder(directory, folder) {
  const htmlFile = path.resolve(__dirname, directory, folder, 'html.hbs');
  const textFile = path.resolve(__dirname, directory, folder, 'text.hbs');

  const htmlTemplate = await fs.readFileAsync(htmlFile, 'utf8');
  const textTemplate = await fs.readFileAsync(textFile, 'utf8');

  console.log(`[Email] ${folder.toLowerCase()} template loaded.`);
  return {
    name: folder.toLowerCase(),
    html: handlebars.compile(htmlTemplate),
    text: handlebars.compile(textTemplate),
  };
}

function compile({ templateName, context }) {
  console.log({ templateName });

  const template = templates.find((t) => t.name === templateName.toLowerCase());
  return {
    html: template.html(context),
    text: template.text(context),
  };
}
