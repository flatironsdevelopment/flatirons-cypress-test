// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import loginPage from "../pages/LoginPage.js";
import {SIGN_IN_API} from "./apis";
import {faker} from "@faker-js/faker";
import {getVerificationLink} from "./utils";
import signupPage from "../pages/SignupPage";

Cypress.Commands.add("login", (email, password) => {
  cy.request({
    method: "POST",
    url: SIGN_IN_API,
    body: {
      user: { email, password },
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add("loginUI", (email, password) => {
  loginPage.loadPage();
  loginPage.signin(email, password);
});

//Emails
Cypress.Commands.add(
  "getEmails",
  ({ tag, timestamp_from, limit = 1, subject }) => {
    const endpoint = `${Cypress.env("TESTMAIL_URL")}?apikey=${Cypress.env(
      "TESTMAIL_APIKEY"
    )}`;

    cy.request({
      method: "GET",
      url: `${endpoint}&namespace=${Cypress.env(
        "TESTMAIL_NAMESPACE"
      )}&tag=${tag}&timestamp_from=${timestamp_from}&limit=${limit}`,
    }).then((response) => {
      const emails = response.body;

      return cy.wrap(emails);
    });
  }
);

Cypress.Commands.add("createUser", (tag, email, password) => {
  const timestamp_from = Date.now();

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const companyName = faker.company.name();
  signupPage.loadPage();
  signupPage.signup({
    firstName,
    lastName,
    companyName,
    email,
    password,
  });

  signupPage.isCheckEmailLabelVisible();
  cy.wait(5000); // Wait for email to be sent and received

  cy.getEmails({
    tag,
    timestamp_from,
    limit: 10,
  }).then((response) => {
    expect(response.emails.length).to.equal(1);
    const verificationLink = getVerificationLink({
      text: response.emails[0].text,
    });

    cy.log(verificationLink);

    cy.visit(verificationLink);

    signupPage.isEmailConfirmedLabelVisible();
    cy.contains("div", "Sign In").click();
  });
});

Cypress.Commands.add("iframeCustom", { prevSubject: "element" }, ($iframe) => {
  return new Cypress.Promise((resolve) => {
    $iframe.ready(function () {
      resolve($iframe.contents().find("body"));
    });
  });
});

Cypress.Commands.add("checkElementExists", (selector) => {
  return cy.get(selector).should("exist").then(cy.wrap);
});
