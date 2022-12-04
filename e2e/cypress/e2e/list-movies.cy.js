describe('List Movies', () => {
  it('should display the list of movies', () => {
    cy.exec('npm run helpers cleanDatabase').then((result) => {
      expect(result.stdout).to.contains('{ ok: true }')
    })

    cy.exec('npm run helpers getTitleOfFirstCurrentMovies').then((result) => {
      const rx = /{ title: '(.*)' }/g
      const matched = rx.exec(result.stdout)
      const title = matched[1]
      expect(title).not.to.be.undefined

      cy.visit('http://app:14000')

      cy.contains(title)
        .should('not.exist')

      cy.get('[data-testid="update-movie-base"]')
        .click()

      cy.contains(title, { timeout: 20000 })
    })
  })
})
