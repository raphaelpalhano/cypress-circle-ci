import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin, beforeRunHandler } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import path from 'path';
import fs from 'fs-extra';

function getConfigurationByFile(file: string) {
  const pathFileConfig = path.resolve('.', 'cypress', 'envs', `${file}.json`);
  return fs.readJson(pathFileConfig);
}

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,

  const envs = await getConfigurationByFile(config.env.envDefinition);
  config.baseUrl = envs.baseUrl;
  config.env = envs.env;

  await addCucumberPreprocessorPlugin(on, config);

  on('before:run', async (details) => {
    await beforeRunHandler(config);
  });

  /* on('after:run', async (results) => {
    await afterRunHandler(config);

    // Your own `after:run` code goes here.
  });

  on('before:spec', async (spec) => {
    await beforeSpecHandler(config, spec);

    // Your own `before:spec` code goes here.
  });

  on('after:spec', async (spec, results) => {
    await afterSpecHandler(config, spec, results);

    // Your own `after:spec` code goes here.
  }); */

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    }),
  );

  return config;
}

export default defineConfig({
  e2e: {
    video: false,
    chromeWebSecurity: false,
    viewportWidth: 1600,
    viewportHeight: 900,
    numTestsKeptInMemory: 5,
    excludeSpecPattern: '*.js',
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 30000,
    specPattern: 'cypress/e2e/features/*.feature',
    setupNodeEvents,
    supportFile: 'cypress/support/e2e.ts',

  },
});
