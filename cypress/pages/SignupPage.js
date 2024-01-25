import { BasePage } from "./BasePage";

class LoginPage extends BasePage {
  constructor() {
    super("/users/sign-up");
  }

  elements = {
    //inputs
    firstNameInput: () => cy.get("input#first_name"),
    lastNameInput: () => cy.get("input#last_name"),
    companyNameInput: () => cy.get("input#company_name"),
    emailInput: () => cy.get("input#email"),
    passwordInput: () => cy.get("input#password"),

    //buttons
    signUpButton: () => cy.get("button[data-cy='SignUp']"),

    //Labels
    checkEmailLabel: () => cy.contains("div", "Check your email!"),
    emailConfirmedLabel: () => cy.contains("div", "Email confirmed!"),
  };

  signup({
    firstName,
    lastName,
    companyName,
    email,
    password,
    doNotClickNext = false,
  }) {
    if (firstName) this.elements.firstNameInput().clear().type(firstName);
    if (lastName) this.elements.lastNameInput().clear().type(lastName);
    if (companyName) this.elements.companyNameInput().clear().type(companyName);
    if (email) this.elements.emailInput().clear().type(email);
    if (password) this.elements.passwordInput().clear().type(password);
    if (!doNotClickNext) this.elements.signUpButton().click();
  }

  clear() {
    this.elements.firstNameInput().clear();
    this.elements.lastNameInput().clear();
    this.elements.companyNameInput().clear();
    this.elements.emailInput().clear();
    this.elements.passwordInput().clear();
  }

  isErrorMessageVisible(message) {
    cy.contains("div", message).should("be.visible");
  }

  isCheckEmailLabelVisible() {
    this.elements.checkEmailLabel().should("be.visible");
  }

  isEmailConfirmedLabelVisible() {
    this.elements.emailConfirmedLabel().should("be.visible");
  }
}

module.exports = new LoginPage();
