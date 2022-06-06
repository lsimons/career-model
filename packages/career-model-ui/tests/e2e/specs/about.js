describe('About', () => {
  it('Visits the about url', () => {
    cy.visit('/#/about')
    cy.contains('h1', 'About Career Model')
    cy.contains('p', 'Career Model is a career path planner.')
  })
})
