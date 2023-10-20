const pkg = require('./package.json');

module.exports = {
  displayName: pkg.name,
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['fixtures'],
};

