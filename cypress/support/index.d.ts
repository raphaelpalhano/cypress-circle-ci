declare namespace Cypress {
 interface Chainable<Subject> {
  selectComponentWithClass (className: string): Chainable<any>;
  selectComponentWithId(idName: string): Chainable<any>;
  selectElementUsingText (selectorElement: string, text: string): Chainable<any>;
  selectInput(attribute: string): Chainable<any>
  }
}
