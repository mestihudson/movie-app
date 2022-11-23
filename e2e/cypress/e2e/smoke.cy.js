describe('Smoke', () => {
  it('should verify suite healh', () => {
    cy.visit('http://app:14000')
      .title()
      .should('eq', 'Movie App')
  })
})
