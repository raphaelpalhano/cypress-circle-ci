// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('selectComponentWithClass', (className: string) => cy.get(`.${className}`));

Cypress.Commands.add('selectComponentWithId', (idName: string) => cy.get(`#${idName}`));

Cypress.Commands.add('selectElementUsingText', (selectorElement: string, text: string) =>
  cy.get(selectorElement).filter(function () {
    return Cypress.$(this).text().trim() === text;
  }));

Cypress.Commands.add('selectInput', (attribute: string) => cy.get(`input=[name="${attribute}"]`));
