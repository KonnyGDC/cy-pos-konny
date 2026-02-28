require("dotenv").config();
const { defineConfig } = require("cypress");
module.exports = defineConfig({
e2e: {
baseUrl: process.env.CYPRESS_BASE_URL || "https://hr.lstvqatest.online/",
specPattern: "cypress/e2e/**/*.cy.js",
reporter: "cypress-mochawesome-reporter",
reporterOptions: {
reportDir: "reports/mocha",
overwrite: false,
html: false,
json: true,
},
setupNodeEvents(on, config) {
require("cypress-mochawesome-reporter/plugin")(on);
return config;
},
},
});