export class BasePage {
  constructor(url) {
    this.url = url;
  }

  loadPage() {
    cy.visit(this.url, { failOnStatusCode: false });
  }

  isCurrentPage() {
    cy.url().should("include", this.url);
  }

  isSucessMessageVisible(message) {
    cy.contains("div", message).should("be.visible");
  }
}
