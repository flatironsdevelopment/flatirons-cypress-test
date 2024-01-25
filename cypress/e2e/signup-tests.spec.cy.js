import signupPage from "../pages/signupPage.js";
import { faker } from "@faker-js/faker";
import { VIEWPORTS } from "../support/constants.js";

import {
  generateTestmailEmail,
  getVerificationLink,
} from "../support/utils.js";

describe("Signup Tests", () => {
  VIEWPORTS.forEach((viewport) => {
    context(`Viewport: ${viewport.description}`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        signupPage.loadPage();
      });

      it("Should not create a new user account when all mandatory fields are blank", () => {
        signupPage.signup({});
        signupPage.isCurrentPage();
      });

      it("Should not create a new user account when mandatory fields are empty", () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const companyName = faker.company.name();
        const email = faker.internet.email();
        const password = faker.internet.password();

        signupPage.signup({
          lastName,
          companyName,
          email,
          password,
          doNotClickNext: true,
        });

        signupPage.elements.signUpButton().should("be.disabled");
        signupPage.isCurrentPage();
        signupPage.clear();

        signupPage.signup({
          firstName,
          companyName,
          email,
          password,
          doNotClickNext: true,
        });

        signupPage.elements.signUpButton().should("be.disabled");
        signupPage.isCurrentPage();
        signupPage.clear();

        signupPage.signup({
          firstName,
          lastName,
          email,
          password,
          doNotClickNext: true,
        });

        signupPage.elements.signUpButton().should("be.disabled");
        signupPage.isCurrentPage();
        signupPage.clear();

        signupPage.signup({
          firstName,
          lastName,
          companyName,
          password,
          doNotClickNext: true,
        });

        signupPage.elements.signUpButton().should("be.disabled");
        signupPage.isCurrentPage();
        signupPage.clear();

        signupPage.signup({
          firstName,
          lastName,
          companyName,
          email,
          doNotClickNext: true,
        });

        signupPage.elements.signUpButton().should("be.disabled");
        signupPage.isCurrentPage();
      });

      it("Should be able to create a new user account - No Email Verification", () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const companyName = faker.company.name();
        const email = faker.internet.email();
        const password = Cypress.env("defaultPassword");

        signupPage.signup({
          firstName,
          lastName,
          companyName,
          email,
          password,
        });

        signupPage.isCheckEmailLabelVisible();
      });

      it("Should be able to create a new user account - Email Verification", () => {
        const timestamp_from = Date.now();

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const companyName = faker.company.name();
        let tag = faker.string.alphanumeric({ length: 15, casing: "lower" });
        const email = generateTestmailEmail({ tag });
        const password = Cypress.env("defaultPassword");

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
        });
      });
    });
  });
});
