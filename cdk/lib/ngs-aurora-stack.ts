import {NestedStack, NestedStackProps,} from 'aws-cdk-lib';
import {SecurityGroup, Vpc} from 'aws-cdk-lib/aws-ec2';
import {Construct} from 'constructs';
import {Secret} from 'aws-cdk-lib/aws-secretsmanager';

interface NsgAuroraStackProps extends NestedStackProps {
  vpc: Vpc;
  ngSurveyInstanceSG: SecurityGroup;
  dbSecurityGroup: SecurityGroup;
}

export class NgsAuroraStack extends NestedStack {
  constructor(scope: Construct, id: string, props?: NsgAuroraStackProps) {
    super(scope, id, props);


    new Secret(scope, `tstteo-secret`, {
      generateSecretString: {excludePunctuation: true, includeSpace: false, passwordLength: 9},
    });
  }
}
