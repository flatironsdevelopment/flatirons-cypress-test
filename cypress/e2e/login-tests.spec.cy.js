import loginPage from "../pages/LoginPage";
import templatesPage from "../pages/TemplatesPage";
import { faker } from "@faker-js/faker";
import { VIEWPORTS } from "../support/constants";

describe("Login Tests", () => {
  VIEWPORTS.forEach((viewport) => {
    context(`Viewport: ${viewport.description}`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        loginPage.loadPage();
      });

      it("Should login with valid credentials", () => {
        loginPage.signin(Cypress.env("email"), Cypress.env("password"));
        templatesPage.isCurrentPage();
      });

      it("Should not login with invalid credentials - Wrong Password", () => {
        loginPage.signin(Cypress.env("email"), faker.internet.password());
        loginPage.isErrorMessageVisible("Invalid email or password");
        loginPage.isCurrentPage();
      });

      it("Should not login with invalid credentials - Wrong Email & Password", () => {
        loginPage.signin(faker.internet.email(), faker.internet.password());
        loginPage.isErrorMessageVisible("Invalid email or password");
        loginPage.isCurrentPage();
      });

      it.skip("Should login with Github", () => {
        loginPage.signinWithGithub(
          Cypress.env("githubEmail"),
          Cypress.env("githubPassword")
        );
        templatesPage.isCurrentPage();
      });
    });
  });
});
