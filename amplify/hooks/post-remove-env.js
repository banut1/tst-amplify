import { execSync } from 'child_process';

const hookHandler = async () => {
  console.log(`Removing cdk main stack for env ${process.env.ENV_NAME}`);
  execSync(`yarn cdk:destroy:env -f`, { stdio: 'inherit' });
  console.log('Removed!');
};

hookHandler().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
