// Steps comum de mais uma feature

Given(/^que acessa o Scenario site$/, () => {
    cy.server();

    cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**')
      .as('postNewtable');

    cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**')
      .as('postUsertable');

    cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**')
      .as('getNewtable');

    cy.visit('Register.html');
});