describe('Pagination', () => {
  it('should display pagination component', () => {
    const movies = new Array(59)
      .fill(0)
      .map((e, index) => {
        const id = index + 1
        const title = `title-${id}`
        const description = `description-${id}`
        const director = `director-${id}`
        const producer = `producer-${id}`
        const banner = `banner-${id}`
        const poster = `poster-${id}`
        const originalId = `originalId-${id}`
        return {
          id, title, description, director, producer, banner, poster, originalId
        }
      })
    const limit = 10
    cy.intercept('GET', '/api/movies*', (req) => {
      req.reply({
        movies: [ ...movies ].splice(parseInt(req.query.page) * limit - limit, limit),
        total: movies.length
      })
    })

      cy.log('page 1 among 6 (default)')
        cy.visit('/')
        cy.get('[data-testid="movie"]').should('have.length', limit)
        cy.get('[data-testid="page-item"]').should('have.length', 6)
        cy.get('[data-testid="page-item"] > button').eq(0).should('be.disabled')
        cy.get('[data-testid="page-item"] > button').eq(1).should('be.disabled')
        cy.get('[data-testid="page-item"] > button').eq(3).should('be.disabled')
        cy.get('[data-testid="page-item"] > button').eq(2).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(4).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(5).should('be.enabled')
        cy.get('[data-testid="first-page"]').should('be.disabled')
        cy.get('[data-testid="last-page"]').should('be.enabled')
        cy.contains('title-1')
        cy.contains('title-10')

      cy.log('page 2 among 6 (numbered page)')
        cy.get('[data-testid="page-item"] > button').eq(2).click()
        cy.get('[data-testid="movie"]').should('have.length', limit)
        cy.get('[data-testid="page-item"]').should('have.length', 7)
        cy.get('[data-testid="page-item"] > button').eq(2).should('be.disabled')
        cy.get('[data-testid="page-item"] > button').eq(4).should('be.disabled')
        cy.get('[data-testid="page-item"] > button').eq(0).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(1).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(3).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(5).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(6).should('be.enabled')
        cy.get('[data-testid="first-page"]').should('be.enabled')
        cy.get('[data-testid="last-page"]').should('be.enabled')
        cy.contains('title-11')
        cy.contains('title-20')

      cy.log('page 3 among 6 (next page from 2)')
        cy.get('[data-testid="page-item"] > button').eq(6).click()
        cy.get('[data-testid="movie"]').should('have.length', limit)
        cy.get('[data-testid="page-item"]').should('have.length', 8)
        cy.get('[data-testid="page-item"] > button').eq(3).should('be.disabled')
        cy.get('[data-testid="page-item"] > button').eq(5).should('be.disabled')
        cy.get('[data-testid="page-item"] > button').eq(0).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(1).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(2).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(4).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(6).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(7).should('be.enabled')
        cy.get('[data-testid="first-page"]').should('be.enabled')
        cy.get('[data-testid="last-page"]').should('be.enabled')
        cy.contains('title-21')
        cy.contains('title-30')

      cy.log('page 6 among 6 (last page)')
        cy.get('[data-testid="last-page"]').click()
        cy.get('[data-testid="movie"]').should('have.length', limit)
        cy.get('[data-testid="page-item"]').should('have.length', 6)
        cy.get('[data-testid="page-item"] > button').eq(2).should('be.disabled')
        cy.get('[data-testid="page-item"] > button').eq(4).should('be.disabled')
        cy.get('[data-testid="page-item"] > button').eq(5).should('be.disabled')
        cy.get('[data-testid="page-item"] > button').eq(0).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(1).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(3).should('be.enabled')
        cy.get('[data-testid="first-page"]').should('be.enabled')
        cy.get('[data-testid="last-page"]').should('be.disabled')
        cy.contains('title-51')
        cy.contains('title-59')

      cy.log('page 5 among 6 (prev page from 6)')
        cy.get('[data-testid="page-item"] > button').eq(0).click()
        cy.get('[data-testid="movie"]').should('have.length', limit)
        cy.get('[data-testid="page-item"]').should('have.length', 7)
        cy.get('[data-testid="page-item"] > button').eq(2).should('be.disabled')
        cy.get('[data-testid="page-item"] > button').eq(4).should('be.disabled')
        cy.get('[data-testid="page-item"] > button').eq(0).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(1).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(3).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(5).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(6).should('be.enabled')
        cy.get('[data-testid="first-page"]').should('be.enabled')
        cy.get('[data-testid="last-page"]').should('be.enabled')
        cy.contains('title-41')
        cy.contains('title-50')

      cy.log('page 1 among 6 (first page)')
        cy.get('[data-testid="first-page"]').click()
        cy.get('[data-testid="movie"]').should('have.length', limit)
        cy.get('[data-testid="page-item"]').should('have.length', 6)
        cy.get('[data-testid="page-item"] > button').eq(0).should('be.disabled')
        cy.get('[data-testid="page-item"] > button').eq(1).should('be.disabled')
        cy.get('[data-testid="page-item"] > button').eq(3).should('be.disabled')
        cy.get('[data-testid="page-item"] > button').eq(2).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(4).should('be.enabled')
        cy.get('[data-testid="page-item"] > button').eq(5).should('be.enabled')
        cy.get('[data-testid="first-page"]').should('be.disabled')
        cy.get('[data-testid="last-page"]').should('be.enabled')
        cy.contains('title-1')
        cy.contains('title-10')

    cy.wait(1)
  })
})
