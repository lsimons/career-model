describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('div', 'try \'Coding\' to see a fleshed-out competency')
  })
})
