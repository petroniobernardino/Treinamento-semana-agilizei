/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {

        //GET 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_XPOST 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        //POST 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        //GET 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        cy.server();

        cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**')
          .as('postNewtable');

        cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**')
          .as('postUsertable');

        cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**')
          .as('getNewtable');

        cy.visit('Register.html');
        
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

        cy.get('button#submitbtn').click();
       
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
});