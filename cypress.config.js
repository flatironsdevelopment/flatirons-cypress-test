const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  defaultCommandTimeout: 8000,
  responseTimeout: 120000,
  pageLoadTimeout: 100000,
  requestTimeout: 30000,
  taskTimeout: 120000,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  watchForFileChanges: false,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
