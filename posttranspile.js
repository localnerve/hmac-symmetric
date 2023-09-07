import fs from 'node:fs/promises';
import path from 'node:path';

const dir = './cjs';
const files = await fs.readdir(dir);
for (const file of files) {
  const filename = `${dir}${path.sep}${file}`;
  const data = await fs.readFile(filename, 'utf8');
  const newData = data.replace(/(require\("[a-z./]+)(\.js"\);)/g, (m, req) => {
    return `${req}.cjs");`;
  });
  await fs.writeFile(filename, newData);
}