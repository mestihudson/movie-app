describe('Details About Movie', () => {
  it('should display details about movie', () => {
    const title = 'Movie Title'
    const description = 'Movie Description'
    const director = 'Movie Director'
    const producer = 'Movie Producers'
    const banner = '/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg'
    const poster = '/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg'
    const movies = [{
      id: 1,
      title,
      description,
      director,
      producer,
      banner,
      poster,
      originalId: '634649',
    }]
    cy.intercept('GET', '/api/movies*', { movies: [], total: 0 })
      .as('retrieveBooksNoResult')
    cy.intercept('GET', '/api/update', { modified: true })
      .as('updateBase')
    cy.intercept('GET', '/api/movies*', {
        movies,
        total: 1
      })
      .as('retrieveBooksSomeResult')

    cy.visit('/')
    cy.contains(title).should('not.exist')

    cy.get('[data-testid="update-movie-base"]').click()
    cy.contains(title)
    cy.get('body').find('img').should('have.attr', 'src').should('include', poster)

    cy.contains(description).should('not.exist')
    cy.contains(`Dirigido por: ${director}`).should('not.exist')
    cy.contains(`Produzido por: ${producer}`).should('not.exist')
    cy.get('body').find('img').should('have.attr', 'src').should('not.include', banner)

    cy.get('[data-testid="movie"]').click()
    cy.contains(description)
    cy.contains(`Dirigido por: ${director}`)
    cy.contains(`Produzido por: ${producer}`)
    cy.get('body').find('img').eq(1).should('have.attr', 'src').should('include', banner)
    cy.get('body').find('img').eq(1).click()

    cy.contains(description).should('not.exist')
    cy.contains(`Dirigido por: ${director}`).should('not.exist')
    cy.contains(`Produzido por: ${producer}`).should('not.exist')
    cy.get('body').find('img').should('have.attr', 'src').should('not.include', banner)

    cy.wait(1)
  })

  it('should display a error message when retrieve returns error', () => {
    cy.intercept('GET', '/api/movies*', {
        statusCode: 500,
        body: {
          message: 'Database is out'
        }
      })
      .as('retrieveBooksError')
    const message = 'Sorry, it was not possible to retrieve movies to show'

    cy.visit('/')
    cy.contains(message)

    cy.wait(1)
  })

  it('should display a error message when update returns error', () => {
    cy.intercept('GET', '/api/movies*', { movies: [], total: 0 })
      .as('retrieveBooksNoResult')
    cy.intercept('GET', '/api/update', {
        statusCode: 500,
        body: {
          message: 'Database is out'
        }
      })
      .as('updateBase')
    const message = 'Sorry, it was not possible to update base'

    cy.visit('/')
    cy.get('[data-testid="update-movie-base"]').click()
    cy.contains(message)

    cy.wait(1)
  })
})
