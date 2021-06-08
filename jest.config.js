module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@functions/(.*)' : '<rootDir>/src/functions/$1',
    '@libs/(.*)' : '<rootDir>/src/libs/$1',
    '@common/(.*)' : '<rootDir>/src/common/$1',
    '@root/(.*)' : '<rootDir>/src/$1'
  }
};

/*
"@functions/*": ["src/functions/*"],
"@libs/*": ["src/libs/*"],
"@common/*": ["src/common/*"],
"@root/*": ["*"],
*/