import { execSync } from 'child_process';
import {getEnvName, getParameters} from "./utils";

const hookHandler = async (data) => {
  const env = getEnvName(data);
  console.log(`Removing cdk main stack for env ${env}`);
  execSync(`cdk destroy tstteo-${env}`, { stdio: 'inherit' });
  console.log('Removed!');
};

getParameters().then((data) => hookHandler(data)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
