describe('Smoke', () => {
  it('should verify suite healh', () => {
    cy.visit('/')
      .title()
      .should('eq', 'Movie App')
  })
})
