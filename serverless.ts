import type { AWS } from '@serverless/typescript';

import * as functions from 'src/functions';

const serverlessConfiguration: AWS = {
  service: 'bandr',
  frameworkVersion: '2',
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions,
};

module.exports = serverlessConfiguration;
