/// <reference types="cypress" />

import path from 'path';
import fs from 'fs-extra';

function getConfigurationByFile(file: string) {
  const pathFileConfig = path.resolve('.', 'cypress', 'envs', `${file}.json`);
  return fs.readJson(pathFileConfig);
}

module.exports = async (on, config) => {
  const file = config.env.envDefinition;

  return getConfigurationByFile(file);
};
