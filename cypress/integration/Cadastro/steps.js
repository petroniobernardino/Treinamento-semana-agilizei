/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

When(/^informar meus dados$/, () => {
        // Text
        cy.get('input[placeholder="First Name"]').type(chance.first());
        cy.get('input[ng-model^="Last"]').type(chance.last());
        cy.get('input[ng-model="EmailAdress"]').type(chance.email());
        cy.get('input[ng-model="Phone"]').type(chance.phone({ formatted: false}));

        // check -> Radios e Checkbox
        cy.get('input[value="Male"]').check();
        cy.get('input[type="checkbox"]').check('Cricket');
        cy.get('input[type="checkbox"]').check('Hockey');

        // Select 
        cy.get('select#Skills').select('Javascript');
        cy.get('select#countries').select('Argentina');
        cy.get('select#country').select('Australia', { force: true});
        cy.get('select#yearbox').select('1979');
        cy.get('select[ng-model^="month"]').select('March');
        cy.get('select#daybox').select('28');
        cy.get('input#firstpassword').type('Agil@2020');
        cy.get('input#secondpassword').type('Agil@2020');

        cy.get('input#imagesrc').attachFile('Photo_exemplo.png');
});

When(/^salvar$/, () => {
    cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
        cy.wait('@postNewtable').then((resNewtable) => {
           // chai
           expect(resNewtable.status).to.equal(200)
         })

         cy.wait('@postUsertable').then((resUsertable) => {
            // chai
            expect(resUsertable.status).to.equal(200)
          })

          cy.wait('@getNewtable').then((resNewtable) => {
            // chai
            expect(resNewtable.status).to.equal(200)
          })

          cy.url().should('contain' , 'WebTable');
});
