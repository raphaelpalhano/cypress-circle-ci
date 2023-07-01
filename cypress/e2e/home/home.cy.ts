describe('Validate components in home ui', () => {
  it('Given I am in homepage and I see main', () => {
    cy.visit('/');
    cy.selectElementUsingText('p', 'Experience the difference').should('be.visible');
    cy.selectElementUsingText('ul li', 'ATM Services').should('be.visible');
    cy.selectElementUsingText('ul li', 'Online Services').should('be.visible');
    cy.selectElementUsingText('a', 'Read More').should('be.visible');
    cy.selectElementUsingText('h4', 'Latest News').should('be.visible');
  });

  it('Given I see menu bar in side', () => {
    cy.visit('/');
    cy.selectElementUsingText('a', 'About Us').should('be.visible');
    cy.selectElementUsingText('a', 'Services').should('be.visible');
    cy.selectElementUsingText('a', 'Products').should('be.visible');
    cy.selectElementUsingText('a', 'Locations').should('be.visible');
    cy.selectElementUsingText('a', 'Admin Page').should('be.visible');
    cy.log('finish menu validation');
  });
});
