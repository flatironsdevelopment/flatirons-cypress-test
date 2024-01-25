class LoginGithubPage {
  signin(email, password) {
    const sentArgs = { email: email, password: password };
    cy.origin(
      "https://github.com",
      { args: sentArgs },
      ({ email, password }) => {
        cy.get("input#login_field").type(email);
        cy.get("input#password").type(password);
        cy.get("input[type='submit']").click();
      }
    );
  }
}

module.exports = new LoginGithubPage();
