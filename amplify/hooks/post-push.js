import * as fs from 'fs';

import { CognitoIdentityProviderClient, ListUserPoolsCommand } from '@aws-sdk/client-cognito-identity-provider';

export const cognitoClient = new CognitoIdentityProviderClient({ region: 'eu-central-1' });

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

const hookHandler = async (data) => {
    await getUserPoolId('dev');
};

const getParameters = async () => JSON.parse(fs.readFileSync(0, { encoding: 'utf8' }));

getParameters()
    .then((event) => hookHandler(event.data, event.error))
    .catch((err) => {
        console.error(err);
        process.exitCode = 1;
    });
