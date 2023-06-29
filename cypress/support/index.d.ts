declare namespace Cypress {
 interface Chainable<Subject> {
    getId(name: string): Chainable<any>;
  }
}
