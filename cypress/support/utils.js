import { faker } from "@faker-js/faker";
import { STRIPE_IFRAME_PREFIX } from "./constants";

export const generateTestmailEmail = ({ tag }) => {
  const namespace = Cypress.env("TESTMAIL_NAMESPACE");
  const domain = Cypress.env("TESTMAIL_DOMAIN");

  return `${namespace}.${tag}@${domain}`;
};

export const getVerificationLink = ({ text }) => {
  // Match URLs enclosed in square brackets
  const urlRegex = /\[([^\]]+)\]/;
  const urlMatchInText = text.match(urlRegex);

  // Check if there's a match and extract the URL
  if (urlMatchInText && urlMatchInText[1]) {
    return urlMatchInText[1];
  } else {
    return null;
  }
};

export const getCardDetails = () => {
  const cardNumber = "4242 4242 4242 4242";
  const futureDate = faker.date.future();
  const expirationDate = `${(futureDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${futureDate.getFullYear().toString().slice(-2)}`;
  const cvc = "123";

  return { cardNumber, expirationDate, cvc };
};

export const getStripeIFrameDocument = () => {
  return cy
    .checkElementExists(`iframe[name^="${STRIPE_IFRAME_PREFIX}"]`)
    .iframeCustom();
};
