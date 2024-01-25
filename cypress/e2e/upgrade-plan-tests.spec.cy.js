import accountBillingPage from "../pages/AccountBillingPage";
import billingFormComponent from "../pages/components/BillingFormComponent";
import { generateTestmailEmail, getCardDetails } from "../support/utils";
import { faker } from "@faker-js/faker";
import { PHONE_NUMBER } from "../support/constants";

describe("Signup Tests", () => {
  beforeEach(() => {
    let tag = faker.string.alphanumeric({ length: 15, casing: "lower" });
    const email = generateTestmailEmail({ tag });
    const password = Cypress.env("defaultPassword");

    // NOTE: There should be a way to either remove the subscription before running this test
    // from the default user or create a new user for this test
    cy.createUser(tag, email, password);
    accountBillingPage.loadPage();
  });

  it("Should upgrade plan to Professional", () => {
    const plan = "professional";
    accountBillingPage.choosePlan(plan);

    const cardHolder = faker.person.fullName();
    const email = faker.internet.email();
    const phone = PHONE_NUMBER;
    const cardDetails = getCardDetails();

    billingFormComponent.fillBillingForm({
      cardHolder,
      email,
      phone,
      ...cardDetails,
    });

    accountBillingPage.isSucessMessageVisible("Plan updated successfully");
    accountBillingPage.isCurrentPlanActive(plan);
  });
});
