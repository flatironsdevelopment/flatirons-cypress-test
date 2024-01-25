import { getStripeIFrameDocument } from "../../support/utils";

class BillingFormComponent {
  elements = {
    //inputs
    cardHolderInput: () => cy.get("input#cardHolder"),
    emailInput: () => cy.get("input#email"),
    phoneInput: () => cy.get("input#phone"),
    cardNumberInput: () =>
      getStripeIFrameDocument().find("input[name='cardnumber']"),
    expirationDateInput: () =>
      getStripeIFrameDocument().find("input[name='exp-date']"),
    cvcInput: () => getStripeIFrameDocument().find("input[name='cvc']"),

    //buttons
    upgradePlanButton: () => cy.contains("div", "Upgrade Plan"),
  };

  fillBillingForm({
    cardHolder,
    email,
    phone,
    cardNumber,
    expirationDate,
    cvc,
  }) {
    this.elements.cardHolderInput().type(cardHolder);
    this.elements.emailInput().type(email);
    this.elements.phoneInput().type(phone);

    this.elements.cardNumberInput().type(cardNumber);

    this.elements.expirationDateInput().type(expirationDate);
    this.elements.cvcInput().type(cvc);

    this.elements.upgradePlanButton().click();
  }
}

module.exports = new BillingFormComponent();
