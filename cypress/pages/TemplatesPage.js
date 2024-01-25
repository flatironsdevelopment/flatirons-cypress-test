import { BasePage } from "./BasePage";

class TemplatesPage extends BasePage {
  constructor() {
    super("/account/importers");
  }

  elements = {
    //inputs
    emailInput: () => cy.get("input#email"),
    passwordInput: () => cy.get("input#password"),

    //buttons
    signInButton: () => cy.get("div[data-cy='SignIn']"),
    signInGithubButton: () => cy.contains("div", "Sign in with Github"),
  };
}

module.exports = new TemplatesPage();
