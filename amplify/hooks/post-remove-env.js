import { execSync } from 'child_process';
import {getEnvName, getParameters} from "./utils.js";

const hookHandler = async (data) => {
  const env = getEnvName(data);
  console.log(`Removing cdk main stack for env ${env}`);
  execSync(`pwd && cd cdk && npx cdk destroy tstteo-${env} --force`, { stdio: 'inherit' });
  console.log('Removed!');
};

getParameters().then((event) => hookHandler(event.data)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
