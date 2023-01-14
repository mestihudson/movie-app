describe('List Movies', () => {
  it('should display the list of movies', () => {
    const title = "Movie Title"
    const movies = [{
      id: 1,
      title,
      description: 'Movie Description',
      director: 'Movie Director',
      producer: 'Movie Producers',
      banner: '/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg',
      poster: '/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg',
      originalId: '634649',
    }]
    cy.intercept('GET', '/api/movies*', { movies: [], total: 0 })
      .as('retrieveBooksFirst')
    cy.intercept('GET', '/api/update', { modified: true })
      .as('updateBase')
    cy.intercept('GET', '/api/movies*', {
        movies,
        total: 1
      })
      .as('retrieveBooksLast')

    cy.visit('/')
    cy.contains(title).should('not.exist')
    cy.get('[data-testid="update-movie-base"]').click()
    cy.contains(title)
    cy.wait(1)
  })
})
