import { BasePage } from "./BasePage";

class AccountBillingPage extends BasePage {
  constructor() {
    super("/account/billing");
  }

  elements = {
    //buttons
    choosePlanButton: (plan) =>
      cy
        .contains("div", plan)
        .parent()
        .parent()
        .parent()
        .contains("div", "Choose Plan"),
    yourPlanButton: (plan) =>
      cy
        .contains("div", plan)
        .parent()
        .parent()
        .parent()
        .contains("div", "Your Plan"),
  };

  choosePlan(plan = "professional") {
    this.elements.choosePlanButton(plan).click();
  }

  isCurrentPlanActive(plan) {
    this.elements.yourPlanButton(plan).should("be.visible");
  }
}

module.exports = new AccountBillingPage();
