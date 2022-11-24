describe('List Movies', () => {
  it('should display the list of movies', () => {
    cy.visit('http://app:14000')

    cy.contains('Grave of the Fireflies')
      .should('not.exist')

    cy.get('[data-testid="update-movie-base"]')
      .click()

    cy.contains('Grave of the Fireflies')
  })
})
