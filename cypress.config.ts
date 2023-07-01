import { defineConfig } from 'cypress';

module.exports = defineConfig({
  e2e: {
    video: false,
    chromeWebSecurity: false,
    viewportWidth: 1600,
    viewportHeight: 900,
    numTestsKeptInMemory: 5,
    excludeSpecPattern: '*.js',
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 30000,
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',

    async setupNodeEvents(on, config) {
      return require('./cypress/envs/env.control')(on, config);
    },

    env: {

    },
  },
});
