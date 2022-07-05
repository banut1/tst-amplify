import { CognitoIdentityProviderClient, ListUserPoolsCommand } from '@aws-sdk/client-cognito-identity-provider';
import { LambdaClient, ListFunctionsCommand } from '@aws-sdk/client-lambda';
import { AppSyncClient, ListGraphqlApisCommand } from '@aws-sdk/client-appsync';
import fs from 'fs';
import { createInterface } from 'readline';

export const REGION = process.env.AWS_DEFAULT_REGION || 'eu-central-1';
export const getEnvName = (data) => data.amplify.environment.envName;
export const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });
export const lambdaClient = new LambdaClient({ region: REGION });
export const appSyncClient = new AppSyncClient({ region: REGION });
export const getParameters = async () => JSON.parse(fs.readFileSync(0, { encoding: 'utf8' }));

export const getUserPoolId = async (env) => {
  let nextToken = null;
  let found = null;
  do {
    const response = await cognitoClient.send(new ListUserPoolsCommand({ MaxResults: 10, NextToken: nextToken }));
    nextToken = response.NextToken;
    found = response.UserPools.find((pool) => pool.Name.includes(env));
  } while (nextToken && !found);
  return found.Id;
};

export const getLambdaInfo = async (env, partialName) => {
  let nextToken = null;
  let found = null;
  do {
    const listResponse = await lambdaClient.send(
      new ListFunctionsCommand({ MaxItems: 50, Marker: nextToken || undefined })
    );
    nextToken = listResponse.NextMarker;
    found = listResponse.Functions.find(
      (fct) => fct.FunctionName.endsWith(env) && fct.FunctionName.includes(partialName)
    );
  } while (nextToken && !found);
  return found;
};

export const getApiId = async (env) => {
  let nextToken = undefined;
  let found = null;
  do {
    const response = await appSyncClient.send(new ListGraphqlApisCommand({ maxResults: 10, nextToken }));
    nextToken = response.nextToken;
    found = response.graphqlApis.find((api) => api.name.includes(env));
  } while (nextToken && !found);
  return found.apiId;
};
