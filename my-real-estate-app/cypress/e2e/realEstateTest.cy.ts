describe('template spec', () => {
  it('front page can be opened', () => {
    cy.visit('http://localhost:5173', { failOnStatusCode: false });


    cy.contains('MODERN HOUSING SOLUTIONS');
  });
});
