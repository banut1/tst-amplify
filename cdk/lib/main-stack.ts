import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NgsAuroraStack } from './ngs-aurora-stack';
import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';

interface MainStackProps extends StackProps {

}

export class MainStack extends Stack {
  constructor(scope: Construct, id: string, props?: MainStackProps) {
    super(scope, id, props);

    new NgsAuroraStack(this, 'nested-nsg-aurora');
  }
}
