import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('que estou na home', () => {
  cy.visit('/');
});

Then('visualizo os elementos do {string}', (elementos: String) => {
  if (elementos.includes('main')) {
    cy.contains('p', 'Experience the difference').should('be.visible');
    cy.contains('ul li', 'ATM Services').should('be.visible');
    cy.contains('ul li', 'Online Services').should('be.visible');
    cy.contains('a', 'Read More').should('be.visible');
    cy.contains('h4', 'Latest News').should('be.visible');
  }
  if (elementos.includes('menu-bar')) {
    cy.contains('a', 'About Us').should('be.visible');
    cy.contains('a', 'Services').should('be.visible');
    cy.contains('a', 'Products').should('be.visible');
    cy.contains('a', 'Locations').should('be.visible');
    cy.contains('a', 'Admin Page').should('be.visible');
    cy.log('finish menu validation');
  }
});
