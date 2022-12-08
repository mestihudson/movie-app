describe('Paginated List', () => {
  afterEach(() => {
    cy.exec('npm run helpers cleanDatabase')
      .then((result) => {
        expect(result.stdout).to.contains('{ ok: true }')
      })
  })

  it('should be possible to use a pagination component when movie list is greater than limit', () => {
    const limit = 10

    cy.exec('npm run helpers seedPaginatedScenario')
      .then((result) => {
        expect(result.stdout).to.contains('{ ok: true }')

        cy.visit('http://app:14000')
          cy.get('[data-testid="movie"]').should('have.length', limit)
          cy.contains('title-1')
          cy.contains('title-10')
          cy.get('[data-testid="page"]').should('have.length', 6)
          cy.get('[data-testid="first-page"]').should('be.disabled')
          cy.get('[data-testid="page"]').eq(0).should('be.disabled')

        cy.get('[data-testid="page"]').eq(2).click()
          cy.get('[data-testid="page"]').eq(2).should('be.disabled')
          cy.get('[data-testid="movie"]').should('have.length', limit)
          cy.contains('title-21')
          cy.contains('title-30')

        cy.get('[data-testid="last-page"]').click()
          cy.get('[data-testid="last-page"]').should('be.disabled')
          cy.get('[data-testid="page"]').eq(5).should('be.disabled')
          cy.get('[data-testid="movie"]').should('have.length', 5)
          cy.contains('title-51')
          cy.contains('title-55')

        cy.get('[data-testid="first-page"]').click()
          cy.get('[data-testid="first-page"]').should('be.disabled')
          cy.get('[data-testid="page"]').eq(0).should('be.disabled')
          cy.get('[data-testid="movie"]').should('have.length', limit)
          cy.contains('title-1')
          cy.contains('title-10')
      })
  })
})
