import { getParameters, prompt } from './utils.js';
import { writeFileSync } from 'fs';
import { readFile } from 'node:fs/promises';

const hookHandler = async () => {
  const awsAccount = '426352665181';
  const awsRegion = 'eu-central-1';
  const localEnvInfo = await readFile(new URL('../.config/local-env-info.json', import.meta.url), {
    encoding: 'utf-8',
  });
  const envName = JSON.parse(localEnvInfo).envName;
  console.log(awsAccount);
  console.log(awsRegion);
  console.log(envName);

  writeFileSync(
    '.env',
    `
AWS_ACCOUNT=${awsAccount}
AWS_REGION=${awsRegion}
ENV_NAME=${envName}`
  );
};

getParameters()
  .then((event) => hookHandler(event.data, event.error))
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
