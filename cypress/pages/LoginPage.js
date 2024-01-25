import { BasePage } from "./BasePage";

import loginGithubPage from "./LoginGithubPage";
import { SIGN_IN_API } from "../support/apis";

class LoginPage extends BasePage {
  constructor() {
    super("/users/sign-in");
  }

  elements = {
    //inputs
    emailInput: () => cy.get("input#email"),
    passwordInput: () => cy.get("input#password"),

    //buttons
    signInButton: () => cy.get("div[data-cy='SignIn']"),
    signInGithubButton: () => cy.contains("div", "Sign in with Github"),
  };

  signin(email, password) {
    cy.intercept("POST", SIGN_IN_API).as("login");
    this.elements.emailInput().type(email);
    this.elements.passwordInput().type(password);
    this.elements.signInButton().click();

    cy.wait("@login");
  }

  signinWithGithub() {
    this.elements.signInGithubButton().click();
    loginGithubPage.signin(
      Cypress.env("githubEmail"),
      Cypress.env("githubPassword")
    );
  }

  isErrorMessageVisible(message) {
    cy.contains("div", message).should("be.visible");
  }
}

module.exports = new LoginPage();
